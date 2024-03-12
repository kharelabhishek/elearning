'use client';

import { InputOTPForm } from "@/components/auth/otp";
import RegisterUserAuthForm from "@/components/forms/register-user-auth-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams()

    const token = searchParams.get('tk')


    function Render() {
        if (token) {
            return <>
                <div className="flex flex-col space-y-2 text-center">

                    <h1>OTP Code</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your OTP code .
                    </p>
                    <InputOTPForm />
                </div>
            </>
        } else {
            return <>
                <div className="flex flex-col space-y-2 text-center">

                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>
                <RegisterUserAuthForm />
            </>
        }
    }
    return (
        <Render />
    );
}














