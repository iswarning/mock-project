import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";

// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(...registerables);

function UserChart(props) {
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

  const data = {
    labels: ["Users Without Task", "Users With Upcoming Tasks"],
    datasets: [
      {
        label: "Number of Users",
        data: [usersWithoutTask.length, usersWithUpcomingTasks.length],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default UserChart;
