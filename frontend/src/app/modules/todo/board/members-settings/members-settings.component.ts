import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-members-settings',
    templateUrl: './members-settings.component.html',
    styleUrls: ['./members-settings.component.scss'],
})
export class MembersSettingsComponent {

    @Input() private members: string[];

    constructor() {
    }

    ngOnInit() {
        console.log(this.members)
    }

}
