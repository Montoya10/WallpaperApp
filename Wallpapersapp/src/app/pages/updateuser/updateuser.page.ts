import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/services/auth/auth';
import { ErrorHandler } from 'src/app/core/services/error-handler/error-handler';
import { Query } from 'src/app/core/providers/query/query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.page.html',
  styleUrls: ['./updateuser.page.scss'],
  standalone: false,
})
export class UpdateuserPage implements OnInit, OnDestroy {
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public profileForm!: FormGroup;
  public isLoading: boolean = false;
  public isEditing: boolean = false;
  public fullName: string = 'Mi Perfil';
  public isGoogleUser: boolean = false; 
  public userPhoto: string = ''; 

  private userData: any = {};
  private authSubscription!: Subscription;

  constructor(
    private readonly authSrv: Auth,
    private readonly querySrv: Query,
    private router: Router,
    private errorHandler: ErrorHandler
  ) {
    this.initForm();
  }

  async ngOnInit() {
    await this.loadUserData();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private async loadUserData() {
    this.isLoading = true;
    const userId = this.authSrv.currentUserId;
    const currentUser = this.authSrv.currentUser;

    if (!userId || !currentUser) {
      this.errorHandler.showWarning('Usuario no autenticado');
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.userData = await this.querySrv.get('users', userId);

      
      this.isGoogleUser = this.checkIfGoogleUser(currentUser);

      
      this.userPhoto = this.userData?.photoURL || currentUser.photoURL || '';

      if (this.userData) {
        this.profileForm.patchValue({
          name: this.userData.name || currentUser.displayName || '',
          lastName: this.userData.last || '',
          email: this.userData.email || currentUser.email || '',
        });

        this.fullName =
          `${this.userData.name || currentUser.displayName || ''} ${this.userData.last || ''}`.trim() ||
          'Mi Perfil';
        
        this.email.disable();
        
        // Deshabilitar nombre si es usuario de Google
        if (this.isGoogleUser) {
          this.name.disable();
        }
      } else {
        // Si no hay datos en Firestore, usar datos de Auth
        this.profileForm.patchValue({
          name: currentUser.displayName || '',
          lastName: '',
          email: currentUser.email || ''
        });
        
        this.fullName = currentUser.displayName || 'Mi Perfil';
        
        if (this.isGoogleUser) {
          this.name.disable();
        }
      }
    } catch (error) {
      this.errorHandler.handleFirebaseError(error, 'cargar perfil');
    } finally {
      this.isLoading = false;
    }
  }

  
  private checkIfGoogleUser(user: any): boolean {
    return user.providerData && user.providerData.some(
      (provider: any) => provider.providerId === 'google.com'
    );
  }

  
  public getGoogleUserMessage(): string {
    return this.isGoogleUser 
      ? 'Tu perfil está vinculado con Google. Algunos datos no pueden ser editados aquí.' 
      : '';
  }

  public toggleEdit() {
  
    if (this.isGoogleUser) {
      this.errorHandler.showInfo('Para usuarios de Google, actualiza tu información directamente en tu cuenta de Google');
      return;
    }

    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.name.enable();
      this.lastName.enable();
    } else {
      this.name.disable();
      this.lastName.disable();

      this.profileForm.patchValue({
        name: this.userData.name,
        lastName: this.userData.last,
      });
    }
  }

  public async updateProfile() {
    if (this.profileForm.invalid) {
      this.errorHandler.showWarning(
        'Por favor, completa todos los campos correctamente'
      );
      return;
    }

    this.isLoading = true;
    const userId = this.authSrv.currentUserId;

    if (!userId) {
      this.errorHandler.showWarning('Usuario no autenticado');
      this.isLoading = false;
      return;
    }

    try {
      const updateData = {
        name: this.name.value,
        last: this.lastName.value,
        updatedAt: new Date(),
      };

      await this.querySrv.update('users', userId, updateData);

      this.userData = { ...this.userData, ...updateData };
      this.fullName = `${this.name.value} ${this.lastName.value}`.trim();

      this.errorHandler.showSuccess('Perfil actualizado correctamente');
      this.isEditing = false;
      this.name.disable();
      this.lastName.disable();
    } catch (error) {
      this.errorHandler.handleFirebaseError(error, 'actualizar perfil');
    } finally {
      this.isLoading = false;
    }
  }

  public async changePassword() {
    if (this.isGoogleUser) {
      this.errorHandler.showInfo('Los usuarios de Google deben cambiar su contraseña desde su cuenta de Google');
      return;
    }
    
    this.errorHandler.showInfo(
      'Funcionalidad de cambio de contraseña próximamente'
    );
  }

  public async logout() {
    try {
      await this.authSrv.logOut();
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorHandler.handleFirebaseError(error, 'cerrar sesión');
    }
  }

  private initForm() {
    this.name = new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]);
    this.lastName = new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]);
    this.email = new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]);

    this.profileForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
    });
  }
}