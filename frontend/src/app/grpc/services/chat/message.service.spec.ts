import { TestBed } from '@angular/core/testing';

import { StatusGrpcService } from './message.service';

describe('StatusGrpcService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: StatusGrpcService = TestBed.get(StatusGrpcService);
        expect(service).toBeTruthy();
    });
});
