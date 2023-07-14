import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { __jwt_secret } from "../config/credentials";
// import UserRepository from "../repositories/user-repository";

export interface CustomRequest extends Request {
  user: string | JwtPayload | undefined;
}
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw Error();
    }

    const token = authHeader.split(" ")[1];

    const secretKey = __jwt_secret ?? "";

    const decoded: any = jwt.verify(token, secretKey);
    (req as CustomRequest).user = decoded;

    // const userRepository = new UserRepository();
    // const isUserExist = userRepository.findById(decoded.id);
    // if (!isUserExist) {
    //   throw Error();
    // }

    next();
  } catch (e) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export { isAuth };
