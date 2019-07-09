import { TestBed } from '@angular/core/testing';

import { UserStoreService } from './user-store.service';

describe('UserStoreService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: UserStoreService = TestBed.get(UserStoreService);
        expect(service).toBeTruthy();
    });
});
