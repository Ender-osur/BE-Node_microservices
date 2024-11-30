import User from "./Users";

class Access {
  public userCod: User;
  public accessEmail: string;
  public accessKey: string;
  public accesUuid: string;
  
  constructor(ucod: User, aema: string, akey: string, auui: string) {
    this.userCod = ucod;
    this.accessEmail = aema;
    this.accessKey = akey;
    this.accesUuid = auui;
  }
}

export default Access;