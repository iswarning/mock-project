// BarChart.js
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const monthsCharacter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const TaskChart = () => {
  const { listTask } = useSelector((state) => state.taskStore);

  const filteredTasks = useMemo(() => {
    console.time()
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const minMonth = Math.min(...listTask.map(task => new Date(task.time_start).getMonth()));
    const maxMonth = Math.max(...listTask.map(task => new Date(task.time_end).getMonth()));

    const tasksSummary = {
      overdue: Array(maxMonth - minMonth + 1).fill(0),
      pending: Array(maxMonth - minMonth + 1).fill(0),
      inProgress: Array(maxMonth - minMonth + 1).fill(0),
      completedNextThreeDays: Array(maxMonth - minMonth + 1).fill(0),
      labels: monthsCharacter.slice(minMonth, maxMonth + 1)
    };

    listTask.forEach(task => {
      const startMonth = new Date(task.time_start).getMonth();
      const endMonth = new Date(task.time_end).getMonth();

      for (let i = startMonth; i <= endMonth; i++) {
        const taskEndDate = new Date(task.time_end).getDate();
        if (i === endMonth) {
          if (currentDay > taskEndDate) {
            tasksSummary.overdue[i - minMonth]++;
          }
          if (task.status === 1) {
            tasksSummary.pending[i - minMonth]++;
          } else if (task.status === 2) {
            tasksSummary.inProgress[i - minMonth]++;
          } else if (task.status === 3 && taskEndDate - currentDay === 3) {
            tasksSummary.completedNextThreeDays[i - minMonth]++;
          }
        }
      }
    });
    console.timeEnd()

    return tasksSummary;
  }, [listTask]);

  const data = {
    labels: filteredTasks.labels,
    datasets: [
      {
        label: 'Overdue',
        data: filteredTasks.overdue,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
      {
        label: 'Pending',
        data: filteredTasks.pending,
        fill: false,
        borderColor: 'pink',
        tension: 0.4,
      },
      {
        label: 'In Progress',
        data: filteredTasks.inProgress,
        fill: false,
        borderColor: 'green',
        tension: 0.4,
      },
      {
        label: 'Completed in Next Three Days',
        data: filteredTasks.completedNextThreeDays,
        fill: false,
        borderColor: 'purple',
        tension: 0.4,
      },
    ],
  };

  const options = {
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

  return <Line data={data} options={options} />;
};

export default TaskChart;
