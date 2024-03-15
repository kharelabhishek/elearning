// import { config } from "./../../lib/header";
import axios from "@/lib/axios";
import { toast } from "sonner";

export const getUser = async () => {
  try {
    const response = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/allusers`,
    );
    return response;
  } catch (error: any) {
    toast(`${error.response.data.resultMessage.en}`);
    throw new Error(`Error during POST request: ${error.message}`);
  }
};
