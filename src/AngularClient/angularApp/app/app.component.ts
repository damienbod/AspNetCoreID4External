import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {

    title = '';

    isAuthorizedSubscription: Subscription | undefined;
    isAuthorized = false;

    onChecksessionChanged: Subscription | undefined;
    checksession = false;

    constructor(
        public oidcSecurityService: OidcSecurityService
    ) {
        console.log('AppComponent STARTING');

        if (this.oidcSecurityService.moduleSetup) {
            this.doCallbackLogicIfRequired();
        } else {
            this.oidcSecurityService.onModuleSetup.subscribe(() => {
                this.doCallbackLogicIfRequired();
            });
        }

        this.oidcSecurityService.onCheckSessionChanged.subscribe(
            (checksession: boolean) => {
                console.log('...recieved a check session event');
                this.checksession = checksession;
            });

        this.oidcSecurityService.onAuthorizationResult.subscribe(
            (authorizationResult: AuthorizationResult) => {
                this.onAuthorizationResultComplete(authorizationResult);
            });
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });
    }

    ngOnDestroy(): void {
        if (this.isAuthorizedSubscription) {
            this.isAuthorizedSubscription.unsubscribe();
        }
        this.oidcSecurityService.onModuleSetup.unsubscribe();
        this.oidcSecurityService.onCheckSessionChanged.unsubscribe();
        this.oidcSecurityService.onAuthorizationResult.unsubscribe();
    }

    login() {
        console.log('start login');

        this.oidcSecurityService.authorize();
    }

    refreshSession() {
        console.log('start refreshSession');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }

    private doCallbackLogicIfRequired() {
        if (window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }

    private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
        console.log('Auth result received:' + authorizationResult);
        if (authorizationResult === AuthorizationResult.unauthorized) {
            if (window.parent) {
                // sent from the child iframe, for example the silent renew
                window.parent.location.href = '/unauthorized';
            } else {
                // sent from the main window
                window.location.href = '/unauthorized';
            }
        }
    }
}
