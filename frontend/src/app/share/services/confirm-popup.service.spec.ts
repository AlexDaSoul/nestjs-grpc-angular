import { TestBed } from '@angular/core/testing';

import { ConfirmPopupService } from './confirm-popup.service';

describe('ConfirmPopupService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ConfirmPopupService = TestBed.get(ConfirmPopupService);
        expect(service).toBeTruthy();
    });
});
