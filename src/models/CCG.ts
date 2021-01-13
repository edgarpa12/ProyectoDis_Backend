export class CCG {
  from!: String;
  body!: String;
  enabled: boolean = true;
  type!: String;
  date?: Date;

  constructor(pFrom: String, pBody: String, pType: String) {
    this.from = pFrom;
    this.body = pBody;
    this.type = pType;
  }
}
