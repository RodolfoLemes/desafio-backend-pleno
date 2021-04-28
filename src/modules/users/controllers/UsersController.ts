import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateManagerService from '../services/CreateManagerService';
import CreateSignerService from '../services/CreateSignerService';

export default class UsersController {
  async createSigner(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createSigner = container.resolve(CreateSignerService);
    const signer = await createSigner.execute({
      username,
      password,
    });

    return res.status(204).json(classToClass(signer));
  }

  async createManager(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createManager = container.resolve(CreateManagerService);
    const manager = await createManager.execute({
      username,
      password,
    });

    return res.status(204).json(classToClass(manager));
  }
}
