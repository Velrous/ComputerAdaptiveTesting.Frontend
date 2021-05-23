export class AuthInfoModel {
    public Id: number;
    public Name: string;
    public RoleId: number;
    public RoleName: string;
    public Token?: string;
    public IsActive: boolean;

    constructor (
        id: number,
        name: string,
        roleId: number,
        roleName: string,
        token: string,
        isActive: boolean
    ) {
        this.Id = id;
        this.Name = name;
        this.RoleId = roleId;
        this.RoleName = roleName;
        this.Token = token;
        this.IsActive = isActive;
    }
}