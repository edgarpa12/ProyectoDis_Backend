import { Request, Response } from "express";
import { GeneralController } from "./generalController";

export class FacadeJefe {

  // + getMembers()
  // + getMember()
  // + getStructureBosses()
  // + getStructureMembers()
  // + getStructureXMember()
  // son parte del FACADE de MIEMBROS

  public async getStructureGroups(req: Request, res: Response) {
    try {
      const ids = req.body.ids;
      const response = await GeneralController.getInstance().getStructureGroups(ids);
      return res.json(response);
    } catch (err) {
      console.error(err);
    }
  }
}

