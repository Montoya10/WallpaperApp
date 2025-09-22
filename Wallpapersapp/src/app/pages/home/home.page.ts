import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filepicker } from 'src/app/core/providers/filepicker/filepicker';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { Auth } from 'src/app/core/services/auth/auth';
import { Wallpaper } from 'src/app/shared/services/wallpaper/wallpaper';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public wallpapers: any[] = [];
  public isLoading: boolean = false;

  constructor(
    private readonly authSrv: Auth,
    private readonly router: Router,
    private readonly fileSrv: Filepicker,
    private readonly uplouderSrv: Uploader,
    private readonly wallpaperSrv: Wallpaper,
    public translationService: TranslationService
  ) {}

  changeLang(lang: string) {
    this.translationService.useLanguage(lang);
  }

  async ngOnInit() {
    // Cargar wallpapers existentes del usuario
    try {
      this.isLoading = true;
      this.wallpapers = await this.wallpaperSrv.loadUserWallpapers();
    } catch (e) {
      console.error('Error cargando wallpapers del usuario', e);
    } finally {
      this.isLoading = false;
    }
  }

  async doLogout() {
    console.log('Logout clicked');
    await this.authSrv.logOut();
    this.router.navigate(['/login']);
  }

  public async agregar() {
    console.log('Agregar clicked');
    this.isLoading = true;

    try {
      await this.wallpaperSrv.uploadWallpaper();
      this.wallpapers = await this.wallpaperSrv.loadUserWallpapers();
      console.log('Wallpaper subido exitosamente');
      this.showToast('✅ Wallpaper agregado');
    } catch (error) {
      console.error('Error al subir el wallpaper:', error);
      this.showToast('❌ Error al subir el wallpaper');
    } finally {
      this.isLoading = false;
    }
  }

  public async onWallpaperRemoved(docId: string, fileName: string) {
    try {
      await this.wallpaperSrv.deleteWallpaper(docId, fileName);
      this.wallpapers = await this.wallpaperSrv.loadUserWallpapers();
      this.showToast('🗑️ Wallpaper eliminado');
    } catch (error) {
      this.showToast('❌ Error al eliminar el wallpaper');
      console.error(error);
    }
  }

  private async showToast(message: string) {
    console.log('Toast:', message);
  }

  navigateToUpdateUser() {
    console.log('Update User clicked');
    this.router.navigate(['/updateuser']);
  }
}
