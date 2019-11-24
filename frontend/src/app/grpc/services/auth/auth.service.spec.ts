import { TestBed } from '@angular/core/testing';

import { AuthGrpcService } from './auth.service';

describe('AuthGrpcService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AuthGrpcService = TestBed.get(AuthGrpcService);
        expect(service).toBeTruthy();
    });
});
