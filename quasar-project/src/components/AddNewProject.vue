<template>
  <div>
    <q-btn
      @click="AddNewProject = true"
      icon="add"
      label="New Project"
      rounded
      flat
      class="bg-lnf-navy/10 text-lnf-navy backdrop-blur text-body font-medium"
    />

    <q-dialog v-model="AddNewProject">
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
              :options="SelectedBuildingsId"
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

    const fetchSelectedIds = async () => {
      const { data: buildings, error } = await supabase
        .from('Buildings')
        .select('Buildings_id, Clients_id');

      if (!error) {
        const clientIds = [
          ...new Set(buildings.map((building) => building.Clients_id)),
        ];
        const buildingIds = [
          ...new Set(buildings.map((building) => building.Buildings_id)),
        ];

        SelectedClientsId.value = clientIds.map((clientId) => ({
          label: clientId,
          value: clientId,
        }));

        SelectedBuildingsId.value = buildingIds.map((buildingId) => ({
          label: buildingId,
          value: buildingId,
        }));
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
