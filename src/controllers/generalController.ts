import { Request, Response } from "express";
import { Organization } from "./organization";

export class GeneralController {
  private static instance: GeneralController;

  public static getInstance() {
    if (!GeneralController.instance) {
      GeneralController.instance = new GeneralController();
    }
    return GeneralController.instance;
  }

  //Members Functions
  async getMembers(req: Request, res: Response) {
    try {
      const message = await Organization.getInstance().getMembers();
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  // Recibe id del miembro a buscar
  public async getMember(req: Request, res: Response) {
    const { idUser } = req.body;
    try {
      const response = await Organization.getInstance().readMember(idUser);
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async createMember(req: Request, res: Response) {
    const { name, phone, email, direction } = req.body;
    try {
      const message = await Organization.getInstance().createMember(
        name,
        phone,
        email,
        direction
      );
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async updateMember(req: Request, res: Response) {
    const { id, newData } = req.body;
    try {
      const message = await Organization.getInstance().updateMember(id, newData);
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async deleteMember(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const message = await Organization.getInstance().deleteMember(id);
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async changeGroup(req: Request, res: Response) {
    const { idUser, idOldGroup, ids } = req.body;
    try {
      const response = await Organization.getInstance().changeGroup(
        idUser,
        idOldGroup,
        ids
      );
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async getMonitors(req: Request, res: Response) {
    try {
      const response = await Organization.getInstance().getMonitors();
      return res.json(response);
    } catch (err) { }
  }

  // Structure
  public async createStructure(req: Request, res: Response) {
    const { name, idParent, groupNumber } = req.body;
    try {
      const message = await Organization.getInstance().createStructure(
        name,
        idParent,
        groupNumber
      );
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }


  public async updateStructure(req: Request, res: Response) {
    const { _id, newName } = req.body;
    try {
      const message = await Organization.getInstance().updateStructure(
        _id,
        newName
      );
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async deleteStructure(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const message = await Organization.getInstance().deleteStructure(id);
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async getStructures(req: Request, res: Response) {
    try {
      const response = await Organization.getInstance().getStructures();
      return res.json(response);
    } catch (err) { }
  }

  public async getDefaultBranches(req: Request, res: Response) {
    try {
      const response = await Organization.getInstance().getDefaultBranches();
      return res.json(response);
    } catch (err) { }
  }

  public async getLevelByParent(req: Request, res: Response) {
    try {
      const idParent = req.body.parent;
      const response = await Organization.getInstance().findLevel(idParent);
      return res.json(response);
    } catch (err) { }
  }

  public async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const message = await Organization.getInstance().signIn(email, password);
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async signUp(req: Request, res: Response) {
    const {
      name,
      legalCertificate,
      web,
      direction,
      phone,
      logoName,
      country,
      email,
      password,
    } = req.body;
    try {
      const message = await Organization.getInstance().signUp(
        name,
        legalCertificate,
        web,
        direction,
        phone,
        logoName,
        country,
        email,
        password
      );
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public signOut(req: Request, res: Response) {
    try {
      const message = Organization.getInstance().signOut();
      return res.json(message);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }
  public async getStructureMembers(req: Request, res: Response) {
    try {
      const ids = req.body.ids;
      const response = await Organization.getInstance().getStructureMembers(
        ids
      );
      return res.json(response);
    } catch (err) { }
  }

  public async getStructureBosses(req: Request, res: Response) {
    try {
      const ids = req.body.ids;
      const response = await Organization.getInstance().getStructureBosses(ids);
      return res.json(response);
    } catch (err) { }
  }

  public async getStructureGroups(req: Request, res: Response) {
    try {
      const ids = req.body.ids;
      const response = await Organization.getInstance().getStructureGroups(ids);
      return res.json(response);
    } catch (err) { }
  }

  public async getStructuresXMember(req: Request, res: Response) {
    try {
      const { idUser } = req.body;
      const response = await Organization.getInstance().getStructuresXMember(
        idUser
      );
      return res.json(response);
    } catch (err) { }
  }

  public async addMemberToGroup(req: Request, res: Response) {
    try {
      const { idMember, ids } = req.body;
      const response = await Organization.getInstance().addMemberToGroup(
        idMember,
        ids
      );
      return res.json(response);
    } catch (err) { }
  }

  public async addBossToGroup(req: Request, res: Response) {
    try {
      const { idBoss, ids } = req.body;
      const response = await Organization.getInstance().addBossToGroup(
        idBoss,
        ids
      );
      return res.json(response);
    } catch (err) { }
  }

  public async addMonitorToGroup(req: Request, res: Response) {
    try {
      const { idMonitor, ids } = req.body;
      const response = await Organization.getInstance().addMonitorToGroup(
        idMonitor,
        ids
      );
      return res.json(response);
    } catch (err) { }
  }

  public async removeMemberFromStructure(req: Request, res: Response) {
    try {
      const { idMember, idGroup } = req.body;
      const response = await Organization.getInstance().removeMemberFromStructure(
        idMember,
        idGroup
      );
      return res.json(response);
    } catch (err) { }
  }

  public async removeBossFromStructure(req: Request, res: Response) {
    try {
      const { idMember, idBranch, idGroup } = req.body;
      const response = await Organization.getInstance().removeBossFromStructure(
        idMember,
        idBranch,
        idGroup
      );
      return res.json(response);
    } catch (err) { }
  }

  public async removeMonitorFromGroup(req: Request, res: Response) {
    try {
      const { idMember, idBranch, idGroup } = req.body;
      const response = await Organization.getInstance().removeMonitorFromGroup(
        idMember,
        idBranch,
        idGroup
      );
      return res.json(response);
    } catch (err) { }
  }

  //CATALOGO
  public async addDefaultBranch(req: Request, res: Response) {
    try {
      const { idOrganization, name } = req.body;
      const response = await Organization.getInstance().addDefaultBranch(
        idOrganization,
        name
      );
      return res.json(response);
    } catch (err) { }
  }

  public async updateDefaultBranch(req: Request, res: Response) {
    try {
      const { oldName, name } = req.body;
      const response = await Organization.getInstance().updateDefaultBranch(
        oldName,
        name
      );
      return res.json(response);
    } catch (err) { }
  }

  public async removeDefaultBranch(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const response = await Organization.getInstance().deleteDefaultBranch(
        name
      );
      return res.json(response);
    } catch (err) { }
  }

  //Organización
  public async updateOrganization(req: Request, res: Response) {
    try {
      const { idOrganization, newData } = req.body;
      const response = await Organization.getInstance().updateOrganization(
        idOrganization,
        newData
      );
      return res.json(response);
    } catch (err) { }
  }

  public async deleteOrganization(req: Request, res: Response) {
    try {
      const { idOrganization } = req.body;
      const response = await Organization.getInstance().deleteOrganization(idOrganization);
      return res.json(response);
    } catch (err) { }
  }
}
