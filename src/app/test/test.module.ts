import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CreateTestComponent } from "./createTest/createTest.component";
import { TestRoutingModule } from "./test-routing.module";
import { TestService } from "./test.service";

@NgModule({
    declarations: [CreateTestComponent],
    imports: [
        CommonModule,
        TestRoutingModule,
    ],
    providers: [TestService]
})
export class TestModule { }