import { Container } from 'inversify';
import { TYPES } from './types';
import { LanguageService } from './app/services/LanguageService';

const container = new Container();
container.bind<LanguageService>(TYPES.LanguageService).to(LanguageService);

export { container };
