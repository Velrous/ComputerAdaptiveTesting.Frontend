import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { BaseResult } from "./models/baseResult.model";
import { Test } from "./models/test.model";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService { 

    public token = '';
    private localToken = '';

    constructor(
        private http: HttpClient
    ) { }

    async createTest(newTest: Test): Promise<void> {
        console.log("createTest");
        const headers = {
            Authorization: 'Bearer ' + this.getToken()
        }
        console.log("headers", headers);
        const request = await this.http.post<void>("/api/Tests/Create", newTest, {headers: headers}).toPromise();
        console.log("Test request", request);
        return request;
    }

    async passTest(test: Test): Promise<BaseResult> {
      console.log("passTest");
      const headers = {
          Authorization: 'Bearer ' + this.getToken(),
      };
      console.log("headers", headers);
      let result: BaseResult = null;

      const request = await this.http.post<any>("/api/Tests/Pass", test, {headers: headers})
      .toPromise();
      if(request)
      {
        console.log("passTest request", request);
        result = new BaseResult(
          request.Text);
      }
      return result;
  }

    getTests(): Observable<Test[]> {
      console.log("getTests");
      const headers = {
          Authorization: 'Bearer ' + this.getToken()
      }
      console.log("headers", headers);
      const request = this.http.get<Test[]>('/api/Tests', {headers: headers});
      console.log("Tests", request);
      return request;
  }

    private getToken(): string {
        this.localToken = localStorage.getItem('Token') || sessionStorage.getItem('Token');
        if(this.localToken)
        {
          if(this.token != this.localToken)
          {
           this.token = this.localToken;
          }
        }
        return this.token;
      }
}