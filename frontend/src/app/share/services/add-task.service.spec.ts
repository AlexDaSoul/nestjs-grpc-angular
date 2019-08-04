import { TestBed } from '@angular/core/testing';

import { AddTaskService } from './add-task.service';

describe('AddTaskService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AddTaskService = TestBed.get(AddTaskService);
        expect(service).toBeTruthy();
    });
});
