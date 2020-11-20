import { Member } from "../Models/member";
import { CompositeStructure } from "../Models/structureComposite";
import {
  memberS,
  structureS,
  organizationS,
  BranchSchema,
  branchSchema,
} from "../Models/Schemas";
import { Document } from "mongoose";
import { publicDecrypt } from "crypto";

export class DatabaseManager {
  //DATABASE -> MEMORY MEMBERS
  //DB MANAGER: Cargar Miembros a memoria
  async loadMembers(pIdOrganization: String): Promise<Member[]> {
    let membersFromDB = await memberS.find({ "idOrganization": pIdOrganization });
    let members: Member[] = await this.getListMembers(membersFromDB);
    return members;
  }
  //DB MANAGER: Tranforma los documentos de la BD a objetos MIEMBROS
  async getListMembers(documents: Document[]) {
    let members: Member[] = [];
    for (let index = 0; index < documents.length; index++) {
      const document = documents[index];
      let member = new Member(
        document._id,
        document.get("name"),
        document.get("phone"),
        document.get("email"),
        document.get("direction"),
        document.get("dateBegin"),
        document.get("dateEnd"),
        document.get("monitor"),
        document.get("status")
      );
      members.push(member);
    }
    return members;
  }

  async findMembers(members: String[], memoryMembers: Member[]) {
    let membs: Member[] = [];
    members.forEach((id) => {
      memoryMembers.forEach((member) => {
        if (member.id == id) membs.push(member);
      });
    });

    return membs;
  }

  //END DATABASE -> MEMORY

  //DB MANAGER: MEMBER METHODS
  //DB MANAGER: Crear un miembro en la base de datos
  async createMember(
    pName: String,
    pIdOrganization: String,
    pPhone: String,
    pEmail: String,
    pDirection: String
  ) {
    let persistantMember = new memberS({
      name: pName,
      idOrganization: pIdOrganization,
      phone: pPhone,
      email: pEmail,
      direction: pDirection,
    });
    const message = await persistantMember.save();
    return message;
  }

  //DB MANAGER: MODIFICAR un miembro en la base de datos
  async updateMember(pId: String, pUpdate: Object) {
    const message = await memberS.findByIdAndUpdate(pId, pUpdate);
    return message;
  }

  //DB MANAGER: ELIMINAR un miembro en la base de datos
  async deleteMember(pId: String) {
    const messsage = await memberS.findByIdAndDelete(pId);
    return messsage;
  }

  //DATABASE -> MEMORY
  async loadStructures(pParent: String, pIdOrganization: String): Promise<CompositeStructure[]> {
    let memoryMembers = await this.loadMembers(pIdOrganization);
    let zones: Document[] = await this.getStructures(pParent);
    let structures: CompositeStructure[] = await this.getListStructure(zones, pIdOrganization, memoryMembers);

    return structures;
  }

  async loadBranches(pIdOrganization: String): Promise<String[]> {
    let branchesFromDB = await BranchSchema.find({ "idOrganization": pIdOrganization });
    let branches: String[] = [];
    for (const branch of branchesFromDB) {
      branches.push(branch.get('name'))
    }
    return branches;
  }


  async getListStructure(data: Document[], pIdOrganization: String, pMemoryMembers: Member[]): Promise<CompositeStructure[]> {
    const structures: CompositeStructure[] = [];
    if (data != null || data != []) {
      for (let index = 0; index < data.length; index++) {
        let children = await this.getStructures(data[index]._id);
        let groups = await this.getListStructure(children, pIdOrganization, pMemoryMembers);
        let members = await this.findMembers(data[index].get("members"), pMemoryMembers);
        let bosses = await this.findMembers(data[index].get("bosses"), pMemoryMembers);
        let objectComposite = new CompositeStructure(
          data[index].id,
          data[index].get("name"),
          groups,
          members,
          bosses,
          data[index].get("groupNumber")
        );
        structures.push(objectComposite);
      }
    }
    return structures;
  }
  //END DATABASE -> MEMORY

  //DB MANAGER: STRUCTURES METHODS
  //DB MANAGER: CREA una structure en la  base de datos
  async createStructure(pName: String, pParent: String, pGroupNumber: String) {
    let searchedStrucutre = await structureS.find({ name: pName, parent: pParent });
    //Valida si no existe una estructura con ese nombre
    if (searchedStrucutre.length == 0) {
      let persistantStructure = new structureS({
        name: pName,
        parent: pParent,
        groupNumber: pGroupNumber
      });
      const responseDB = await persistantStructure.save();
      return responseDB;
    }
    return { message: "Already exists a structure with this name: " + pName };
  }

  //DB MANAGER: OBTIENE una structure en la  base de datos
  async getStructure(pId: String, pParent: String) {
    let persistantStructure = await structureS.findOne({
      id: pId,
      parent: pParent,
    });
    return persistantStructure;
  }

  //DB MANAGER: OBTIENE una structure en la  base de datos
  async getStructures(pParent: String) {
    let structures = await structureS.find({ parent: pParent });
    return structures;
  }

  //DB MANAGER: MODIFICA una structure en la  base de datos
  async updateStructure(pId: String, pNewName: String) {
    let searchedStructure = structureS.find({ name: pNewName });
    //Valida si no existe una estructura con ese nombre
    if ((await searchedStructure).length == 0) {
      const responseDB = await structureS.findByIdAndUpdate(pId, {
        name: pNewName,
      });
      return responseDB;
    }
    return {
      message: "Already exists a structure with this name: " + pNewName,
    };
  }

