import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  async authenticate(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const data = await authenticateUser.execute({
      username,
      password,
    });

    return res.json(classToClass(data));
  }
}
