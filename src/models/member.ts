
import { AbstractComponent } from "./abstractComponent";
import { Status } from "./status";
import { NewsHistory } from "./newsHistory";
import { start } from "repl";
import { Roles } from "./roles";

export class Member extends AbstractComponent {
  phone: String;
  email: String;
  password: String;
  direction: String;
  dateBegin: Date;
  dateEnd: Date;
  status: String;
  role: String;
  news: NewsHistory;

  constructor(
    pId: String,
    pName: String,
    pPhone: String,
    pEmail: String,
    pPassword: String,
    pDirection: String = "",
    pDateBegin: Date = new Date(),
    pDateEnd: Date = new Date(),
    pRole: String = "",
    pStatus: String = Status[Status.ACTIVE],
    pNewsHistory: NewsHistory = new NewsHistory()
  ) {
    super(pId, pName);
    this.phone = pPhone;
    this.email = pEmail;
    this.password = pPassword;
    this.direction = pDirection;
    this.dateBegin = pDateBegin;
    this.dateEnd = pDateEnd;
    this.role = pRole;
    this.status = pStatus;
    this.news = pNewsHistory;
  }

  getMember(): AbstractComponent[] {
    return [this];
  }
}




