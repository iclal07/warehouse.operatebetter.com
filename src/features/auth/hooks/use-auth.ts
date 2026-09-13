import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import type { LoginPayload } from "../types/auth.types";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
}
