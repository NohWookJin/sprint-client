import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const themeState = atom<boolean>({
  key: "themeState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
