import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
  const browserLang = this.translate.getBrowserLang();
  const lang = browserLang && browserLang.match(/en|es/) ? browserLang : 'en';
  this.useLanguage(lang);
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  instant(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key, interpolateParams);
  }
}
