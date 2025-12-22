import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
    getEarningGrowth: builder.query({
      query: (year) => ({
        url: `/payments/growth?year=${year}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatusQuery, useGetEarningGrowthQuery,  } = dashboardApi;
