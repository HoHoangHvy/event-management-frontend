// src/app/app-init.service.ts
import { Injectable } from '@angular/core';
import { AuthServiceService } from './services/Auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private authService: AuthServiceService) {}

  init() {
    return (): Promise<void> => {
      return this.authService.handleRefreshUserData();
    };
  }
}
