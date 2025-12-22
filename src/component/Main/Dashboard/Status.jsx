import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";

// src/components/Status.jsx
export default function Status() {

  const {data} = useGetDashboardStatusQuery()
  const statsData = data?.data
  console.log(data)

  const stats = [
    { label: "Total Player", value: statsData?.totalPlayers },
    { label: "Total Coach", value: statsData?.totalCaoches },
    { label: "Total Earning", value: statsData?.totalEarnings, currency: "USD" },
    { label: "Total Session", value: statsData?.totalSessions },
    { label: "Total Refund", value: statsData?.totalRefunds },
  ];

  const format = (s) =>
    s.currency
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: s.currency,
          minimumFractionDigits: 0,
        }).format(s.value)
      : new Intl.NumberFormat().format(s.value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border bg-gray-100 p-6 text-center shadow-sm py-10"
        >
          <div className="text-3xl text-gray-600 font-semibold tabular-nums">{format(s)}</div>
          <div className="mt-2 text-lg text-gray-600">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
