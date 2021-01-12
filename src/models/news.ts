import { AbstractComponent } from "./abstractComponent";
import { Member } from "./member";

export class News {
    from!: Member;
    position!: AbstractComponent;
    body!: String;
    images?: String[];
    date!: Date;
}