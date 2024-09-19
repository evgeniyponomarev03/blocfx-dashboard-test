import axios from "axios";
import { getSession } from "next-auth/react";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor to add access token
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTZjYWE2MS1mZTRlLTRjMDYtYmRhNC04Nzc2ZDJiZWVhNjQiLCJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSIsImlhdCI6MTcyNjczOTI3NSwiZXhwIjoxNzI3MzQ0MDc1fQ.OuzvZAKEmdZ9W8b83W5um7lUsarPWEVYQ_6RFRASdOE`;
  if (session?.accessToken) {
  }

  return config;
});

// Response interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const session = await getSession();
      const refreshedSession = await refreshAccessToken(
        (session as any)?.refreshToken
      );

      originalRequest.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTZjYWE2MS1mZTRlLTRjMDYtYmRhNC04Nzc2ZDJiZWVhNjQiLCJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSIsImlhdCI6MTcyNjczOTI3NSwiZXhwIjoxNzI3MzQ0MDc1fQ.OuzvZAKEmdZ9W8b83W5um7lUsarPWEVYQ_6RFRASdOE`;
      // if (refreshedSession) {
      //   return api(originalRequest); // Retry the original request with new token
      // }
    }

    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        refreshToken,
      }
    );

    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
};

export default api;
