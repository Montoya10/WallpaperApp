import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filepicker } from 'src/app/core/providers/filepicker/filepicker';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { Auth } from 'src/app/core/services/auth/auth';
import { Wallpaper } from 'src/app/shared/services/wallpaper/wallpaper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public imageUrls: string[] = []; // Esta variable almacenará la URL de la imagen
  public isLoading: boolean = false;

  constructor(
    private readonly authSrv: Auth,
    private readonly router: Router,
    private readonly fileSrv: Filepicker,
    private readonly uplouderSrv: Uploader,
    private readonly wallpaperSrv: Wallpaper
  ) {}

  ngOnInit() {}

  async doLogout() {
    console.log('Logout clicked');
    await this.authSrv.logOut();
    this.router.navigate(['/login']);
  }

  public async agregar() {
    console.log('Agregar clicked');
    this.isLoading = true;

    try {
      const url = await this.wallpaperSrv.uploadWallpaper();
      this.imageUrls = [...this.imageUrls, url];
      console.log('Wallpaper subido exitosamente');
      this.showToast('✅ Wallpaper agregado');
    } catch (error) {
      console.error('Error al subir el wallpaper:', error);
      this.showToast('❌ Error al subir el wallpaper');
    } finally {
      this.isLoading = false;
    }
  }

  public onImageRemoved(index: number) {
    this.imageUrls = this.imageUrls.filter((_, i) => i !== index);
    this.showToast('🗑️ Wallpaper eliminado');
  }

  private async showToast(message: string) {
    console.log('Toast:', message);
  }

  navigateToUpdateUser() {
    console.log('Update User clicked');
    this.router.navigate(['/updateuser']);
  }
}
