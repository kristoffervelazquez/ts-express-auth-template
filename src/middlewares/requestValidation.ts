import { NextFunction, Request, Response } from "express";
import Joi from "joi";

function validateRequest(schema: Joi.AnySchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value, warning } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  };
}

export default validateRequest;
