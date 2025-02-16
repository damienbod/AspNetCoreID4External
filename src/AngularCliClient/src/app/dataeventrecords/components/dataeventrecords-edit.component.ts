import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { OidcSecurityService, AuthenticatedResult } from 'angular-auth-oidc-client';

import { DataEventRecordsService } from '../dataeventrecords.service';
import { DataEventRecord } from '../models/DataEventRecord';

@Component({
    selector: 'app-dataeventrecords-edit',
    templateUrl: 'dataeventrecords-edit.component.html',
    standalone: false
})

export class DataEventRecordsEditComponent implements OnInit   {

    private id = 0;
    public message: string;
    public DataEventRecord: DataEventRecord = {
        id: 0,
        name: '',
        description: '',
        timestamp: ''
    };

    isAuthenticated$: Observable<AuthenticatedResult>;

    constructor(
        private _dataEventRecordsService: DataEventRecordsService,
        public oidcSecurityService: OidcSecurityService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.message = 'DataEventRecords Edit';
        this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    }

    ngOnInit() {
        this.isAuthenticated$.pipe(
            map(({isAuthenticated}) => {
                console.log('isAuthorized: ' + isAuthenticated);
            }));

        this._route.params.subscribe(params => {
            const id = +params['id']; // (+) converts string 'id' to a number
            this.id = id;
            if (this.DataEventRecord.id === 0) {
                this._dataEventRecordsService.GetById(id)
                    .subscribe(data => this.DataEventRecord = data,
                    () => console.log('DataEventRecordsEditComponent:Get by Id complete'));
            }
        });
    }

    Update() {
        this._dataEventRecordsService.Update(this.id, this.DataEventRecord)
            .subscribe((() => console.log('subscribed')),
            () => this._router.navigate(['/dataeventrecords']));
    }
}
