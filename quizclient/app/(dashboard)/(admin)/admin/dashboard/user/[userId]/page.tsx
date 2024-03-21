'use client';
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/user-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useGetUsers, useGetUserInfo} from "@/services/user/queries";
import { useParams } from "next/navigation";

export default function Page() {
  const _userId = useParams<{ userId: string;}>()
  const {data: userInfo} = useGetUserInfo(_userId.userId);

  const userDetails = userInfo?.data?.users;
  const breadcrumbItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm
          gender={[
            { _id: "1", name: "Male" },
            { _id: "2", name: "Female" },
          ]}
          initialData={userDetails}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
