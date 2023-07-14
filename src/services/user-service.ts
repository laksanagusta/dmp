import { Request } from "express";
import { User } from "../entities/User";
import { ResponseError } from "../error/response-error";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation";
import { validate } from "../validation/validation";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user-repository";
import { __jwt_secret } from "../config/credentials";

const WRONG_PASSWORD_OR_USERNAME_MESSAGE = "Username or password wrong";
const USERNAME_ALREADY_EXIST_MESSAGE = "Username already exist";

const userRepository = new UserRepository();
const isUserExist = async (username: string) => {
  return await userRepository.findByUsername(username);
};

const register = async (request: Request): Promise<User> => {
  const user = validate(registerUserValidation, request.body);

  const checkUserExist = await isUserExist(user.username);
  if (checkUserExist) {
    throw new ResponseError(400, USERNAME_ALREADY_EXIST_MESSAGE);
  }

  user.password = await argon2.hash(user.password);

  return await userRepository.save(user);
};

const login = async (request: Request): Promise<any> => {
  const loginRequest = validate(loginUserValidation, request.body);

  const user = await userRepository.findByUsername(loginRequest.username);

  if (!user) {
    throw new ResponseError(400, WRONG_PASSWORD_OR_USERNAME_MESSAGE);
  }

  const passwordMatch = await argon2.verify(
    user.password,
    loginRequest.password
  );

  if (!passwordMatch) {
    throw new ResponseError(401, WRONG_PASSWORD_OR_USERNAME_MESSAGE);
  }

  user.token_jwt = jwt.sign(
    { id: user.id, username: user.username },
    __jwt_secret ?? ""
  );

  return await userRepository.save(user);
};

export default { register, login };
