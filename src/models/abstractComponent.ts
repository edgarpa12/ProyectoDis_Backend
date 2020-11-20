

export abstract class AbstractComponent {
  id: String;
  name: String;

  constructor(id: String ="", name: String="") {
    this.id = id;
    this.name = name;
  }

  abstract getMember(): AbstractComponent[];
}


