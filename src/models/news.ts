export class News {
  from!: String;
  to!: String;
  body!: String;
  images?: String[];
  date?: Date;

  constructor(pFrom: String, pTo: String, pBody: String, pImages: String[]) {
    this.from = pFrom;
    this.to = pTo;
    this.body = pBody;
    this.images = pImages;
  }
}
