<template>
  <div>
    <h1>Financial Reports</h1>
    <!-- chart -->
    <div class="h-screen w-full">
      <Doughnut :data="data" :options="options" />
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const fetchData = async () => {
  console.log('fetch data. not implemented yet.');
};

export default {
  name: 'FinancialReportsPage',
  components: {
    Doughnut,
  },
  data() {
    return {};
  },
};
</script>
