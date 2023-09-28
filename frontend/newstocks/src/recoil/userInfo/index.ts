import { atom } from "recoil";
import { FavoriteStock } from "@/types/stock";

type UserType = {
  id: number, 
  name: string,
  profileImage: string  
}

export const userInfoState= atom<UserType | null>({
  key: 'userInfo',
  default: null,
});