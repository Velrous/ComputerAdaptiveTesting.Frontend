import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../models/answer.model';
import { BaseResult } from '../models/baseResult.model';
import { Question } from '../models/question.model';
import { Test } from '../models/test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.css']
})
export class PassTestComponent implements OnInit {

  constructor(
    private testService: TestService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['name', 'action'];
  test: Test;
  tests: Test[] = [];
  question: Question;
  answers: Answer[] = [];
  baseResult: BaseResult = new BaseResult('');
  isOpenTest = false;
  isOpenResult = false;
  isChecked = false;
  isCheckedId = 0;
  index = 0;

  ngOnInit(): void {
    this.getTests();
    console.log("getTests", this.tests);
  }

  getTests() {
    this.testService.getTests().subscribe((response) => this.tests = response);
  }

  openTest(row) {
    console.log("openTest", row);
    this.test = row;
    this.isOpenTest = true;
    this.question = this.test.Questions[0];
    this.answers = this.question.Answers;
  }

  previousQuestion() {
    this.test.Questions[this.index].Answers = this.answers;
    this.index--;
    this.question = this.test.Questions[this.index];
    this.answers = this.question.Answers;
    this.isChecked = false;
    this.isCheckedId = 0;
    this.onChangePage();
    console.log("previousQuestion", this.test);
  }

  nextQuestion() {
    console.log("nextQuestionStart1", this.index);
    console.log("nextQuestionStart2", this.test.Questions.length);
    this.test.Questions[this.index].Answers = this.answers;
    this.index++;
    this.question = this.test.Questions[this.index];
    this.answers = this.question.Answers;
    this.isChecked = false;
    this.isCheckedId = 0;
    this.onChangePage();
    console.log("nextQuestionStart3", this.test);
  }

  finishTest() {
    this.test.Questions[this.index].Answers = this.answers;
    this.testService.passTest(this.test).then((result) => this.baseResult = result);
    console.log("finishTest", this.baseResult);
    this.isOpenResult = true;
  }

  exit() {
    this.router.navigate(['./home']);
  }

  onChange(id: number){  
    console.log("onChange", id);     
    this.isChecked = !this.isChecked;
    this.isCheckedId = id;
  }

  onChangePage() {
    console.log("onChangePage", this.answers.filter(x => x.IsRight).length > 0);
    if(this.answers.filter(x => x.IsRight).length > 0)
    {
      this.isChecked = !this.isChecked;
      this.isCheckedId = this.answers.find(x =>x.IsRight).Id;
    }
  }
}
