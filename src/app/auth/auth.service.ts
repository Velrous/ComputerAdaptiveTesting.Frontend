import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";
import { AuthInfoModel } from "./models/auth-info.model";
import { RegisterModel } from "./models/register.model";

@Injectable({
    providedIn: 'root'
  })
export class AuthService { 
    constructor(
        private http: HttpClient
    ) { }

    public AuthStatusChanged = new EventEmitter<AuthInfoModel>();
    private _isLoggedIn = false;
    private _AuthInfo: AuthInfoModel;

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get AuthInfo() {
        return this._AuthInfo;
    }

    authToken?: string = '';
    redirectUrl: string = '';

    getAuthToken() {
        return this.authToken || null;
    }

    async logIn(login: string, password: string): Promise<AuthInfoModel> {
        let authInfo: AuthInfoModel = null;

        const authRequest = await this.http.post<any>("api/Auth/Login", {
            Login: login,
            Password: password
        })
        .toPromise();
        
        if(authRequest) {
            authInfo = new AuthInfoModel(
                authRequest.Id,
                authRequest.Name,
                authRequest.RoleId,
                authRequest.RoleName,
                authRequest.Token,
                authRequest.IsActive
            );
            this._AuthInfo = authInfo;
        }

        this._isLoggedIn = !!authInfo;
        console.log("Token", authInfo.Token);
        if(authInfo.Token)
        {
            this.authToken = authInfo.Token;
            localStorage.setItem('Token', this.authToken);
        }
        this.AuthStatusChanged.emit(authInfo);

        return authInfo;
    }

    async register(registerModel: RegisterModel) {
        const request = this.http.post<any>("api/Auth/Register", registerModel);
        console.log("Register request", request);
        if(request)
        {
            this.redirectUrl = "api/Auth/Login";
            return true;
        }
        return false;
    }

    getRolesForRegistration(): Observable<Role[]> {
        return this.http.get<Role[]>('/Api/Auth/Roles');
    } 
}