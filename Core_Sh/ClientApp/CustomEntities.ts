
class Custom_AlertLog  {
    constructor() { 
        this.AlertSubTypeID = "";
        this.AlertTypeID = "";
        this.CompCode = "";
        this.MsgBody = "";
        this.SystemCode = "";
        //this.MemberIDs;
    }
    public MemberIDs: Array<number>;
    public SystemCode: string;
    public AlertTypeID: string;
    public MsgBody: string;
    public CompCode: string;
    public AlertSubTypeID: string;



}
class MasterDetailsUserRoles  {

    public G_USERS: G_USERS;
    public G_RoleUsers: Array<G_RoleUsers>; 
 
}




