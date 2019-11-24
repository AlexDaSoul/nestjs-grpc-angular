import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShareModule } from '@share/share.module';
import { RoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ShareModule,
        RoutingModule,
        UserModule,
        ChatModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
