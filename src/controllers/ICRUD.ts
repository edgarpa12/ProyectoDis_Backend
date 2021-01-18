export interface ICRUD {
  create(...args: any[]): Object;

  read(...args: any[]): Object;

  update(...args: any[]): Object;

  delete(...args: any[]): Object;
}

