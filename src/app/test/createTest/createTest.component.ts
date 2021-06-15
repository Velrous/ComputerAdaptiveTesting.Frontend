import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';
import { Test } from '../models/test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-createTest',
  templateUrl: './createTest.component.html',
  styleUrls: ['./createTest.component.css']
})
export class CreateTestComponent implements OnInit {

  constructor(
    private testService: TestService,
    private router: Router
  ) { }

  isCreateTest = true;
  isCreateQuestionsAndAnswers = false;
  index = 0;
  createdQuestionCount = 0;
  test: Test = new Test;
  questions: Question[] = [];
  answers: Answer[] = [new Answer(1, "", false), new Answer(2, "", false), new Answer(3, "", false), new Answer(4, "", false)];
  isChecked = false;
  isCheckedId = 0;
  testModel = {
    name: "",
    questionCount: 0,
  }
  questionModel = {
    questionName: ""
  }
  // answersModel = {
  //   name1: "",
  //   isRight1: false,
  //   name2: "",
  //   isRight2: false,
  //   name3: "",
  //   isRight3: false,
  //   name4: "",
  //   isRight4: false,
  // }


  ngOnInit(): void {
  }

  createTest() {
    console.log("createTest length", this.questions.length);
    if(this.isCreateTest && !this.isCreateQuestionsAndAnswers)
    {
      this.test.Name = this.testModel.name;
      this.isCreateTest = false;
      this.isCreateQuestionsAndAnswers = true;
      console.log("createTest", this.testModel)
    }
    else
    {
      let question = new Question();
      question.Name = this.questionModel.questionName;
      // this.answers.push(new Answer(null, this.answersModel.name1, this.answersModel.isRight1));
      // this.answers.push(new Answer(null, this.answersModel.name2, this.answersModel.isRight2));
      // this.answers.push(new Answer(null, this.answersModel.name3, this.answersModel.isRight3));
      // this.answers.push(new Answer(null, this.answersModel.name4, this.answersModel.isRight4));
      question.Answers = this.answers;
      this.answers = [new Answer(1, "", false), new Answer(2, "", false), new Answer(3, "", false), new Answer(4, "", false)];
      this.questions.push(question);
      console.log("createTest", this.questions);
      this.test.Questions = this.questions;
      this.testService.createTest(this.test);
      this.router.navigate(['./home']);
    }
  }

  nextQuestion() {
    console.log("nextQuestionStart1", this.index);
    console.log("nextQuestionStart2", this.questions.length);
    if(this.index+1-this.questions.length == 1)
    {
      let question = new Question();
      question.Name = this.questionModel.questionName;
      // this.answers.push(new Answer(null, this.answersModel.name1, this.answersModel.isRight1));
      // this.answers.push(new Answer(null, this.answersModel.name2, this.answersModel.isRight2));
      // this.answers.push(new Answer(null, this.answersModel.name3, this.answersModel.isRight3));
      // this.answers.push(new Answer(null, this.answersModel.name4, this.answersModel.isRight4));
      question.Answers = this.answers;
      this.answers = [new Answer(1, "", false), new Answer(2, "", false), new Answer(3, "", false), new Answer(4, "", false)];
      this.isChecked = false;
      this.isCheckedId = 0;
      this.onChangePage();
      console.log("5", question);
      this.questions.push(question);
      console.log("nextQuestion", this.questions);
      this.createdQuestionCount++;
      if(this.index + 1 < this.testModel.questionCount)
      {
        this.index++;
        this.questionModel.questionName = "";
        // this.answersModel.name1 = "";
        // this.answersModel.name2 = "";
        // this.answersModel.name3 = "";
        // this.answersModel.name4 = "";
        // this.answersModel.isRight1 = false;
        // this.answersModel.isRight2 = false;
        // this.answersModel.isRight3 = false;
        // this.answersModel.isRight4 = false;
        // this.answers = [];
        this.answers = [new Answer(1, "", false), new Answer(2, "", false), new Answer(3, "", false), new Answer(4, "", false)];
      }
    }
    else 
    {
      if(this.index+1 < this.questions.length)
      {
        this.index++;
        let nextQuestion = new Question;
        nextQuestion = this.questions[this.index];
        this.questionModel.questionName = nextQuestion.Name;
        this.answers = nextQuestion.Answers;
        this.isChecked = false;
        this.isCheckedId = 0;
        this.onChangePage();
        // this.answersModel.name1 = nextQuestion.Answers[0].Name;
        // this.answersModel.name2 = nextQuestion.Answers[1].Name;
        // this.answersModel.name3 = nextQuestion.Answers[2].Name;
        // this.answersModel.name4 = nextQuestion.Answers[3].Name;
        // this.answersModel.isRight1 = nextQuestion.Answers[0].IsRight;
        // this.answersModel.isRight2 = nextQuestion.Answers[1].IsRight;
        // this.answersModel.isRight3 = nextQuestion.Answers[2].IsRight;
        // this.answersModel.isRight4 = nextQuestion.Answers[3].IsRight;
      }
      else
      {
        this.index++;
        this.questionModel.questionName = "";
        // this.answersModel.name1 = "";
        // this.answersModel.name2 = "";
        // this.answersModel.name3 = "";
        // this.answersModel.name4 = "";
        // this.answersModel.isRight1 = false;
        // this.answersModel.isRight2 = false;
        // this.answersModel.isRight3 = false;
        // this.answersModel.isRight4 = false;
        // this.answers = [];
        this.isChecked = false;
        this.isCheckedId = 0;
        this.answers = [new Answer(1, "", false), new Answer(2, "", false), new Answer(3, "", false), new Answer(4, "", false)];
        this.onChangePage();
      }
    }
  }

  previousQuestion() {
    if(this.index - 1 >= 0)
    {
      this.index--;
      let previousQuestion = new Question;
      previousQuestion = this.questions[this.index];
      this.questionModel.questionName = previousQuestion.Name;
      this.answers = previousQuestion.Answers;
      this.isChecked = false;
      this.isCheckedId = 0;
      this.onChangePage();
      // this.answersModel.name1 = previousQuestion.Answers[0].Name;
      // this.answersModel.name2 = previousQuestion.Answers[1].Name;
      // this.answersModel.name3 = previousQuestion.Answers[2].Name;
      // this.answersModel.name4 = previousQuestion.Answers[3].Name;
      // this.answersModel.isRight1 = previousQuestion.Answers[0].IsRight;
      // this.answersModel.isRight2 = previousQuestion.Answers[1].IsRight;
      // this.answersModel.isRight3 = previousQuestion.Answers[2].IsRight;
      // this.answersModel.isRight4 = previousQuestion.Answers[3].IsRight;
    }
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
