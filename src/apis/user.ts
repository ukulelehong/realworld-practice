import { Values } from "async-validator";
import { instance } from "./request";

export function registration(user: Values) {
  return instance.post("/user", {
    user,
  });
}
