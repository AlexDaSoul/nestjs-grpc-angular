import { TestBed, async, inject } from '@angular/core/testing';

import { AuthChildGuard } from './auth-child.guard';

describe('AuthChildGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthChildGuard],
        });
    });

    it('should ...', inject([AuthChildGuard], (guard: AuthChildGuard) => {
        expect(guard).toBeTruthy();
    }));
});
