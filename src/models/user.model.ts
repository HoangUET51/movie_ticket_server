import { Role } from "@/constants/common.const";

export interface UserParamsRequest {
  id?: number;
  fullName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string | null;
  role: Role;
}

export interface UserModel {
  user: UserResponse;
  accessToken: string;
}

export interface UserResponse {
  id: number;
  email: string;
  address: string;
  phone: string;
  role: Role;
  avatar: string | null;
  name: string;
}
