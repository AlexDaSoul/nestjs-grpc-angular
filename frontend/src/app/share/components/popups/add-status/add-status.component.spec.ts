import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatusComponent } from './add-status.component';

describe('AddStatusComponent', () => {
    let component: AddStatusComponent;
    let fixture: ComponentFixture<AddStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddStatusComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
