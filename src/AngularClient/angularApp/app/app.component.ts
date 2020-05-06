import {
    OidcClientNotification,
    OidcSecurityService,
} from 'angular-auth-oidc-client';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import './app.component.css';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {

    @Language() lang = '';

    title = '';
    userDataChanged$: Observable<OidcClientNotification<any>>;
    userData$: Observable<any>;
    isAuthenticated = false;

    constructor(
        public oidcSecurityService: OidcSecurityService,
        public locale: LocaleService,
        public translation: TranslationService
    ) {
        console.log('AppComponent STARTING');
    }

    ngOnInit() {
        this.userData$ = this.oidcSecurityService.userData$;

        this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
            this.isAuthenticated = isAuthenticated;
            console.log('app authenticated', isAuthenticated);
        });
    }

    changeCulture(language: string, country: string) {
        this.locale.setDefaultLocale(language, country);
        console.log('set language: ' + language);
    }

    login() {
        console.log('start login');

        let culture = 'de-CH';
        if (this.locale.getCurrentCountry()) {
            culture = this.locale.getCurrentLanguage() + '-' + this.locale.getCurrentCountry();
        }
        console.log(culture);

        this.oidcSecurityService.authorize({ customParams: { 'ui_locales': culture } });
    }

    refreshSession() {
        console.log('start refreshSession');
        this.oidcSecurityService.authorize();
    }

    logoffAndRevokeTokens() {
        this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
    }

    revokeRefreshToken() {
        this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
    }

    revokeAccessToken() {
        this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
    }

}
