import { apiClient } from "../../../services/api-client";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export const authService = {
  async login(payload: LoginPayload) {
    const response = await apiClient<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem("access-token", response.accessToken);
    localStorage.setItem("auth-user", JSON.stringify(response.user));
    return response;
  },
  logout() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("auth-user");
  },
  forgotPassword(email: string) {
    return apiClient<{ accepted: true }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};
