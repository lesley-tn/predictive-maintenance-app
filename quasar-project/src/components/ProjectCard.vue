<template>
  <div class="flex justify-between">
    <q-card-section>
      <h2>{{ project.Project_id }}</h2>
      <p>{{ project.Clients_id }}</p>
    </q-card-section>
    <div class="h-24 aspect-square">
      <Doughnut :data="data" :options="options" />
    </div>
  </div>
</template>

<script type="module">
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Legend);

export default {
  props: {
    project: Object,
  },
  components: {
    Doughnut,
  },
  data(props) {
    return {
      data: {
        labels: ['To do', 'In progress', 'Completed'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              props.project.todoTasks,
              props.project.inProgressTasks,
              props.project.completedTasks,
            ],
            backgroundColor: ['#EA0029', '#233977', '#10B116'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    };
  },
};
</script>
