import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterModule, Router } from '@angular/router';
import { ShareModule } from '@share/share.module';
import { MatDialogModule } from '@angular/material/dialog';

describe('AuthService', () => {
    let service: AuthService;

    const router = {
        navigateByUrl: () => {
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule, ShareModule, MatDialogModule],
            providers: [{
                provide: Router,
                useValue: router,
            }],
        });
        service = TestBed.get(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    describe('login user', () => {
        beforeEach(() => {
            spyOn(service, 'getToken').and.returnValue('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNjg3ZmMxLTdmNmYt' +
                'NGEzMS04MzNjLWQxNWJmYWEzMDlmMiIsImlhdCI6MTU1ODAxODYyOSwiZXhwIjoxNTU4MDE5MjI5fQ.R3sRT' +
                'yvQ7Tvg-IFQU2GIfc6FDzu-VvpflGXIMGQpp9T6oCJqeMwIEvPCj7OEL3w865pr87kYYupXfkSW2-w9ghkAME' +
                'vwwd_FXreLVQUftWMr8mmFE_esJfxtjh97PXybxeQVqRu-2kmXrPpZIMd0oHQYWGS4bz6XdSpyLZGeMHe-jBDix' +
                'nRXMBjIfxZCQfrO5rD_YYi-BjvbB-kRVZqEzMwGqdDtkFEVSNqF-f0h5v9po-jQoaZZEHaa5wpCEo5ZHdZC9JQ7' + '' +
                'HeZN9MONKank54SWpdxPsWL4Fmg2nGQlI7v6JYBk4y93ATvBTae_IC2JHvClO6f0e3poDaYgJ_QBIg');

            service.updateToken();
        });

        it('logout()', () => {
            spyOn(service.router, 'navigateByUrl');
            service.logout();
            expect(service.router.navigateByUrl).toHaveBeenCalledWith('/login');
        });

        it('logout(false)', () => {
            spyOn(service.router, 'navigateByUrl');
            service.logout(false);
            expect(service.router.navigateByUrl).not.toHaveBeenCalled();
        });
    });

});
