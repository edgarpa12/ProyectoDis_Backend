import { Member } from "../Models/member";
import { DatabaseManager } from "../controllers/databaseManager";
import { ICRUD } from "./ICRUD";
export class MemberManager implements ICRUD {
  members: Member[] = [];
  databaseManager: DatabaseManager = new DatabaseManager();

  // Recibe Nombre, Telefono,Email,Direccion, ids
  public async create(...args: any[]) {
    const response = await this.databaseManager.createMember(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4]
    );
    return response;
  }

  public async read(...args: any[]) {
    for (let i = 0; i < this.getMembers().length; i++) {
      const member = this.getMembers()[i];
      if (member.id == args[0]) return member;
    }
  }

  public async update(...args: any[]) {
    let message = this.databaseManager.updateMember(args[0], args[1]);
    return message;
  }

  public async delete(...args: any[]) {
    const message = this.databaseManager.deleteMember(args[0]);
    return message;
  }

  public getMembers() {
    return this.members;
  }

  public async loadMembers(pIdOrganization:String) {
    this.members = await this.databaseManager.loadMembers(pIdOrganization);
  }

  public async getMonitors() {
    let monitors: Member[] = [];
    this.members.forEach((member) => {
      if (member.monitor) {
        monitors.push(member);
      }
    });
    return monitors;
  }
}
