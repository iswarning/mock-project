import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function UserDashboard(props) {
  const { listTask } = useSelector((state) => state.taskStore);
  const { listUser } = useSelector((state) => state.userStore);
  console.log("listUser", listUser);

  // Tìm những user chưa có task
  const usersWithoutTask = listUser.filter(
    (user) => !listTask.some((task) => task.user_mail === user.email)
  );

  // Lọc những user có task cần hoàn thành trong 7 ngày tới
  const usersWithUpcomingTasks = listUser.filter((user) =>
    listTask.some((task) => {
      const timeEnd = new Date(task.time_end);
      const currentDate = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(currentDate.getDate() + 7);

      return (
        task.user_mail === user.email &&
        task.status !== 4 &&
        timeEnd >= currentDate &&
        timeEnd <= sevenDaysLater
      );
    })
  );

  const chartData = {
    labels: ["Users without Task", "Users with Upcoming Tasks"],
    datasets: [
      {
        label: "User Tasks",
        data: [usersWithoutTask.length, usersWithUpcomingTasks.length],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <>
      <h2>Task Distribution for Users</h2>
      <PolarArea data={chartData} options={chartOptions} />
    </>
  );
}

export default UserDashboard;
