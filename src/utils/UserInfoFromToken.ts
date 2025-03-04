import Jwt from "jsonwebtoken";
import { jwtPayloadType } from "./Types";

export const userInfoFromToken = (token: string): jwtPayloadType | null => {
  if (!token) {
    return null;
  }
  const data = Jwt.verify(
    token,
    process.env.jwt_token as string
  ) as jwtPayloadType;
  return data;
};
