import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthorizationCanGuard implements CanLoad {

    constructor(private oidcSecurityService: OidcSecurityService
    ) {}

    canLoad(): boolean {
        console.log('AuthorizationGuard, canLoad:' + this.oidcSecurityService.moduleSetup);
        return this.oidcSecurityService.moduleSetup;
    }
}
