import { Metadata } from "next";
import Auth from "@/components/auth/auth";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <Auth />
    </>
  );
}
