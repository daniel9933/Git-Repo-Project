import { Request, Response } from 'express';

export const tokenValid = (req: Request, res: Response) => {
    console.log("sending a response from here ----------------->")
    res.set('Cache-Control', 'no-store'); // Prevents any caching
    return res.status(200).send("ok")
}
