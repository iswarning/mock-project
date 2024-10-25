import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS, registerables } from "chart.js";
import "./style.scss";

// Đăng ký các thành phần biểu đồ
ChartJS.register(...registerables);

function RoleUser() {
  const { listTask } = useSelector((state) => state.taskStore);
  const { userInfo } = useSelector((state) => state.authStore);
  const { projects } = useSelector((state) => state.projectStore);
  const currentDate = new Date();
  const sevenDaysLater = new Date().setDate(currentDate.getDate() + 7);

  // Lọc các task theo thời gian và email người dùng
  const filteredTasks =
    listTask?.filter(
      (task) =>
        task.user_mail === userInfo.email &&
        task.status !== 4 &&
        new Date(task.time_end) >= currentDate &&
        new Date(task.time_end) <= sevenDaysLater
    ) || [];

  // Nhóm các task theo ngày
  const taskByDate = filteredTasks.reduce((acc, task) => {
    const date = new Date(task.time_end).toDateString();
    acc[date] = acc[date] ? [...acc[date], task] : [task];
    return acc;
  }, {});

  const sortedDates = Object.keys(taskByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const dataCounts = sortedDates.map((date) => taskByDate[date].length);

  // Lọc và lấy danh sách dự án từ các task
  const projectIds = filteredTasks.map((task) => task.project_id);
  const filteredProjects = projects.filter((project) =>
    projectIds.includes(project.id)
  );

  // Hàm để ánh xạ priority thành màu và chuỗi tương ứng
  const getColorByPriority = (priority) =>
    ({
      1: "rgba(220, 53, 69, 0.7)",
      2: "rgba(255, 193, 7, 0.7)",
      3: "rgba(75, 192, 192, 0.7)",
    }[priority] || "rgba(75, 192, 192, 0.6)");

  const getPriorityLabel = (priority) =>
    ({
      1: "High",
      2: "Medium",
      3: "Low",
    }[priority] || "Unknown");

  // Tạo datasets cho biểu đồ theo từng priority
  const datasets = Array.from(new Set(filteredProjects.map((p) => p.priority)))
    .sort()
    .map((priority) => ({
      label: getPriorityLabel(priority),
      data: sortedDates.map((date) =>
        taskByDate[date].some((task) => {
          const project = filteredProjects.find(
            (proj) => proj.id === task.project_id
          );
          return project?.priority === priority;
        })
          ? taskByDate[date].length
          : 0
      ),
      backgroundColor: getColorByPriority(priority),
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5,
      barPercentage: 0.8,
    }));

  const chartData = { labels: sortedDates, datasets };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length) {
        setSelectedTasks(taskByDate[sortedDates[elements[0].index]]);
      }
    },
    onHover: (event, elements) => {
      event.native.target.style.cursor = elements.length
        ? "pointer"
        : "default";
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: (context) => (context.chart.width > 1024 ? 16 : 14),
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
      x: {
        offset: true,
        maxBarThickness: 80,
        minBarLength: 10,
      },
    },
  };

  const [selectedTasks, setSelectedTasks] = useState(
    taskByDate[sortedDates[0]] || []
  );

  return (
    <div className="containerTaskUser">
      <Bar data={chartData} options={chartOptions} />
      {/* Hiển thị các nhiệm vụ được chọn nếu cần */}
    </div>
  );
}

export default RoleUser;
