import { Member } from "../Models/member";
import { ICRUD } from "./ICRUD";
import { Proxy } from "./proxy";

export class MemberManager implements ICRUD {

  // Recibe Nombre, Telefono,Email,Direccion, ids
  public async create(...args: any[]) {
    return await Proxy.getInstance().createMember(args);
  }

  public async read(...args: any[]) {
    for (let i = 0; i < this.getMembers().length; i++) {
      const member = this.getMembers()[i];
      if (member.id == args[0]) return member;
    }
  }

  public async update(...args: any[]) {
    return await Proxy.getInstance().updateMember(args);
  }

  public async delete(...args: any[]) {
    return await Proxy.getInstance().deleteMember(args);
  }

  public getMembers() {
    return Proxy.getInstance().getMembers();
  }

  public async loadMembers(pIdOrganization: String) {
    await Proxy.getInstance().loadMembers(pIdOrganization);
  }

  public async getMonitors() {
    let monitors: Member[] = [];
    this.getMembers().forEach((member) => {
      if (member.monitor) {
        monitors.push(member);
      }
    });
    return monitors;
  }
}
