import { Request, Response } from "express";
import { IncomingMessage } from "http";
import { registerImage, saveImages } from "../routes/helpers";
import { GeneralController } from "./generalController";

export class FacadeAsesor {

    public async signUp(req: Request, res: Response) {
        try {
            const image = await registerImage(req, res);
            const ceo = JSON.parse(req.body.ceo);
            const organization = JSON.parse(req.body.organization);
            // Se introduce el nombre de la imagen nueva en organization.logoName
            organization.logoName = image;
            const message = await GeneralController.getInstance().signUp(ceo, organization);
            // return res.json(message);
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
            const response = await GeneralController.getInstance().changeGroup(
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

    public async createMember(req: Request, res: Response) {
        const { name, phone, email, direction, monitor } = req.body;
        try {
            const message = await GeneralController.getInstance().createMember(
                name,
                phone,
                email,
                direction,
                monitor
            );
            return res.json(message);
        } catch (err) {
            console.log(err);
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
            const message = await GeneralController.getInstance().updateMember(id, newData);
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
            const message = await GeneralController.getInstance().deleteMember(id);
            return res.json(message);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public async getMonitors(_: Request, res: Response) {
        try {
            const response = await GeneralController.getInstance().getMonitors();
            return res.json(response);
        } catch (err) {
            return res.status(500).send({
                success: false,
                response: err.toString(),
                data: null,
            });
        }
    }

    public async createStructure(req: Request, res: Response) {
        console.log(req.body);
        const { name, idParent, groupNumber } = req.body;
        try {
            const message = await GeneralController.getInstance().createStructure(
                name,
                idParent,
                groupNumber
            );
            return res.json(message);
        } catch (err) {
            console.error(err);
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
            const message = await GeneralController.getInstance().updateStructure(
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
            const message = await GeneralController.getInstance().deleteStructure(id);
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
            const response = await GeneralController.getInstance().getStructures();
            return res.json(response);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public async getLevelByParent(req: Request, res: Response) {
        const idParent = req.body.parent;
        try {
            const response = await GeneralController.getInstance().getLevelByParent(idParent);
            return res.json(response);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public async addMemberToGroup(req: Request, res: Response) {
        try {
            const { idMember, ids } = req.body;
            const response = await GeneralController.getInstance().addMemberToGroup(
                idMember,
                ids
            );
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async addBossToGroup(req: Request, res: Response) {
        const { idBoss, ids } = req.body;
        try {
            const response = await GeneralController.getInstance().addBossToGroup(
                idBoss,
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

    public async removeMemberFromStructure(req: Request, res: Response) {
        const { idMember, idGroup } = req.body;
        try {
            const response = await GeneralController.getInstance().removeMemberFromStructure(
                idMember,
                idGroup
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

    public async removeBossFromStructure(req: Request, res: Response) {
        const { idMember, idBranch, idGroup } = req.body;
        try {
            const response = await GeneralController.getInstance().removeBossFromStructure(
                idMember,
                idBranch,
                idGroup
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

    public async getDefaultBranches(req: Request, res: Response) {
        try {
            const response = await GeneralController.getInstance().getDefaultBranches();
            return res.json(response);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public async addDefaultBranch(req: Request, res: Response) {
        const { idOrganization, name } = req.body;
        try {
            const response = await GeneralController.getInstance().addDefaultBranch(
                idOrganization,
                name
            );
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async updateDefaultBranch(req: Request, res: Response) {
        const { oldName, name } = req.body;
        try {
            const response = await GeneralController.getInstance().updateDefaultBranch(
                oldName,
                name
            );
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async removeDefaultBranch(req: Request, res: Response) {
        const { name } = req.body;
        try {
            const response = await GeneralController.getInstance().removeDefaultBranch(
                name
            );
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async addMonitorToGroup(req: Request, res: Response) {
        const { idMonitor, ids } = req.body;
        try {
            const response = await GeneralController.getInstance().addMonitorToGroup(
                idMonitor,
                ids
            );
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async removeMonitorFromGroup(req: Request, res: Response) {
        const { idMember, idBranch, idGroup } = req.body;
        try {
            const response = await GeneralController.getInstance().removeMonitorFromGroup(
                idMember,
                idBranch,
                idGroup
            );
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async updateOrganization(req: Request, res: Response) {
        const { idOrganization, newData } = req.body;
        try {
            const response = await GeneralController.getInstance().updateOrganization(idOrganization, newData);
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }

    public async deleteOrganization(req: Request, res: Response) {
        const { idOrganization } = req.body;
        try {
            const response = await GeneralController.getInstance().deleteOrganization(idOrganization);
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    }
}

// +changeGroup() / esta -
// +createMember() / esta -
// +updateMember() / esta -
// +deleteMember() / esta -
// +getMonitors() / esta -
// +createStructure() / esta -
// +updateStructure() / esta -
// +deleteStructure() / esta -
// +getStructures() / esta -
// +getLevelByParent() / esta -
// EMMA
// +addMemberToGroup() / esta -
// +addBossToGroup() / esta -
// +removeMemberFromStructure() / esta -
// +removeBossFromStructure() / esta -
// +addDefaultBranch() / esta -
// +updateDefaultBranch() / esta
// +removeDefaultBranch() / esta
// +getDefaultBranches() / esta -
// +addMonitorToGroup() / esta -
// +removeMonitorFromGroup() / esta -
// +updateOrganization() / esta -
// +deleteOrganization() / esta -
// ...
// + ... CCG, NEWS
