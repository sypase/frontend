// "use client"; // Add this line at the top of the file
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Line } from "react-chartjs-2";
// import { serverURL } from "@/utils/utils";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement
// );

// interface AnalyticsData {
//   todaysCreditUsage: number;
//   monthlyCreditUsage: number;
//   totalCreditsAdded: number;
//   totalCreditsUsed: number;
//   topUsers: {
//     name: string;
//     totalCreditsUsed: number;
//   }[];
//   creditHistory?: {
//     date: string;
//     creditsAdded: number;
//     creditsUsed: number;
//   }[];
// }

// const AnalyticsPage = () => {
//   const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Retrieve the token from localStorage or wherever you're storing it

//         const response = await axios.get(`${serverURL}/admin/analytics`, {
//           headers: {
//             Authorization: `Bearer &#39;${localStorage.getItem("token")}&#39;`,
//           },
//         });

//         setAnalytics(response.data);
//       } catch (error) {
//         console.error("Error fetching credit analytics:", error);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   const topUsersData = {
//     labels: analytics?.topUsers.map((user) => user.name) || [],
//     datasets: [
//       {
//         label: "Credits Used",
//         data: analytics?.topUsers.map((user) => user.totalCreditsUsed) || [],
//         backgroundColor: "rgba(255,99,132,0.6)",
//       },
//     ],
//   };

//   const creditHistoryData = {
//     labels: analytics?.creditHistory?.map((entry) => entry.date) || [],
//     datasets: [
//       {
//         label: "Credits Added",
//         data: analytics?.creditHistory?.map((entry) => entry.creditsAdded) || [],
//         fill: false,
//         borderColor: "rgba(75,192,192,1)",
//       },
//       {
//         label: "Credits Used",
//         data: analytics?.creditHistory?.map((entry) => entry.creditsUsed) || [],
//         fill: false,
//         borderColor: "rgba(255,99,132,1)",
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>Credit Analytics</h1>
//       {analytics ? (
//         <div>
//           <p>Today's Credit Usage: {analytics.todaysCreditUsage}</p>
//           <p>Monthly Credit Usage: {analytics.monthlyCreditUsage}</p>
//           <p>Total Credits Added: {analytics.totalCreditsAdded}</p>
//           <p>Total Credits Used: {analytics.totalCreditsUsed}</p>
//           <h2>Top Credit Users</h2>
//           {analytics.topUsers.length > 0 ? (
//             <Bar data={topUsersData} />
//           ) : (
//             <p>No top users found.</p>
//           )}
//           <h2>Credit History</h2>
//           {analytics.creditHistory?.length ? (
//             <Line data={creditHistoryData} />
//           ) : (
//             <p>No credit history found.</p>
//           )}
//         </div>
//       ) : (
//         <p>Loading analytics...</p>
//       )}
//     </div>
//   );
// };

// export default AnalyticsPage;


"use client"; // Add this line at the top of the file
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { serverURL } from "@/utils/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

interface AnalyticsData {
  todaysCreditUsage: number;
  monthlyCreditUsage: number;
  totalCreditsAdded: number;
  totalCreditsUsed: number;
  topUsers: { name: string; totalCreditsUsed: number }[];
  creditHistory?: { date: string; creditsAdded: number; creditsUsed: number }[];
}

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${serverURL}/admin/analytics`, {
          headers: {
            Authorization: `Bearer &#39;${localStorage.getItem("token")}&#39;`,
          },
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching credit analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  const topUsersData = {
    labels: analytics?.topUsers.map((user) => user.name) || [],
    datasets: [
      {
        label: "Credits Used",
        data: analytics?.topUsers.map((user) => user.totalCreditsUsed) || [],
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

  const creditHistoryData = {
    labels: analytics?.creditHistory?.map((entry) => entry.date) || [],
    datasets: [
      {
        label: "Credits Added",
        data: analytics?.creditHistory?.map((entry) => entry.creditsAdded) || [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Credits Used",
        data: analytics?.creditHistory?.map((entry) => entry.creditsUsed) || [],
        fill: false,
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  return (
    <div>
      <h1>Credit Analytics</h1>
      {analytics ? (
        <div>
          <p>Today&#39;s Credit Usage: {analytics.todaysCreditUsage}</p>
          <p>Monthly Credit Usage: {analytics.monthlyCreditUsage}</p>
          <p>Total Credits Added: {analytics.totalCreditsAdded}</p>
          <p>Total Credits Used: {analytics.totalCreditsUsed}</p>
          <h2>Top Credit Users</h2>
          {analytics.topUsers.length > 0 ? (
            <Bar data={topUsersData} />
          ) : (
            <p>No top users found.</p>
          )}
          <h2>Credit History</h2>
          {analytics.creditHistory?.length ? (
            <Line data={creditHistoryData} />
          ) : (
            <p>No credit history found.</p>
          )}
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default AnalyticsPage;