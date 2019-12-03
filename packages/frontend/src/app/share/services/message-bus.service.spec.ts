import { TestBed } from '@angular/core/testing';

import { MessageBusService } from './message-bus.service';

describe('MessageBusService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MessageBusService = TestBed.get(MessageBusService);
        expect(service).toBeTruthy();
    });
});
