import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsSettingsComponent } from './boards-settings.component';

describe('BoardsSettingsComponent', () => {
    let component: BoardsSettingsComponent;
    let fixture: ComponentFixture<BoardsSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoardsSettingsComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardsSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
