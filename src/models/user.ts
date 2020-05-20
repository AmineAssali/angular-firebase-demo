export class User {

    uid:string ;
    displayName:string;
    email:string;
    refreshToken:string;
  
    constructor(user){
      this.uid = user.uid;
      this.displayName = user.displayName;
      this.email = user.email;
      this.refreshToken = user.refreshToken;
    }

}
  