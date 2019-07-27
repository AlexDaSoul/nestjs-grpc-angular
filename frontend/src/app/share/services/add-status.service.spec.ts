import { TestBed } from '@angular/core/testing';

import { AddStatusService } from './add-status.service';

describe('AddStatusService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AddStatusService = TestBed.get(AddStatusService);
        expect(service).toBeTruthy();
    });
});
