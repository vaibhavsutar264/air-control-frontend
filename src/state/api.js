import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Particles",
    "Location",
    "Most_windy",
  ],
  endpoints: (build) => ({
    addUserSignUp: build.mutation({
      query: (payload) => ({
        url: 'users/signup',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    addUserSignIn: build.mutation({
      query: (payload) => ({
        url: 'users/signin',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    getDelhiParticles: build.query({
      query: () => "particles/delhi",
      providesTags: ["Particles"],
    }),
    getKeralaParticles: build.query({
      query: () => "particles/kerala",
      providesTags: ["Particles"],
    }),
    getMumbaiParticles: build.query({
      query: () => "particles/mumbai",
      providesTags: ["Particles"],
    }),
    getPm1Particles: build.query({
      query: () => "location/pm1",
      providesTags: ["Location"],
    }),
    getPm2_5Particles: build.query({
      query: () => "location/pm2_5",
      providesTags: ["Location"],
    }),
    getPm10Particles: build.query({
      query: () => "location/pm10",
      providesTags: ["Location"],
    }),
    getMostWindy: build.query({
      query: () => "most-windy/peak",
      providesTags: ["Most_windy"],
    }),
  }),
});

export const {
  useAddUserSignUpMutation,
  useAddUserSignInMutation,
  useGetDelhiParticlesQuery,
  useGetKeralaParticlesQuery,
  useGetMumbaiParticlesQuery,
  useGetPm1ParticlesQuery,
  useGetPm2_5ParticlesQuery,
  useGetPm10ParticlesQuery,
  useGetMostWindyQuery,
} = api;
