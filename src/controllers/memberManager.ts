import { Member } from "../Models/member";
import { ICRUD } from "./ICRUD";
import { Proxy } from "./proxy";

export class MemberManager implements ICRUD {

  // Recibe Nombre, Telefono,Email,Direccion, ids
  public async create(...args: any[]) {
    return await Proxy.getInstance().createMember(args);
  }

  public async read(...args: any[]) {
    return this.getMembers().find((member) => member.id == args[0]);
  }

  public async update(...args: any[]) {
    return await Proxy.getInstance().updateMember(args);
  }

  public async delete(...args: any[]) {
    return await Proxy.getInstance().deleteMember(args);
  }

  public async signIn(pEmail: String, pPassword: String) {
    return await Proxy.getInstance().signIn(pEmail, pPassword);
  }

  public getMembers() {
    return Proxy.getInstance().getMembers();
  }

  public async loadMembers(pIdOrganization: String) {
    await Proxy.getInstance().loadMembers(pIdOrganization);
  }

  public async getMonitors() {
    return this.getMembers().filter((member) => member.role === "MONITOR");
  }
}
