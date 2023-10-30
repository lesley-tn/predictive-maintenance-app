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

    <div class="flex">
      <!-- search bar -->
      <div class="q-pa-md flex-grow">
        
        <q-input
          outlined
          dense
          placeholder="Search"
          class="q-mb-md"
          v-model="search"
        />
        <q-badge rounded color="orange" label="Client: LESLEY    X" />
      </div>

      <!-- toggle button for client and buildings -->
      <div class="q-pa-md">
        <q-btn-toggle
          v-model="toggle"
          spread
          class="clients-buildings-toggle"
          no-caps
          rounded
          unelevated
          toggle-color="red"
          text-color="black"
          :options="[
            { label: 'Clients', value: 'one' },
            { label: 'Buildings', value: 'two' }
          ]"
        />
      </div>
      <div class="q-pa-md">
        <dataInputButton @refresh-event="refreshPage()"/>
      </div>

      
    </div>
    
    <!-- display client or building names in q-card section in a 2x5 grid -->
    <div class="q-pa-md" v-if="toggle === 'one'">
      <div class="grid grid-cols-5 gap-4">
        
      
        <ClientCardItem 
        v-for="client in clientsToShow" 

        v-bind:key="client.Clients_id"
        :item="client"
        @exit_card="receivedEmitFromCard"
         />
      
      </div>
    </div>

    <div class="q-pa-md" v-if="toggle === 'two'">
      <div class="grid grid-cols-5 gap-4">
        
        <BuildingCardItem 
        v-for="building in buildingsToShow" 
        v-bind:key="building.Buildings_id"
        :item="building"
         />
      
      </div>
    </div>
   

  </div>
</template>
 


<script>
import { ref, onMounted, watch  } from 'vue';
import { supabase } from '../assets/supabase';
import OverviewCard from 'src/components/OverviewCard.vue';
import dataInputButton from '../components/DataInput.vue';
import ClientCardItem from 'src/components/ClientCardItem.vue';
import BuildingCardItem from 'src/components/BuildingCardItem.vue';

export default {

    name: 'HomePage',

    methods:{
      refreshPage(){
          // location.reload();
          // console.log('REFRESGIN')
        },

  
      closeBuildingInfoDialog() {
        this.BuildingInfoDialog = false;
      },

      
      receivedEmitFromCard(client){

        this.closeInfoDialog();
        this.toggle = "two";
        this.search = `client ${client.Clients_id.toString()}`;
        return 0
      },
      
    },


    setup() {
        const totalClients = ref(0);
        const totalBuildings = ref(0);
        const totalProjects = ref(0);


        const clients = ref([]);
        const buildings = ref([]);

        const clientsToShow = ref ([]);
        const buildingsToShow = ref ([]);

        const infoDialog = ref(false);
        const selectedInfo = ref(null);
        const search = ref('');
        const toggle = ref('one'); // 'one' for Clients, 'two' for Buildings
        const clientsBuildings = ref([])
        const BuildingInfoDialog = ref(false);
        
        watch(search, (newSearch) => {  
          clientsToShow.value = clients.value.filter((client) => {

          if (newSearch.toLowerCase().split(" ").length > 1 && newSearch.toLowerCase().split(" ")[1] != null) {
            if (newSearch.toLowerCase().includes('building') ) {
          // Specific case when "building" is included in the search
    
              return (
                client.Clients_id.toString().toLowerCase().includes(get_clients_id_from_building_id(parseInt(newSearch.toLowerCase().split(" ")[1]).toString())) 
              );
            } else if (newSearch.toLowerCase().includes('client')){
              return (
                client.Clients_id.toString().toLowerCase().includes(newSearch.toLowerCase().split(" ")[1]) 
              );
            }

          } else {

            return (
              client.Clients_name.toLowerCase().includes(newSearch.toLowerCase()) ||
              client.Clients_id.toString().toLowerCase().includes(newSearch.toLowerCase()) 
            );
        
            }
    // Normal filtering for Clients_id and Clients_name
  });
});

//building search filter

watch(search, (newSearch) => {
  buildingsToShow.value = buildings.value.filter((building) => {
    const search_term = newSearch.toLowerCase();
    

    if (search_term.startsWith('building')) {
      const buildingId = parseInt(search_term.substring(8)); // Extract the ID after 'building'
      return building.Buildings_id === buildingId;
    } else if (search_term.startsWith('client')) {
      const clientId = parseInt(search_term.substring(6)); // Extract the ID after 'client'
      return building.Clients_id === clientId;
    } else {
      // Fallback: search by building name or client ID
      return (
        building.Building_name.toLowerCase().includes(search_term) ||
        building.Clients_id.toString() === search_term
      );
    }
  });
});


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
                clients.value = clientsData;
                clientsToShow.value = clientsData;
                
            }
            if (!buildingsError) {
                totalBuildings.value = buildingsData.length;
                buildings.value = buildingsData;
                buildingsToShow.value = buildingsData;
            }
            if (!projectsError)
                totalProjects.value = projects.length;

        };

        function get_clients_id_from_building_id(b_id) {
   
          for (const building of buildings.value) {
           
            
            if (building.Buildings_id == b_id) {
                
              
            return building.Clients_id;
    }
  }
  return null; // Return null if no match is found
}

        const showInfoDialog = (info) => {
            selectedInfo.value = info;
            infoDialog.value = true;
        };
        const closeInfoDialog = () => {
            infoDialog.value = false;
        };
       

   
    
        
        onMounted(() => {
            fetchData();
            
           

        });
        return {
            totalClients,
            totalBuildings,
            totalProjects,
            
            clients,
            buildings,
            showInfoDialog,
            closeInfoDialog,
            infoDialog,
            selectedInfo,
            search,
            toggle,
            dataInputButton,

            clientsBuildings,
            BuildingInfoDialog,
            clientsToShow, 
            get_clients_id_from_building_id,

            buildingsToShow,
            

        };
    },
    components: { 
      OverviewCard,
      dataInputButton,
      ClientCardItem,
      BuildingCardItem,
     }
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
