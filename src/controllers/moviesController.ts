import { Request, Response, NextFunction } from 'express';

function getHello(req: Request, res: Response, next: NextFunction) {
  res.send('Help, I am trapped three folders deep in a server');
}

export default { getHello};