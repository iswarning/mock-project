// BarChart.js
import { Chart, registerables } from "chart.js";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

Chart.register(...registerables);

const monthsCharacter = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ProjectsChart = () => {
  const { projects } = useSelector((state) => state.projectStore);

  const filterProjects = useMemo(() => {
    let labels = [];
    const currentDate = new Date(Date.now()).getDate();

    const monthOfTimeStart = projects.map((project) =>
      new Date(project.time_start).getMonth()
    );
    const monthOfTimeEnd = projects.map((project) =>
      new Date(project.time_end).getMonth()
    );

    const minMonth = Math.min(...monthOfTimeStart);
    const maxMonth = Math.max(...monthOfTimeEnd);

    let project = {
      inprogress: [],
      completedNextSevenDay: [],
      priority: [],
    };

    for (let i = minMonth; i <= maxMonth; i++) {
      labels.push(monthsCharacter[i]);

      const totalTasksOfMonth = projects.filter(
        (project) => new Date(project.time_end).getMonth() == i
      );

      project.inprogress.push(
        totalTasksOfMonth.filter(
          (project) => currentDate >= new Date(project.time_start).getDate()
        ).length
      );

      project.completedNextSevenDay.push(
        totalTasksOfMonth.filter((project) => {
          const differenceInMillis = new Date(project.time_end) - new Date();
          const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
          return differenceInDays <= 7;
        }).length
      );

      project.priority.push(
        totalTasksOfMonth.filter((project) => project.priority === 1).length
      );
    }
    return {
      ...project,
      labels,
    };
  }, [projects]);

  const data = {
    labels: filterProjects.labels,
    datasets: [
      {
        label: "In Progress",
        data: filterProjects.inprogress,
        fill: false,
        borderColor: "rgba(0, 0, 255, 0.5)",
        tension: 0.4,
      },
      {
        label: "Completed in next seven days",
        data: filterProjects.completedNextSevenDay,
        fill: false,
        borderColor: "rgba(255, 255, 0, 0.5)",
        tension: 0.4,
      },
      {
        label: "Priority",
        data: filterProjects.priority,
        fill: false,
        borderColor: "rgba(255, 0, 0, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={options} />;
    </div>
  );
};

export default ProjectsChart;
