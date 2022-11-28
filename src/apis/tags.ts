import { instance } from "./request";

export type TagRes = {
  tags: Tags;
};

export type Tags = string[];

export function getTags(){
  return instance.get<TagRes>("/tags");
}
