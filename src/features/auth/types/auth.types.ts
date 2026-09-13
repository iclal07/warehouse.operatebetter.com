export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { accessToken: string; user: AuthUser };
