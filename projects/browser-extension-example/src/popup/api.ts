import type { StorageData } from "../storage";
import { BASE_URL, ajax } from "../../api";

export type LoginParams = StorageData["loginFormData"];

export interface LoginResponse {
  accessToken: string;
  appKey: string;
  refreshToken: string;
  userCode: string;
}

export const login = async (params: LoginParams) => {
  try {
    const res = await ajax<LoginResponse>(`${BASE_URL}/login`, "POST", {
      ...params,
      appKey: "WEB",
    });

    if (res.success === false) {
      alert(res.message);
      throw new Error(res.message);
    }

    return res.data;
  } catch (error) {
    return undefined;
  }
};