  //DB MANAGER: ELIMINA una structure en la  base de datos
  async deleteStructure(pIdParent: String) {
    const data = await this.getStructures(pIdParent);
    if (data != []) {
      data.forEach((structure) => {
        return this.deleteStructure(structure._id);
      });
    }
    const message = await structureS.findByIdAndDelete(pIdParent);
    return message;
  }

  //DB MANAGER: ELIMINA una structure en la  base de datos
  async removeBoss(pIdMember: String, pIdParent: String) {
    const structures = await this.getStructures(pIdParent);
    if (structures != []) {
      structures.forEach((structure) => {
        return this.deleteStructure(structure._id);
      });
    }
  }

  async loadDefaultBranches(pIdOrganization: String) {
    const branches = await BranchSchema.find({
      idOrganization: pIdOrganization
    })
    let defaultBranches: String[] = [];
    for (const document of branches) {
      defaultBranches.push(document.get("name"));
    }
    return defaultBranches;
  }

  //DB MANAGER: Devuelve los hijos de una estructura padre
  async findLevel(pIdParent: String) {
    const data = await structureS.find({ parent: pIdParent });
    return data;
  }

  //DATABASE -> MEMORY ORGANIZATION
  //DB MANAGER: ORGANIZATION METHODS
  // Create Organization
  async createOrganization(
    pName: String,
    pLegalCertificate: String,
    pWeb: String,
    pDirection: String,
    pPhone: String,
    pLogoName: String,
    pCountry: String,
    pEmail: String,
    pPassword: String
  ) {
    const persistantOrganization = new organizationS({
      name: pName,
      legalCertificate: pLegalCertificate,
      web: pWeb,
      direction: pDirection,
      phone: pPhone,
      logoName: pLogoName,
      country: pCountry,
      email: pEmail,
      password: pPassword,
      branches: [],
    });
    const message = await persistantOrganization.save();
    return message;
  }

  //END DATABASE -> MEMORY ORGANIZATION

  //OTHER FUNCTIONS
  async addMemberToGroup(pIdMember: String, pIdStructure: String) {
    const message = await structureS.findByIdAndUpdate(pIdStructure, {
      $push: { members: pIdMember },
    });
    return { message: "Usuario Añadido" };
  }

  async removeToGroup(pSearch: Object, pIdStructure: String) {
    const deleted = await structureS.findByIdAndUpdate(
      pIdStructure,
      { $pull: pSearch }
    );
    return { message: "Usuario Eliminado" };
  }

  async addBossToGroup(pIdMember: String, pIdStructure: String) {
    //Validar no más de dos
    const message = await structureS.updateOne(
      { _id: pIdStructure },
      { $push: { bosses: pIdMember } }
    );
    let struct = await structureS.findOne({ _id: pIdStructure });
    const idParent = struct?.toJSON().parent;
    this.addMemberToGroup(pIdMember, idParent);
    return message;
  }

  //Catalogo
  async addDefaultBranch(pIdOrganization: String, pName: String) {
    let searchedBranch = BranchSchema.find({
      idOrganization: pIdOrganization,
      name: pName,
    });
    //Valida si no existe una estructura con ese nombre
    if ((await searchedBranch).length == 0) {
      const persistantDefaultBranch = new BranchSchema({
        idOrganization: pIdOrganization,
        name: pName,
      });
      const message = await persistantDefaultBranch.save();
      return message;
    }
    return {
      message: "Already exists a structure with this name: " + pName,
    };
  }

  async updateDefaultBranch(pIdOrganization: String, pOldName: String, pName: String) {
    let searchedBranch = BranchSchema.find({
      idOrganization: pIdOrganization,
      name: pName,
    });
    //Valida si no existe una estructura con ese nombre
    if ((await searchedBranch).length == 0) {
      const persistantDefaultBranch = await BranchSchema.update(
        { idOrganization: pIdOrganization, name: pOldName },
        { name: pName }
      );
      const message = persistantDefaultBranch;
      return message;
    }
    return {
      message: "Already exists a structure with this name: " + pName,
    };
  }

  async deleteDefaultBranch(pIdOrganization: String, pName: String) {
    const message = await BranchSchema.findOneAndDelete({
      idOrganization: pIdOrganization,
      name: pName,
    });
    return message;
  }


  // Organization 

  async validateOrganization(
    pEmail: String,
    pPassword: String
  ): Promise<String[]> {
    let response: String[] = [];
    const organization = await organizationS.findOne({
      email: pEmail,
      password: pPassword,
    });
    if (organization != null) {
      const persistantBranches = await BranchSchema.find({
        idOrganization: organization._id,
      });
      let branches: (String | String[])[] = [];
      for (const branch of persistantBranches) {
        branches.push(branch.get("name"));
      }

      response = [
        organization._id,
        organization.get("name"),
        organization.get("legalCertificate"),
        organization.get("web"),
        organization.get("direction"),
        organization.get("phone"),
        organization.get("logoName"),
        organization.get("country"),
        organization.get("email"),
        organization.get("password"),
        branches,
      ];
    }
    return response;
  }

  async updateOrganization(pIdOrganization: String, pNewData: Object) {
    const message = await organizationS.findByIdAndUpdate(pIdOrganization, pNewData);
    return message;
  }

  async removeOrganization(pIdOrganization: String) {
    const message = await organizationS.findOneAndDelete(pIdOrganization);
    return message;
  }
}
