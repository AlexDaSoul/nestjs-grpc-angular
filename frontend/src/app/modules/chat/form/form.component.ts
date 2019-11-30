import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent  {

    @Output() send: EventEmitter<string> = new EventEmitter();

    public form: FormGroup = this.fb.group({
        message: [null],
    });

    constructor(private fb: FormBuilder) {
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.send.emit(this.form.value.message);
            this.form.reset();
        }
    }
}
