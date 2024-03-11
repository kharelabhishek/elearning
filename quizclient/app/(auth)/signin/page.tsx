
import { Metadata } from "next";
import LoginUserAuthForm from "@/components/forms/login-user-auth-form";

export const metadata: Metadata = {
    title: "Sign up",
    description: "Authentication forms built using the components.",
};

export default function Page() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login In
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to create your account
                </p>
            </div>
            <LoginUserAuthForm />
        </>
    );
}