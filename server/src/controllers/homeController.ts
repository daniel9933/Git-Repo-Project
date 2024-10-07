import { Request, Response } from 'express';

export const tokenValid = (req: Request, res: Response) => {
    return res.status(200).send("ok")
}
