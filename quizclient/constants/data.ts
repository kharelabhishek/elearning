import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  name: string;
  gender: string;
  type: string;
  isActivated: boolean;
};
export const users: User[] = [
  {
    name: "Candice Schiner",
    gender: "Dell",
    type: "Frontend Developer",
    isActivated: false,
  },
  {
    name: "John Doe",
    gender: "TechCorp",
    type: "Backend Developer",
    isActivated: true,
  },
  {
    name: "Alice Johnson",
    gender: "WebTech",
    type: "UI Designer",
    isActivated: true,
  },
  {
    name: "David Smith",
    gender: "Innovate Inc.",
    type: "Fullstack Developer",
    isActivated: false,
  },
  {
    name: "Emma Wilson",
    gender: "TechGuru",
    type: "Product Manager",
    isActivated: true,
  },
  {
    name: "James Brown",
    gender: "CodeGenius",
    type: "QA Engineer",
    isActivated: false,
  },
  {
    name: "Laura White",
    gender: "SoftWorks",
    type: "UX Designer",
    isActivated: true,
  },
  {
    name: "Michael Lee",
    gender: "DevCraft",
    type: "DevOps Engineer",
    isActivated: false,
  },
  {
    name: "Olivia Green",
    gender: "WebSolutions",
    type: "Frontend Developer",
    isActivated: true,
  },
  {
    name: "Robert Taylor",
    gender: "DataTech",
    type: "Data Analyst",
    isActivated: false,
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];
