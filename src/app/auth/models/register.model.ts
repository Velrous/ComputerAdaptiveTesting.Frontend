export class RegisterModel {
    public Id: number;
    public Login: string;
    public Password: string;
    public Name: string;
    public RoleId: number;
    public IsActive: boolean;
    public Email: string;

    constructor (
        id: number,
        login: string,
        password: string,
        name: string,
        roleId: number,
        isActive: boolean,
        email: string
    ) {
        this.Id = id;
        this.Login = login;
        this.Password = password;
        this.Name = name;
        this.RoleId = roleId;
        this.IsActive = isActive;
        this.Email = email;
    }
}