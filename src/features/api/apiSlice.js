import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.bluepiemeta.com:4000",
        credentials: "include",
        prepareHeaders: (headers, {getState, endpoint}) => {

            const token = getState()?.auth?.accessToken;
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({})
})