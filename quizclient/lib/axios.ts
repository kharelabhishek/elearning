import axios from 'axios';
import { getSession } from 'next-auth/react';
import { handleSessionExpired } from '../lib/auth';


const RateLimiterRes = {
  msBeforeNext: 250, // Number of milliseconds before next action can be done
  remainingPoints: 0, // Number of remaining points in current duration 
  consumedPoints: 5, // Number of consumed points in current duration 
  isFirstInDuration: false, // action is first in current duration 
}

const opts = {
  points: 6, // 6 points
  duration: 1, // Per second
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL, // Set your base API URL here
  timeout: 30000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
    "Retry-After": (RateLimiterRes.msBeforeNext / 1000).toString(),
    "X-RateLimit-Limit": opts.points.toString(),
    "X-RateLimit-Remaining": RateLimiterRes.remainingPoints.toString(),
    "X-RateLimit-Reset": new Date(Date.now() + RateLimiterRes.msBeforeNext).toUTCString()
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session && session.user.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await handleSessionExpired(error);
      // You can add logic here to redirect the user to the login page
      // or handle the unauthorized request in a different way

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;