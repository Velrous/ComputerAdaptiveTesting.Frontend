export class RegisterModel {
    public UserName: string;
    public Email: string;
    public RoleId: number;
    public Password: string;

    constructor (
        userName: string,
        email: string,
        roleId: number,
        password: string
    ) {
        this.UserName = userName;
        this.Email = email;
        this.RoleId = roleId;
        this.Password = password;
    }
}