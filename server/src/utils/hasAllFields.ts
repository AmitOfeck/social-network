import { Request, Response } from 'express';

/**
 * @param req 
 * @param res 
 * @param fields 
 * @returns 
 */
const hasAllFields = (req: Request, res: Response, fields: string[]): boolean => {
  for (let field of fields) {
    if (!req.body[field]) {
      res.status(400).json({ message: `${field} is required` });
      return false;
    }
  }
  return true;
};

export default hasAllFields;
