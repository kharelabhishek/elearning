"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from 'react-query';
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";
import { registerFormSchema } from "@/schemas";
import { postRegister } from "@/utils/authClient";
import { deviceId, platform, timezone } from "@/lib/browser-detail";


type UserFormValue = z.infer<typeof registerFormSchema>;

interface RegisterUserAuthFormProps {
  toggleToLogin: () => void;
}

const RegisterUserAuthForm: React.FC<RegisterUserAuthFormProps> = ({ toggleToLogin }) => {
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "demo@gmail.com",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });



  const mutation = useMutation(
       (payload:UserFormValue) => postRegister(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('yourQueryKey');
      },
    }
  );
  const onSubmit = (data: UserFormValue) => {
    
    const payload= {  email: data.email, password: data.password,name: data.name, platform, timezone, deviceId };
    mutation.mutate(payload)
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
          Already have an account? <p onClick={toggleToLogin} className="inline-block underline cursor-pointer">Log in</p> 
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}

export default RegisterUserAuthForm;
