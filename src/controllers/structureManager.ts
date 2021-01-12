import { PROXY_AUTHENTICATION_REQUIRED } from "http-status";
import { AbstractComponent } from "../Models/abstractComponent";
import { CompositeStructure } from "../Models/structureComposite";
import { DatabaseManager } from "./databaseManager";
import { Proxy } from "./proxy";

export class StructureManager {

  //El structure manager lleva el id de la organizacion para actualizar la info en memoria por cada llamada a base de datos
  // idOrganization: String = "";

  public getStructures() {
    return Proxy.getInstance().getStructures();
  }

  // public setIdOrganization(id: String) {
  //   this.idOrganization = id;
  //   this.loadStructures(this.idOrganization);
  // }

  //Retorna una estructura en base a su jerarquia
  public async getOneStructure(pIds: String[]) {
    let structsMEM: CompositeStructure[] = this.getStructures();
    let compositeFound: CompositeStructure = new CompositeStructure();
    pIds.reverse();
    while (pIds.length > 0) {
      let id = pIds.pop();
      compositeFound = this.findStructure(id, structsMEM);
      structsMEM = compositeFound.groups;
    }
    return compositeFound;
  }

  public async read(...args: any[]) {
    this.getStructures().forEach((structure) => {
      if (structure.id == args[0]) return structure;
    });
  }

  public findStructure(
    pId: String | undefined,
    pList: CompositeStructure[]
  ): CompositeStructure {
    let match: CompositeStructure = new CompositeStructure();
    pList.forEach((structure) => {
      if (structure.id == pId) {
        match = structure;
        return;
      }
    });
    return match;
  }

  public findMember(
    pId: String,
    pListMembers: AbstractComponent[]
  ) {
    for (const member of pListMembers) {
      if (member.id == pId) {
        return member;
      }
    }
    return null;
  }

  // BASE DE DATOS
  public async loadStructures(pParent: String) {
    this.structures = await this.databaseManager.loadStructures(pParent, pParent);
  }

  public async create(...args: any[]) {
    const message = await this.databaseManager.createStructure(args[0], args[1], args[2]);
    return message;
  }

  public async update(...args: any[]) {
    const message = this.databaseManager.updateStructure(args[0], args[1]);
    return message;
  }

  public async delete(...args: any[]) {
    const message = this.databaseManager.deleteStructure(args[0]);
    return message;
  }

  public async findLevel(...args: any[]) {
    return this.databaseManager.findLevel(args[0]);
  }

  //STRUCTURE MANAGER: MEMORIA
  //Retorna los miembros de una estructura
  public async getStructureMembers(pIds: String[]) {
    let structure = await this.getOneStructure(pIds);
    let members = structure.getMember();
    return members;
  }

  //Retorna los jefes de una estructura
  public async getStructureBosses(pIds: String[]) {
    let structure = await this.getOneStructure(pIds);
    let bosses = structure.getBosses();
    return bosses;
  }

  //Retorna los grupos de una estructura
  public async getStructureGroups(pIds: String[]) {
    let structure = await this.getOneStructure(pIds);
    let groups = structure.getGroups();
    return groups;
  }

  public async addMemberToGroup(pIdMember: String, pIds: String[]) {
    const pIdsBranch = pIds.slice(0, pIds.length - 1);
    let branch = await this.getOneStructure(pIdsBranch);
    let group: CompositeStructure = new CompositeStructure();
    for (let index = 0; index < branch.groups.length; index++) {
      group = branch.groups[index];
      //Valida si ya es un miembro
      if (this.findMember(pIdMember, group.members) != null) {
        return { message: "This user is already a member in this structure" };
      }
    }
    const message = await this.databaseManager.addMemberToGroup(pIdMember, group.id);
    return message;
  }

  public async removeMemberFromStructure(pIdMember: String, pIdGroup: String) {
    let search = { members: pIdMember };
    const message = Proxy.getInstance().removeFromGroup(search, pIdGroup);
    // this.loadStructures(this.idOrganization);
    return message;
  }

  public async removeBossFromStructure(
    pIdMember: String,
    pIdBranch: String,
    pIdGroup: String
  ) {
    let searchB = { bosses: pIdMember };
    let searchM = { members: pIdMember };
    const messageB = await Proxy.getInstance().removeFromGroup(searchB, pIdGroup);
    const messageM = await Proxy.getInstance().removeFromGroup(searchM, pIdBranch);
    // await this.loadStructures(this.idOrganization);
    return messageM;
  }

  public async addBossToGroup(pIdMember: String, pIds: String[]) {
    let structure = await this.getOneStructure(pIds);
    //Valida si ya es un jefe
    if (this.findMember(pIdMember, structure.bosses) != null) {
      return { message: "This member is already a boss for this structure" };
    }
    //Valida si ya hay más de un dos jefes
    if (structure.bosses.length >= 2) {
      return { message: "Max of bosses is 2" };
    }
    const message = Proxy.getInstance().addBossToGroup(
      pIdMember,
      structure.id
    );
    //this.loadStructures(this.idOrganization);
    return message;
  }

  public getStructuresXMember(
    pIdMember: String,
    pStructures: CompositeStructure[]
  ): CompositeStructure[] {
    let structures: CompositeStructure[] = [];
    if (pStructures != []) {
      for (let structure of pStructures) {
        if (this.findMember(pIdMember, structure.members) != null) {
          structures.push(structure);
        }
        structures = structures.concat(this.getStructuresXMember(pIdMember, structure.groups));
      }
    }
    return structures;
  }
}
