import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {

    @Input() public message: string;

    constructor() {
    }

    ngOnInit() {
    }

}
