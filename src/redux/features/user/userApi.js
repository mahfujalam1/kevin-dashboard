import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    usersGrowth: builder.query({
      query: (year) => ({
        url: `/users/growth?year=${year}`,
        method: "GET",
      }),
    }),

    getAllUsers: builder.query({
      query: ({ role, limit }) => ({
        url: `/users?limit=${limit}&role=${role}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

export const { useUsersGrowthQuery, useGetAllUsersQuery } = userApi;
