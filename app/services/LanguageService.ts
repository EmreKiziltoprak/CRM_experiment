import { injectable } from 'inversify';

@injectable()
export class LanguageService {
  getAvailableLanguages(): string[] {
    return ['en', 'tr'];
  }
  
  setLanguage(language: string): void {
    localStorage.setItem('language', language);
  }
  
  getLanguage(): string {
    return localStorage.getItem('language') || 'en';
  }
}
