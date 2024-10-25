// BarChart.js
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
import { useSelector } from 'react-redux';

Chart.register(...registerables)

const monthsCharacter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TaskChart = () => {
  
  const { listTask } = useSelector((state) => state.taskStore)

  const filteredTasks = useMemo(() => {
    let labels = []
    const currentDate = new Date(Date.now()).getDate()

    const monthOfTimeStart = listTask.map((task) => new Date(task.time_start).getMonth())
    const monthOfTimeEnd = listTask.map((task) => new Date(task.time_end).getMonth())

    const minMonth = Math.min(...monthOfTimeStart)
    const maxMonth = Math.max(...monthOfTimeEnd)

    let tasks = {
      overdue: [],
      pending: [],
      inprogress: [],
      completedNextThreeDay: []
    }

    for (let i = minMonth; i <= maxMonth; i++) {
      labels.push(monthsCharacter[i])

      const totalTasksOfMonth = listTask
      .filter((task) => new Date(task.time_end).getMonth() === i)

      tasks.overdue.push(totalTasksOfMonth
        .filter((task) => currentDate > (new Date(task.time_end).getDate()))
        .length
      )

      tasks.pending.push(totalTasksOfMonth
       .filter((task) => task.status === 1)
       .length
      )

      tasks.inprogress.push(totalTasksOfMonth
       .filter((task) => task.status === 2)
       .length
      )

      tasks.completedNextThreeDay.push(totalTasksOfMonth
        .filter((task) => task.status === 3 && (new Date(task.time_end).getDate()) - currentDate === 3)
       .length
      )
    }
    return {
      ...tasks,
      labels
    }
  },[listTask])

  const data = {
    labels: filteredTasks.labels,
    datasets: [
      {
        label: 'Overdue',
        data: filteredTasks.overdue,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4, // This enables cubic interpolation
      },
      {
        label: 'Pending',
        data: filteredTasks.pending,
        fill: false,
        borderColor: 'pink',
        tension: 0.4, // This enables cubic interpolation
      },
      {
        label: 'In Progress',
        data: filteredTasks.inprogress,
        fill: false,
        borderColor: 'green',
        tension: 0.4, // This enables cubic interpolation
      },
      {
        label: 'Completed in next three days',
        data: filteredTasks.completedNextThreeDay,
        fill: false,
        borderColor: 'purple',
        tension: 0.4, // This enables cubic interpolation
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
        tension: 0.4, // This also ensures cubic interpolation
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default TaskChart;
