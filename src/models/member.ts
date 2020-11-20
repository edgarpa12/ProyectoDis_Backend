
import { AbstractComponent } from "./abstractComponent";
import { Status } from "./status";

export class Member extends AbstractComponent {
  phone: String;
  email: String;
  direction: String;
  dateBegin: Date;
  dateEnd: Date;
  status: Status;
  monitor: boolean;
  
  constructor(
    pId: String,
    pName: String,
    pPhone: String,
    pEmail: String,
    pDirection: String = "",
    pDateBegin: Date= new Date(),
    pDateEnd: Date= new Date(),
    pMonitor: boolean = false,
    pStatus: Status= Status.ACTIVE,    

  ) {
    super(pId, pName);
    this.phone = pPhone;
    this.email = pEmail;
    this.direction = pDirection;
    this.dateBegin = pDateBegin;
    this.dateEnd = pDateEnd;
    this.monitor = pMonitor;
    this.status = pStatus;
  }

  getMember(): AbstractComponent[]{
    return [this];
  }
}




