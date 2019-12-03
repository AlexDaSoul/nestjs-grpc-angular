import { TestBed } from '@angular/core/testing';

import { MessageGrpcService } from './message.service';

describe('StatusGrpcService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MessageGrpcService = TestBed.get(MessageGrpcService);
        expect(service).toBeTruthy();
    });
});
