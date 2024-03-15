import {  useQuery } from "@tanstack/react-query";
import { getUser } from "./api";

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