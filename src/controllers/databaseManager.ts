import { Member } from "../Models/member";
import { CompositeStructure } from "../Models/structureComposite";
import {
  memberS,
  structureS,
  organizationS,
  branchS,
  ccgS,
  newsS,
  newsHistoryS,
} from "../Models/Schemas";
import { Document } from "mongoose";
import { CCG } from "../models/CCG";
import { News } from "../models/news";
import { AbstractComponent } from "../models/abstractComponent";
import { Organization } from "./organization";
import { Roles } from "../models/roles";

export class DatabaseManager {
  //DATABASE -> MEMORY MEMBERS
  //DB MANAGER: Cargar Miembros a memoria
  async loadMembers(pIdOrganization: String): Promise<Member[]> {
    let membersFromDB = await memberS.find({ idOrganization: pIdOrganization, role: { $ne: "CEO" } });
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
        document.get("password"),
        document.get("direction"),
        document.get("dateBegin"),
        document.get("dateEnd"),
        document.get("role"),
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
    pPassword: String,
    pDirection: String,
    pRole: String
  ) {
    if (await memberS.exists({ email: pEmail })) {
      return 0;
    } else {
      const persistantMember = new memberS({
        name: pName,
        idOrganization: pIdOrganization,
        phone: pPhone,
        email: pEmail,
        password: pPassword,
        direction: pDirection,
        role: pRole,
      });
      return await persistantMember.save();
    }
  }

  //DB MANAGER: MODIFICAR un miembro en la base de datos
  async updateMember(pId: String, pUpdate: Object) {
    console.log(pUpdate);
    await memberS.findByIdAndUpdate(pId, pUpdate);
    return { msg: 1 };
  }

  //DB MANAGER: ELIMINAR un miembro en la base de datos
  async deleteMember(pId: String) {
    await memberS.findByIdAndDelete(pId);
    return { msg: 1 };
  }

  //DATABASE -> MEMORY
  async loadStructures(
    pParent: String,
    pIdOrganization: String
  ): Promise<CompositeStructure[]> {
    let memoryMembers = await this.loadMembers(pIdOrganization);
    let zones: Document[] = await this.getStructures(pParent);
    let structures: CompositeStructure[] = await this.getListStructure(
      zones,
      pIdOrganization,
      memoryMembers
    );

    return structures;
  }

  async loadBranches(pIdOrganization: String): Promise<String[]> {
    let branchesFromDB = await branchS.find({
      idOrganization: pIdOrganization,
    });
    let branches: String[] = [];
    for (const branch of branchesFromDB) {
      branches.push(branch.get("name"));
    }
    return branches;
  }

