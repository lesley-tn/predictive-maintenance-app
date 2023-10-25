<template>
  <div class="px-6 py-8">
    <h3 class="q-pl-lg">Overview</h3>
    <!-- overview -->
    <div class="q-pa-md overview-row">
      <div class="grid grid-cols-3 gap-4">
        <overview-card
          :number="totalClients"
          text="total clients"
          icon="/icons/ic-person.svg"
        />
        <overview-card
          :number="totalBuildings"
          text="total buildings"
          icon="/icons/ic-building.svg"
        />
        <overview-card
          :number="totalProjects"
          text="total projects"
          icon="/icons/ic-kanban.svg"
        />
      </div>
    </div>

    <!-- search bar -->
    <div class="q-pa-md">
      <q-input
        outlined
        dense
        placeholder="Search"
        class="q-mb-md"
        v-model="search"
      />
    </div>

 <!-- toggle button for client and buildings -->
    <div class="q-pa-md">
      <q-btn-toggle
        v-model="secondModel"
        spread
        class="clients-buildings-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="red"
        
        text-color="black"
        :options="[
          {label: 'Clients', value: 'one'},
          {label: 'Buildings', value: 'two'}
        ]"
      />
    </div>



      <!-- display client or building names in q-card section in a 2x5 grid -->
      <div class="q-pa-md">
      
      <div class="grid grid-cols-5 gap-4">
        <!-- loop to generate all infos, filter by search -->
        <button
          class="border border-lnf-navy rounded-xl px-5 py-4 hover:bg-lnf-navy/5 duration-100 text-left"
          v-for="(info, index) in secondModel === 'one' ? clients.filter((client) => client.Clients_name.toLowerCase().includes(search.toLowerCase())) : buildings.filter((building) => building.Building_name.toLowerCase().includes(search.toLowerCase()))"
          :key="index"
          @click="showInfoDialog(info)"
        >
          <p v-if="info">
            {{ secondModel === 'one' ? info.Clients_name : info.Building_name }}
          </p>
          <div v-else>
            <!-- Empty card -->
          </div>
        </button>
      </div>
    </div>

    <!-- Dialog to show client or building information -->
    <q-dialog v-model="infoDialog">
      <q-card>
        <q-card-section>
          <h4>
            {{ secondModel === 'one' ? selectedInfo.Clients_name : selectedInfo.Building_name }}
          </h4>
          <p v-if="selectedInfo">
            {{ secondModel === 'one' ? 'Client ID' : 'Building ID' }}: {{ secondModel === 'one' ? selectedInfo.Clients_id : selectedInfo.Buildings_id }}
          </p>
          <p v-if="selectedInfo">Phone Number: {{ selectedInfo.Phone_number }}</p>
          <p v-if="selectedInfo">
            {{ secondModel === 'one' ? 'Address' : 'Building Address' }}: {{ formatAddress(selectedInfo) }}
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" color="primary" @click="closeInfoDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
 


<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../assets/supabase';
import OverviewCard from 'src/components/OverviewCard.vue';

export default {
    name: 'HomePage',
    setup() {
        const totalClients = ref(0);
        const totalBuildings = ref(0);
        const totalProjects = ref(0);
        const Clients_name = ref([]);
        const clients = ref([]);
        const buildings = ref([]);
        const infoDialog = ref(false);
        const selectedInfo = ref(null);
        const search = ref('');
        const secondModel = ref('one'); // 'one' for Clients, 'two' for Buildings
        const fetchData = async () => {
            const { data: clientsData, error: clientsError } = await supabase
                .from('Clients')
                .select('*');
            const { data: buildingsData, error: buildingsError } = await supabase
                .from('Buildings')
                .select('*');
            const { data: projects, error: projectsError } = await supabase
                .from('MaintenanceProjects')
                .select('Project_id');
            if (!clientsError) {
                totalClients.value = clientsData.length;
                Clients_name.value = clientsData.map((client) => client.Clients_name);
                clients.value = clientsData;
            }
            if (!buildingsError) {
                totalBuildings.value = buildingsData.length;
                buildings.value = buildingsData;
            }
            if (!projectsError)
                totalProjects.value = projects.length;
        };
        const showInfoDialog = (info) => {
            selectedInfo.value = info;
            infoDialog.value = true;
        };
        const closeInfoDialog = () => {
            infoDialog.value = false;
        };
        const formatAddress = (building) => {
            return `${building.Building_street} ${building.Building_streetNumber}, ${building.Building_zipCode}, ${building.Building_city}`;
        };
        onMounted(() => {
            fetchData();
        });
        return {
            totalClients,
            totalBuildings,
            totalProjects,
            Clients_name,
            clients,
            buildings,
            showInfoDialog,
            closeInfoDialog,
            infoDialog,
            selectedInfo,
            search,
            secondModel,
            formatAddress,
        };
    },
    components: { OverviewCard }
};
</script>

<style lang="sass">
.overview-row
  .row > div
    padding: 15px 15px
    margin-right: 20px
    background: rgba(#999, .15)
    border: 1px solid rgba(#999, .2)
  .row + .row
    margin-top: 1rem

  .clients-buildings-toggle
    border: 1px solid black
</style>
