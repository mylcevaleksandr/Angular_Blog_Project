import {UserResponseType} from "./user-response.type";

export type CommentType =
  {
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    user: UserResponseType,
   action?:string
  }
