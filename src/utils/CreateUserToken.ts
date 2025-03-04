import Jwt from "jsonwebtoken";
import { jwtPayloadType } from "./Types";
export const CreateJwtToken = (user: jwtPayloadType) => {
  const userPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
  };
  const token = Jwt.sign(userPayload, process.env.jwt_token as string, {
    expiresIn: "7d",
  });
  return token;
};