  async getListStructure(
    data: Document[],
    pIdOrganization: String,
    pMemoryMembers: Member[]
  ): Promise<CompositeStructure[]> {
    const structures: CompositeStructure[] = [];
    if (data != null || data != []) {
      for (let index = 0; index < data.length; index++) {
        let children = await this.getStructures(data[index]._id);
        let groups = await this.getListStructure(
          children,
          pIdOrganization,
          pMemoryMembers
        );
        let members = await this.findMembers(
          data[index].get("members"),
          pMemoryMembers
        );
        let bosses = await this.findMembers(
          data[index].get("bosses"),
          pMemoryMembers
        );
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
    let searchedStrucutre = await structureS.find({
      name: pName,
      parent: pParent,
    });
    //Valida si no existe una estructura con ese nombre
    if (searchedStrucutre.length == 0) {
      let persistantStructure = new structureS({
        name: pName,
        parent: pParent,
        groupNumber: pGroupNumber,
      });
      await persistantStructure.save();
      return { msg: 1 };
    }
    return { msg: 0 };
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
      await structureS.findByIdAndUpdate(pId, {
        name: pNewName,
      });
      return { msg: 1 };
    }
    return { msg: 0 };
  }

  //DB MANAGER: ELIMINA una structure en la  base de datos
  async deleteStructure(pIdParent: String) {
    const data = await this.getStructures(pIdParent);
    if (data != []) {
      data.forEach((structure: any) => {
        return this.deleteStructure(structure._id);
      });
    }
    //No hay validacion
    await structureS.findByIdAndDelete(pIdParent);
    return { msg: 1 };
  }

  ///REVISAR ESTO
  //DB MANAGER: ELIMINA una structure en la  base de datos
  async removeBoss(pIdMember: String, pIdParent: String) {
    const structures = await this.getStructures(pIdParent);
    if (structures != []) {
      structures.forEach((structure: any) => {
        return this.deleteStructure(structure._id);
      });
    }
  }

  async loadDefaultBranches(pIdOrganization: String) {
    const branches = await branchS.find({
      idOrganization: pIdOrganization,
    });
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
    pEmail: String
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
    return { msg: 1 };
  }

  async removeFromGroup(pSearch: Object, pIdStructure: String) {
    const deleted = await structureS.findByIdAndUpdate(pIdStructure, {
      $pull: pSearch,
    });
    return { msg: 1 };
  }

  async addBossToGroup(pIdMember: String, pIdStructure: String) {
    //Validar no más de dos
    await structureS.updateOne(
      { _id: pIdStructure },
      { $push: { bosses: pIdMember } }
    );
    let struct = await structureS.findOne({ _id: pIdStructure });
    const idParent = struct?.toJSON().parent;
    this.addMemberToGroup(pIdMember, idParent);
    return { msg: 1 };
  }

  //Catalogo
  async addDefaultBranch(pIdOrganization: String, pName: String) {
    let searchedBranch = branchS.find({
      idOrganization: pIdOrganization,
      name: pName,
    });
    //Valida si no existe una estructura con ese nombre
    if ((await searchedBranch).length == 0) {
      const persistantDefaultBranch = new branchS({
        idOrganization: pIdOrganization,
        name: pName,
      });
      await persistantDefaultBranch.save();
      return { msg: 1 };
    }
    return {
      msg: 0,
    };
  }

  async updateDefaultBranch(
    pIdOrganization: String,
    pOldName: String,
    pName: String
  ) {
    let searchedBranch = branchS.find({
      idOrganization: pIdOrganization,
      name: pName,
    });
    //Valida si no existe una estructura con ese nombre
    if ((await searchedBranch).length == 0) {
      await branchS.update(
        { idOrganization: pIdOrganization, name: pOldName },
        { name: pName }
      );
      return { msg: 1 };
    }
    return { msg: 0, };
  }

  async deleteDefaultBranch(pIdOrganization: String, pName: String) {
    await branchS.findOneAndDelete({
      idOrganization: pIdOrganization,
      name: pName,
    });
    return { msg: 1 };
  }

  async signIn(
    pEmail: String,
    pPassword: String
  ): Promise<String[]> {
    let response: String[] = [];

    const member = await memberS.findOne({
      email: pEmail,
      password: pPassword
    })

    if (member !== null) {
      const organization = await organizationS.findById(member.idOrganization);

      const persistantBranches = await branchS.find({
        idOrganization: member.idOrganization
      });

      let branches: (String | String[])[] = [];
      for (const branch of persistantBranches) {
        branches.push(branch.get("name"));
      }

      response = [
        [organization._id,
        organization.get("name"),
        organization.get("legalCertificate"),
        organization.get("web"),
        organization.get("direction"),
        organization.get("phone"),
        organization.get("logoName"),
        organization.get("country"),
        organization.get("email"),
          branches,],
        member
      ]
    } else {
      // Que asco pero sino no lo agarraba
      response = ["0"]
    }

    return response;
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
      const persistantBranches = await branchS.find({
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
    return organizationS.findByIdAndUpdate(pIdOrganization, pNewData);
  }

  async removeOrganization(pIdOrganization: String) {
    return organizationS.findOneAndDelete(pIdOrganization);
  }

  async saveCCG(pCcg: CCG) {
    const persistantCCG = new ccgS({
      idOrganization: Organization.getInstance().id,
      from: pCcg.from,
      body: pCcg.body,
      type: pCcg.type,
    });
    return await persistantCCG.save();
  }

  async saveNews(pNews: News, component: AbstractComponent) {
    const persistantNews = new newsS({
      from: pNews.from,
      to: component,
      body: pNews.body,
      images: pNews.images,
    });
    return await persistantNews.save();
  }

  async seenNews(pIdMember: String, pNews: [String]) {
    let searchedMember = newsHistoryS.find({ member: pIdMember });
    //Valida si no existe una estructura con ese nombre
    if ((await searchedMember).length == 0) {
      const persistantNewsHistory = new newsHistoryS({
        member: pIdMember,
        seenNews: pNews,
      });
      return await persistantNewsHistory.save();
    } else {
      const message = newsHistoryS.updateOne(
        { member: pIdMember },
        { $push: { seenNews: pNews } }
      );
      return await message.save();
    }
  }
}
