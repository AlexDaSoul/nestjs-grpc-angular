import { TestBed } from '@angular/core/testing';

import { TaskGrpcService } from './task.service';

describe('TaskGrpcService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TaskGrpcService = TestBed.get(TaskGrpcService);
        expect(service).toBeTruthy();
    });
});
