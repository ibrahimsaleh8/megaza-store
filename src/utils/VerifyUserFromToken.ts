import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { jwtPayloadType } from "./Types";

export const VerifyUserFromToken = (): jwtPayloadType | null => {
  const token = cookies().get("token")?.value as string;
  if (!token) {
    return null;
  }
  const data = Jwt.verify(
    token,
    process.env.jwt_token as string
  ) as jwtPayloadType;
  return data;
};
