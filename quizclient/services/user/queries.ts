import {  useQuery } from "@tanstack/react-query";
import { getUser, getUserInfo } from "./api";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

export function useGetUsers() {
    return useQuery({
    queryKey: ['users'],
      queryFn: () => getUser(),
    });
  }

export function useGetUserInfo(id:string) {
    return useQuery({
    queryKey: ['userinfo'],
      queryFn: () => getUserInfo(id),
      enabled: !!id 
    });
  }