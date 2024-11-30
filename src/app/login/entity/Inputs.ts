import User from "./Users";

class Input {
  public inputCod: number;
  public userInput: User;
  public inputDate: string;
  public inputTime: string;

  constructor(inpc: number, usec: User, date: string, time: string) {
    this.inputCod = inpc;
    this.userInput = usec;
    this.inputDate = date;
    this.inputTime = time;
  }
}

export default Input;