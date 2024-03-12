import { config } from "./../../lib/header";
import {
  registerFormSchema,
  verifyEmailSchema,
  loginFormSchema,
} from "@/types/auth";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import * as z from "zod";

type UserFormValue = z.infer<typeof registerFormSchema>;
type VerifyEmail = z.infer<typeof verifyEmailSchema>;
type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const register = async (
  formData: UserFormValue,
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`,
      formData,
      {
        headers: config,
      },
    );
    return response;
  } catch (error: any) {
    toast(`${error.response.data.resultMessage.en}`);
    throw new Error(`Error during POST request: ${error.message}`);
  }
};

export const sendVerficationCode = async (
  email: string,
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/send-verification-code`,
      { email },
      {
        headers: {
          config,
        },
      },
    );
    return response;
  } catch (error: any) {
    throw new Error(`Error during POST request: ${error.message}`);
  }
};

export const verifyEmail = async (
  formData: VerifyEmail,
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/verify-email`,
      { ...formData },
      {
        headers: {
          config,
        },
      },
    );
    if (response.statusText === "OK") {
      toast("User Created Successfully.");
    }
    return response;
  } catch (error: any) {
    toast(`${error.response.data.resultMessage.en}`);
    throw new Error(`Error during POST request: ${error.message}`);
  }
};


export const login = async (
  formData: LoginFormSchema,
): Promise<AxiosResponse<any>> => {
  debugger;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
      { email: formData.email, password: formData.password},
      {
        headers: {
          config,
        },
      },
    );
    return response;
  } catch (error: any) {
    throw new Error(`Error during POST request: ${error.message}`);
  }
};
