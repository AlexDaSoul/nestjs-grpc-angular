import { TestBed } from '@angular/core/testing';

import { ChatGrpcService } from './chat.service';

describe('TaskGrpcService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ChatGrpcService = TestBed.get(ChatGrpcService);
        expect(service).toBeTruthy();
    });
});
