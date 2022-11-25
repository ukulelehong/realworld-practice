import { instance } from "./request";

export interface User {
  username: string;
  email: string;
  password: string;
}

export function registration(user: User) {
  return instance.post("/users", {
    user,
  });
}
