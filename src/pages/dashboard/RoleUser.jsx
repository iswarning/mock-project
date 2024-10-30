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

  // Hàm formatDate để định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredTasks =
    listTask?.filter((task) => {
      const timeEnd = new Date(task.time_end);
      const currentDate = new Date();
      const sevenDaysLater = new Date(
        currentDate.setDate(currentDate.getDate() + 7)
      );
      return (
        task.user_mail === userInfo.email &&
        task.status !== 4 &&
        timeEnd <= sevenDaysLater
      );
    }) || [];

  const taskByDate = filteredTasks.reduce((acc, task) => {
    const date = new Date(task.time_end).toDateString();
    acc[date] = acc[date] ? [...acc[date], task] : [task];
    return acc;
  }, {});

  const sortedDates = Object.keys(taskByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const [selectedTasks, setSelectedTasks] = useState(
    taskByDate[sortedDates[0]] || []
  );

  const projectIds = filteredTasks.map((task) => task.project_id);
  const filteredProjects = projects.filter((project) =>
    projectIds.includes(project.id)
  );

  const getColorByPriority = (priority) =>
    [
      "rgba(75, 192, 192, 0.6)",
      "rgba(220, 53, 69, 0.7)",
      "rgba(255, 193, 7, 0.7)",
    ][priority - 1];

  const datasets = [
    {
      label: "Tasks",
      data: sortedDates.map((date) => taskByDate[date].length),
      backgroundColor: sortedDates.map((date) => {
        const priorities = taskByDate[date].map(
          (task) =>
            filteredProjects.find((proj) => proj.id === task.project_id)
              ?.priority || 0
        );
        return getColorByPriority(Math.max(...priorities));
      }),
    },
  ];

  const chartData = { labels: sortedDates, datasets };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedDate = sortedDates[index];
        setSelectedTasks(taskByDate[selectedDate]);
      }
    },
    // Thêm tùy chọn onHover để thay đổi con trỏ
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
            size: function (context) {
              const screenWidth = context.chart.width;
              return screenWidth > 1024 ? 16 : screenWidth > 768 ? 14 : 12;
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: function (context) {
              const screenWidth = context.chart.width;
              return screenWidth > 768 ? 14 : 12;
            },
          },
        },
      },
      x: {
        offset: true, // Giúp các cột nằm giữa
        barThickness: function (context) {
          const screenWidth = context.chart.width;
          return screenWidth > 768 ? 50 : 30; // Kích thước cột lớn hơn cho màn hình lớn
        },
        maxBarThickness: 80, // Giới hạn chiều rộng tối đa của cột
        minBarLength: 10, // Đảm bảo cột luôn có độ dài tối thiểu
        ticks: {
          font: {
            size: function (context) {
              const screenWidth = context.chart.width;
              return screenWidth > 768 ? 14 : 12;
            },
          },
        },
      },
    },
  };

  return (
    <div className="containerTaskUser">
      <div className="row mb-4">
        <div className="col-md-7">
          <div className="card p-3">
            <h5 className="mb-3 ">Task Chart for the Next 7 Days</h5>
            <div style={{ height: "45vh" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card p-3">
            <h5 className="mb-3">Task Information</h5>
            <div className="py-2">
              {selectedTasks.length === 0 ? (
                <p>No tasks available</p>
              ) : (
                selectedTasks.map((task) => (
                  <div key={task.id} className="py-4 px-3 mb-3  border rounded">
                    <h6 className="pb-1">
                      <strong>{task.task_name}</strong>
                    </h6>
                    <p>
                      <strong>Project:</strong> {task.project_name}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {formatDate(task.time_end)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleUser;
