import { instance } from "./request";

export function getProfile(username:string) {
  return instance.get(`/profiles/${username}`);
}


