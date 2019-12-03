import { TestBed } from '@angular/core/testing';

import { UserGrpcService } from './user.service';

describe('UserGrpcService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: UserGrpcService = TestBed.get(UserGrpcService);
        expect(service).toBeTruthy();
    });
});
