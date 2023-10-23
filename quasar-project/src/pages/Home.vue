<template>
  <div>
    <h3 class ="q-pl-lg">Overview</h3>
    <div class="q-pa-md overview-row">
      <div class="row">
      <div class="col">
        <div>Total Clients: {{ totalClients }}</div>
      </div>
      <div class="col">
        <div>Total Buildings: {{ totalBuildings }}</div>
      </div>
      <div class="col">
        <div>Total Projects: {{ totalProjects }}</div>
      </div>
    </div>
    </div>

  </div>

  
</template>

<style lang="sass">
.overview-row 
  .row > div
    padding: 15px 15px 
    margin-right: 20px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
  .row + .row
    margin-top: 1rem
</style>

<script>
import {ref, onMounted } from 'vue';
import {supabase } from '../assets/supabase'
export default {
  name: 'HomePage',
  setup() {
    const totalClients = ref(0);
    const totalBuildings = ref(0);
    const totalProjects = ref(0);

    const fetchData = async () => {
   
      const { data: clients, error: clientsError } = await supabase
        .from('Clients')
        .select('Clients_id');

      const { data: buildings, error: buildingsError } = await supabase
        .from('Buildings')
        .select('Buildings_id');

      const { data: projects, error: projectsError } = await supabase
        .from('MaintenanceProjects')
        .select('Project_id');

      if (!clientsError) totalClients.value = clients.length;
      if (!buildingsError) totalBuildings.value = buildings.length;
      if (!projectsError) totalProjects.value = projects.length;
    };

    onMounted(() => {
      fetchData();
    });

    return {
      totalClients,
      totalBuildings,
      totalProjects,
    };
  },
};
</script>
