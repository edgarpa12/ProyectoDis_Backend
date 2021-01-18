import { Request, Response } from "express";
import { GeneralController } from "./generalController";
import { saveImages } from "../routes/helpers";
import { memberS } from "../Models/Schemas";

export class FacadeMiembros {

  public async getMembers(_: Request, res: Response) {
    try {
      const members = await GeneralController.getInstance().getMembers();
      return res.json(members);
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }

  public async getMember(req: Request, res: Response) {
    const idUser = req.body.id;
    try {
      const response = await GeneralController.getInstance().getMember(idUser);
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public async getStructureBosses(req: Request, res: Response) {
    try {
      const ids = req.body.ids;
      const response = await GeneralController.getInstance().getStructureBosses(ids);
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }

  public async getStructureMembers(req: Request, res: Response) {
    try {
      const ids = req.body.ids;
      const response = await GeneralController.getInstance().getStructureMembers(ids);
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }

  public async getStructuresXMember(req: Request, res: Response) {
    try {
      const { idUser } = req.body;
      const response = await GeneralController.getInstance().getStructuresXMember(
        idUser
      );
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }

  public async sendCCG(req: Request, res: Response) {
    try {
      const { from, body, type } = req.body;
      const response = await GeneralController.getInstance().sendCCG(from, body, type);
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }

  public async sendNews(req: Request, res: Response) {
    try {
      const images = await saveImages(req, res);
      const from = JSON.parse(req.body.from);
      const to = JSON.parse(req.body.to);
      const body = JSON.parse(req.body.body);
      await GeneralController.getInstance().sendNews(from, to, body, images);
      return res.json("La llama que llama");
      // const { from, to, body, images } = req.body;
      // const response = await GeneralController.getInstance().sendNews(from, to, body, images);
      // return res.json(response);
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }

  public async seenNews(req: Request, res: Response) {
    try {
      const { idMember, seenNews } = req.body;
      await GeneralController.getInstance().seenNews(idMember, seenNews);
      return res.json("La llama que llama");
    } catch (err) {
      return res.status(500).send({
        success: false,
        members: err.toString(),
        data: null,
      });
    }
  }
}
