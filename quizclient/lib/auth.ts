import { signOut } from 'next-auth/react';

export const handleSessionExpired = async (error:any) => {
  if (error.response && error.response.status === 401) {
    // Session expired, perform logout
    await signOut({ redirect: true });

    // You can add additional logic here, such as:
    // - Redirecting the user to the login page
    // - Displaying an error message
    // - Clearing local data or state
  }
};