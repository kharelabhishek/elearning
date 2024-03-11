import { useMutation } from "@tanstack/react-query";
import { register, sendVerficationCode } from "./api";
import { useRouter } from "next/navigation";
import { registerFormSchema } from "@/types/auth";
import * as z   from "zod";


export function useSendVerificationCode() {
  const router = useRouter();
  return useMutation({
    mutationFn: (email: string) => sendVerficationCode(email),
    onSuccess(data, variables, context) {
      router.push("/signin");
    },
  });
}

export function useRegister() {
  const router = useRouter();
  type UserFormValue = z.infer<typeof registerFormSchema>;
  const sendVerficationCode = useSendVerificationCode()
  return useMutation({
    mutationFn: (payload: UserFormValue) => register(payload),
    onSuccess(data) {
      sendVerficationCode.mutate(data.data.user.email)
      router.push("/signin");
    },
  });
}

