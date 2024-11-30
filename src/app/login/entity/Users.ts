class User {
  public userCod: number;
  public userNames: string;
  public userLastNames: string;

  constructor(ucod: number, name: string, last: string) {
    this.userCod = ucod;
    this.userNames = name;
    this.userLastNames = last;
  }
}

export default User;