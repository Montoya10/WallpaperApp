import { Filepicker } from './../../../core/providers/filepicker/filepicker';
import { Injectable } from '@angular/core';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { Auth } from 'src/app/core/services/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class Wallpaper {
  constructor(
    private readonly filePickerSrv: Filepicker,
    private readonly uploaderSrv: Uploader,
  ) {}

  public async uploadWallpaper(): Promise<string> {
    const image = await this.filePickerSrv.pickImage();
    
    const url = await this.uploaderSrv.upload(
      'mySupaWallpapers',
      'images/',
      `${Date.now()}-${image.name}`,
      image.data || '',
      image.MimeType
    );
    
    console.log('URL de la imagen:', url);
    return url; // Retorna la URL
  }
}