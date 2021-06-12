import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Test } from "./models/test.model";

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