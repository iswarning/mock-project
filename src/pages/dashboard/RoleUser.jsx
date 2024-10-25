import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Paper, Typography, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.scss";

// Đăng ký các thành phần biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RoleUser() {
  const { listTask } = useSelector((state) => state.taskStore);
  const { userInfo } = useSelector((state) => state.authStore);
  const { projects } = useSelector((state) => state.projectStore);

  const filteredTasks = listTask.filter((task) => {
    const timeEnd = new Date(task.time_end);
    const currentDate = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(currentDate.getDate() + 7);

    return (
      task.user_mail === userInfo.email &&
      task.status !== 4 &&
      timeEnd >= currentDate &&
      timeEnd <= sevenDaysLater
    );
  });

  // Group tasks by date
  const taskByDate = filteredTasks.reduce((acc, task) => {
    const date = new Date(task.time_end).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});

  // Lấy danh sách dự án từ filteredTasks
  const projectIds = filteredTasks.map((task) => task.project_id);
  const filteredProjects = projects.filter((project) =>
    projectIds.includes(project.id)
  );

  // Tạo một hàm để ánh xạ màu sắc theo priority
  const getColorByPriority = (priority) => {
    switch (priority) {
      case 1:
        return "rgba(220, 53, 69, 0.7)";
      case 2:
        return "rgba(255, 193, 7, 0.7)";
      case 3:
        return "rgba(75, 192, 192, 0.7)";
      default:
        return "rgba(75, 192, 192, 0.6)"; // Màu mặc định
    }
  };

  // Hàm để ánh xạ priority thành chuỗi tương ứng
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Không xác định";
    }
  };

  // Sắp xếp các nhãn theo thứ tự ngày hết hạn
  const sortedDates = Object.keys(taskByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const dataCounts = sortedDates.map((date) => taskByDate[date].length);

  // Tạo màu cho mỗi cột dựa trên priority của các task tương ứng
  const backgroundColors = sortedDates.map((date) => {
    const tasksForDate = taskByDate[date];
    const priorities = tasksForDate.map((task) => {
      const project = filteredProjects.find(
        (proj) => proj.id === task.project_id
      );
      return project ? project.priority : 0; // Nếu không tìm thấy, trả về priority mặc định là 0
    });

    // Giả sử bạn chỉ cần màu sắc của task có priority cao nhất
    const maxPriority = Math.max(...priorities);
    return getColorByPriority(maxPriority);
  });

  // Tạo datasets cho biểu đồ, với màu cho chú thích
  const datasets = [];
  const uniquePriorities = Array.from(
    new Set(filteredProjects.map((proj) => proj.priority))
  ).sort((a, b) => a - b); // Sắp xếp theo mức độ tăng dần

  uniquePriorities.forEach((priority) => {
    const dataForPriority = backgroundColors.map((color, index) => {
      const taskForDate = taskByDate[sortedDates[index]];
      return taskForDate &&
        taskForDate.some((task) => {
          const project = filteredProjects.find(
            (proj) => proj.id === task.project_id
          );
          return project && project.priority === priority;
        })
        ? taskForDate.length
        : 0; // Đếm số task cho priority cụ thể
    });

    datasets.push({
      label: getPriorityLabel(priority), // Thay đổi label thành chuỗi
      data: dataForPriority,
      backgroundColor: getColorByPriority(priority),
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5,
      barPercentage: 0.8,
    });
  });

  const chartData = {
    labels: sortedDates,
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Đảm bảo biểu đồ không bị thay đổi tỷ lệ
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedDate = sortedDates[index];
        setSelectedTasks(taskByDate[selectedDate]);
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

  // Trạng thái để lưu trữ nhiệm vụ đã chọn
  const [selectedTasks, setSelectedTasks] = useState(
    taskByDate[sortedDates[0]] || []
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số cho ngày
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Đảm bảo có 2 chữ số cho tháng
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="containerTaskUser">
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} style={{ padding: "32px" }}>
            <Typography className="title">
              Task chart for the next 7 days
            </Typography>
            <div className="chart">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: "32px" }}>
            <Typography className="title">Task information</Typography>
            <Box>
              {selectedTasks.length === 0 ? (
                <Typography variant="body2">
                  There are no expiring tasks
                </Typography>
              ) : (
                selectedTasks.map((task) => (
                  <Box
                    key={task.id}
                    sx={{
                      padding: 2,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      margin: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      className="pb-1"
                    >
                      {task.task_name}
                    </Typography>
                    <Typography variant="body2" className="pb-1">
                      <strong>Project:</strong> {task.project_name}
                    </Typography>
                    <Typography variant="body2" className="pb-1">
                      <strong>Deadline:</strong> {formatDate(task.time_end)}
                    </Typography>
                    <Typography variant="body2" className="pb-1">
                      <strong>Project operating time:</strong>{" "}
                      {formatDate(task.project_start)} -{" "}
                      {formatDate(task.project_end)}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default RoleUser;
