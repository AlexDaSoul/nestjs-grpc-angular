import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSettingsComponent } from './status-settings.component';

describe('StatusSettingsComponent', () => {
    let component: StatusSettingsComponent;
    let fixture: ComponentFixture<StatusSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusSettingsComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
