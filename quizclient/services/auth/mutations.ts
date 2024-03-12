import { useMutation } from "@tanstack/react-query";
import { register, sendVerficationCode, verifyEmail } from "./api";
import { useRouter } from "next/navigation";
import { registerFormSchema, verifyEmailSchema } from "@/types/auth";
import * as z   from "zod";
import { toast } from "sonner";


export function useSendVerificationCode() {
  const router = useRouter();
  return useMutation({
    mutationFn: (email: string) => sendVerficationCode(email),
    onSuccess(data, variables, context) {
      router.push(`/signup?tk=${data.data.confirmToken}`);      
    },
  });
}

export function useRegister() {
  type UserFormValue = z.infer<typeof registerFormSchema>;
  const sendVerficationCode = useSendVerificationCode()
  return useMutation({
    mutationFn: (payload: UserFormValue) => register(payload),
    onSuccess(data) {
      sendVerficationCode.mutate(data.data.user.email)  
    },
  });
}

export function useVerifyEmail() {
  const router = useRouter();
  type VerifyEmail = z.infer<typeof verifyEmailSchema>;
  return useMutation({
    mutationFn: (payload: VerifyEmail) => verifyEmail(payload),
    onSuccess(data) {
      toast("Email is verified successfully.")
      router.push(`/signin`);      
    },
  });
}

