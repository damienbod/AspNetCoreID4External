import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OidcSecurityService, AuthenticatedResult } from 'angular-auth-oidc-client';

import { DataEventRecordsService } from '../dataeventrecords.service';
import { DataEventRecord } from '../models/DataEventRecord';

@Component({
    selector: 'app-dataeventrecords-list',
    templateUrl: 'dataeventrecords-list.component.html',
    standalone: false
})

export class DataEventRecordsListComponent implements OnInit {

    message: string;
    DataEventRecords: DataEventRecord[] = [];
    hasAdminRole = false;
    isAuthenticated$: Observable<AuthenticatedResult>;

    constructor(

        private dataEventRecordsService: DataEventRecordsService,
        public oidcSecurityService: OidcSecurityService,
    ) {
        this.message = 'DataEventRecords';
        this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    }

    ngOnInit() {

        this.isAuthenticated$.pipe(
            switchMap(({isAuthenticated}) => this.getData(isAuthenticated))
        ).subscribe(
            data => this.DataEventRecords = data,
            () => console.log('getData Get all completed')
        );

        this.oidcSecurityService.userData$.subscribe(({userData}) => {
            console.log('Get userData: ', userData);
            if (userData) {
                console.log('userData: ', userData);

                if (userData !== '') {
                    for (let i = 0; i < userData.role.length; i++) {
                        if (userData.role[i] === 'dataEventRecords.admin') {
                            this.hasAdminRole = true;
                        }
                        if (userData.role[i] === 'admin') {
                        }
                    }
                }
            }
        });
    }

    Delete(id: any) {
        console.log('Try to delete' + id);
        this.dataEventRecordsService.Delete(id).pipe(
            switchMap(() => this.getData(true))
        ).subscribe((data) => this.DataEventRecords = data,
            () => console.log('getData Get all completed')
        );
    }

    private getData(isAuthenticated: boolean): Observable<DataEventRecord[]> {
        if (isAuthenticated) {
            return this.dataEventRecordsService.GetAll();
        }
        return of([]);
    }
}
