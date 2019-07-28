import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSettingsComponent } from './members-settings.component';

describe('MembersSettingsComponent', () => {
    let component: MembersSettingsComponent;
    let fixture: ComponentFixture<MembersSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MembersSettingsComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MembersSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
