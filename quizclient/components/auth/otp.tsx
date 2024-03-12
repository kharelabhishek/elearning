"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { otpSchema } from "@/types/auth";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useVerifyEmail } from "@/services/auth/mutations";
import { useSearchParams } from "next/navigation";


export function InputOTPForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('tk')
  const verifyEmailMutation = useVerifyEmail();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  })

  
  function onSubmit(data: z.infer<typeof otpSchema>) {
    const payload = {
      token: token !== null ? token : "",
      code: data.pin,
    }
    verifyEmailMutation.mutate(payload)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Enter your OTP code you get in email.</FormLabel> */}
              <FormControl>
                <InputOTP
                 className="flex justify-center"
                  maxLength={4}
                  render={({ slots }:any) => (
                    <InputOTPGroup>
                      {slots.map((slot:any, index:any) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}{" "}
                    </InputOTPGroup>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please enter the OTP sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
