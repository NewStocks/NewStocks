import { atom } from "recoil";
import { UserType } from "@/types/user";

export const userInfoState= atom<UserType | null>({
  key: 'userInfo',
  default: {
    id: 0, 
    name: "",
    profileImage: "" 
  },
});