<template>
  <div>
    <q-btn
      @click="AddNewProject = true"
      icon="add"
      label="New Project"
      flat
      class="button"
    />

    <q-dialog v-model="AddNewProject" >
      <q-card>
        <q-card-section>
          <div>
            <!-- Project Input Form -->
            <q-select
              label="Clients ID"
              v-model="ProjectData.clientId"
              :options="SelectedClientsId"
            />
            <q-select
              label="Buildings ID"
              v-model="ProjectData.buildingId"
              :options="get_SelectedBuildingsId(ProjectData.clientId)"
              multiple
              v-if="ProjectData.clientId"
            />
            <q-input
              label="Project Name"
              v-model="ProjectData.name"
              :rules="[(val) => val.length > 0 || 'Cannot be empty']"
              hide-bottom-space
            />
            <q-input v-model="ProjectData.description" label="Description" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Save" color="primary" @click="AddProject" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, toRaw } from 'vue';
import { supabase } from '../assets/supabase';

export default {
  name: 'AddNewProject',

  setup() {
    const AddNewProject = ref(false);
    const ProjectData = ref({
      name: '',
      description: '',
    });

    const SelectedClientsId = ref([]);
    const SelectedBuildingsId = ref([]);
    const buildings = ref ([])

    const fetchSelectedIds = async () => {
      const { data: buildings_obtained, error } = await supabase
        .from('Buildings')
        .select('Buildings_id, Clients_id');

      if (!error) {
        const clientIds = [
          ...new Set(buildings_obtained.map((building) => building.Clients_id)),
        ];
       
        SelectedClientsId.value = clientIds.map((clientId) => ({
          label: clientId,
          value: clientId,
        }));
          console.log(buildings)
        
          buildings.value = buildings_obtained

        // SelectedBuildingsId.value = buildingIds.map((buildingId) => ({
        //   label: buildingId,
        //   value: buildingId,
        // }));
          
      }
    };
    
    
    onMounted(() => {
      fetchSelectedIds();
    });

    return {
      AddNewProject,
      ProjectData,
      SelectedBuildingsId,
      SelectedClientsId,
      buildings,
    };
  },
  methods: {
    // Method only used to convert array to update database
    convertToArray(input) {
      let output_ids = [];

      for (let i = 0; i < input.length; i++) {
        output_ids.push(input[i].value);
      }
      return output_ids;
    },

    get_SelectedBuildingsId(client_id) {
      console.log("LOOKING FOR IDS FIR CLIENT")
      console.log(client_id)
  const filteredBuildingIds = this.buildings
    .filter(building => building.Clients_id === client_id.value)
    .map(building => ({
      label: building.Buildings_id,
      value: building.Buildings_id
    }));

  return filteredBuildingIds;
},


    async AddProject() {
      const { data, error } = await supabase
        .from('MaintenanceProjects')
        .upsert([
          {
            Project_name: this.ProjectData.name,
            Clients_id: this.ProjectData.clientId.value,
            Buildings_id: this.convertToArray(
              toRaw(this.ProjectData.buildingId)
            ),
            Project_description: this.ProjectData.description,
          },
        ])
        .select();

      this.AddNewProject = false;
      if (!error) {
        this.AddNewProject = false;
      }
    },
  },
};
</script>
