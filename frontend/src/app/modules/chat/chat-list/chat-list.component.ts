import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnInit {

    @ViewChild(CdkVirtualScrollViewport, { static: true })
    private viewport: CdkVirtualScrollViewport;

    public itemSize = 30;
    public messages = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.viewport.scrollToIndex(this.messages.length - 1);
        }, 1000);
    }

    public onSend(message: string): void {
/*        if (this.form.valid) {
            this.authGrpcService.auth(this.form.value)
                .subscribe(
                    res => {
                        this.authService.loggedIn(res.token);
                        this.form.reset();
                        this.router.navigateByUrl('/chat');
                    },
                    err => {
                        const message = err.code === 13 ? 'User not found' : err.message;

                        this.snackBar.open(message, 'close', {
                            duration: 5000,
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            panelClass: 'error-message',
                        });
                    });
        }*/
    }
}
