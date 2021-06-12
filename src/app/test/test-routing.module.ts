import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTestComponent } from "./createTest/createTest.component";

const routes: Routes = [{
    path: 'Create',
    pathMatch: 'full',
    component: CreateTestComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TestRoutingModule { }