import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.css']
})
export class PassTestComponent implements OnInit {

  constructor(
    private testService: TestService
  ) { }

  displayedColumns: string[] = ['name', 'action'];
  tests: Test[] = [];

  ngOnInit(): void {
    this.getTests();
    console.log("getTests", this.tests);
  }

  getTests() {
    this.testService.getTests().subscribe((response) => this.tests = response);
  }

  openTest(row) {
    console.log("openTest", row);
  }

}
