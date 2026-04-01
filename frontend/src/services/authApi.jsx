import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";


export const authApi = createApi({
    reducerPath: "authApi",

    baseQuery:axiosBaseQuery() ,
    endpoints: (builder) => ({

        // LOGIN
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
               data: data

            })
        }),

        // SIGNUP
        signup: builder.mutation({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                data: data

            })
        })
    })
});

export const { useLoginMutation, useSignupMutation } = authApi;