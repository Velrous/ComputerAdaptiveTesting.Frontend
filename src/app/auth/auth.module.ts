import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./auth.service";
import { LogInComponent } from "./log-in/log-in.component";

@NgModule({
    declarations: [LogInComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
    ],
    providers: [AuthService]
})
export class AuthModule { }