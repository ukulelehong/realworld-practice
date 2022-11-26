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

export interface LoginUser {
  email: string;
  password: string;
}

export function authentication(user: LoginUser){
  return instance.post("/users/login", {
    user,
  });
}

//获取当前用户
export function getCurrentUser(){
  return instance.get("/user");
}
