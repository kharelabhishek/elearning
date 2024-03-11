import { registerFormSchema } from '@/types/auth';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import * as z  from 'zod';


type UserFormValue = z.infer<typeof registerFormSchema>;

export const register = async (formData: UserFormValue): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.statusText === "OK"){
      toast("User Created Successfully.")
    }
    return response;
  } catch (error:any) {
    toast(`${error.response.data.resultMessage.en}`)
    throw new Error(`Error during POST request: ${error.message}`);
  }
};


export const sendVerficationCode = async (email: string) => {
  try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/send-verification-code`, {email}, {
      headers:{
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error during POST request: ${error.message}`);
  }
}