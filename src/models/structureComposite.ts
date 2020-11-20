import { AbstractComponent } from "./abstractComponent";

export class CompositeStructure extends AbstractComponent {
  groups: CompositeStructure[];
  members: AbstractComponent[];
  bosses: AbstractComponent[];
  groupNumber: String;
  constructor(
    pId: String = "",
    pName: String = "",
    pGroups: CompositeStructure[] = [],
    pMembers: AbstractComponent[] = [],
    pBosses: AbstractComponent[] = [],
    pGroupNumber: String = ""
  ) {
    super(pId, pName);
    this.groups = pGroups;
    this.members = pMembers;
    this.bosses = pBosses;
    this.groupNumber = pGroupNumber;
  }

  public addMember(pMember: AbstractComponent) {
    this.members.push(pMember);
  }

  public removeMember() {}

  public addSubGroup(pStructure: CompositeStructure) {
    this.groups.push(pStructure);
  }

  public removeSubGroup() {}

  getMember(): AbstractComponent[] {
    let members: AbstractComponent[] = [];
    for (let i = 0; i < this.members.length; i++) {
      const member = this.members[i];
      members.push(member);
    }
    // console.log("MIEMBROS+ " + members)
    return members;
  }

  public getGroups() {
    let groups: AbstractComponent[] = [];
    for (let i = 0; i < this.groups.length; i++) {
      const group = this.groups[i];
      groups.push(group);
    }
    return groups;
  }

  public getBosses(): AbstractComponent[] {
    let bosses: AbstractComponent[] = [];
    for (let i = 0; i < this.bosses.length; i++) {
      const boss = this.bosses[i];
      bosses.push(boss);
    }
    return bosses;
  }
}
