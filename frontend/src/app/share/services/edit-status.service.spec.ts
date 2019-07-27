import { TestBed } from '@angular/core/testing';

import { EditStatusService } from './edit-status.service';

describe('EditStatusService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: EditStatusService = TestBed.get(EditStatusService);
        expect(service).toBeTruthy();
    });
});
