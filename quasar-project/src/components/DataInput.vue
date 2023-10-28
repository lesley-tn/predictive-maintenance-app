<template>
  <div>
    <button
      @click="showDataInputDialog"
      class="flex gap-2 items-center rounded-xl border-2 border-lnf-navy h-full px-4 py-2"
    >
      <img src="/icons/ic-plus.svg" alt="plus icon" class="h-5 w-5" />
      <p class="font-medium">Input data</p>
    </button>
    <q-dialog v-model="dialogVisible">
      <q-card class="flex">
        <h4>Input Data</h4>
        <q-tabs v-model="selectedTab">
          <q-tab name="clients" label="Clients" />
          <q-tab name="buildings" label="Buildings" />
        </q-tabs>
        <q-tab-panels v-model="selectedTab">
          <q-tab-panel name="clients">
            <div>
              <!-- Clients Data Input Form -->
              <q-input label="Clients Name" v-model="clientsData.name" />
              <q-input label="Phone Number" v-model="clientsData.phone" />
              <q-input label="Street Name" v-model="clientsData.streetName" />
              <q-input label="House Number" v-model="clientsData.houseNumber" />
              <q-input label="City" v-model="clientsData.city" />
              <q-input label="Zip Code" v-model="clientsData.zipCode" />
            </div>
          </q-tab-panel>
          <q-tab-panel name="buildings">
            <div>
              <!-- Buildings Data Input Form -->
              <q-select
                label="Clients ID"
                v-model="buildingsData.clientId"
                :options="clientOptions"
              />
              <q-input label="Building Name" v-model="buildingsData.name" />
              <q-input label="Street" v-model="buildingsData.street" />
              <q-input
                label="Street Number"
                v-model="buildingsData.streetNumber"
              />
              <q-input label="Zip Code" v-model="buildingsData.zipCode" />
              <q-input label="City" v-model="buildingsData.city" />
              <q-input
                label="Description"
                v-model="buildingsData.description"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" @click="closeDataInputDialog" />
          <q-btn
            label="Save"
            color="primary"
            @click="saveData"
            v-on:click="$emit('refresh-event')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../assets/supabase';

export default {
  setup() {
    const dialogVisible = ref(false);
    const selectedTab = ref('clients');
    const clientsData = ref({
      name: '',
      phone: '',
      streetName: '',
      houseNumber: '',
      city: '',
      zipCode: '',
    });
    const buildingsData = ref({
      clientId: '',
      name: '',
      street: '',
      streetNumber: '',
      city: '',
      zipCode: '',
      description: '',
    });
    const clientOptions = ref([]);

    const fetchClientOptions = async () => {
      const { data, error } = await supabase.from('Clients').select('*');
      if (!error) {
        clientOptions.value = data.map((client) => ({
          label: client.Clients_name,
          value: parseInt(client.Clients_id.toString()),
        }));
      }
    };

    onMounted(() => {
      fetchClientOptions();
    });

    const saveData = () => {
      if (selectedTab.value === 'clients') {
        // Prepare the data to be inserted
        const dataToInsert = {
          Clients_name: clientsData.value.name,
          Phone_number: clientsData.value.phone,
          Address_StreetName: clientsData.value.streetName,
          Address_HouseNumber: clientsData.value.houseNumber,
          Address_City: clientsData.value.city,
          Address_Zipcode: clientsData.value.zipCode,
        };

        // Insert data into the 'Clients' table
        supabase
          .from('Clients')
          .upsert([dataToInsert])
          .then((response) => {
            if (response.error) {
              console.error('Error inserting data:', response.error);
            } else {
              console.log('Data inserted successfully:', response.data);
              closeDataInputDialog();
            }
          });
      } else {
        console.log('asdasdasdasd');
        // Prepare the data to be inserted
        const dataToInsert = {
          Clients_id: buildingsData.value.clientId.value,
          Building_name: buildingsData.value.name,
          Building_city: buildingsData.value.city,
          Building_street: buildingsData.value.street,
          Building_streetNumber: buildingsData.value.streetNumber,
          Building_zipCode: buildingsData.value.zipCode,
          Building_description: buildingsData.value.description,
        };
        console.log(buildingsData.value.clientId);
        // Insert data into the 'Buildings' table

        supabase
          .from('Buildings')
          .upsert([dataToInsert])
          .then((response) => {
            if (response.error) {
              console.error('Error inserting data:', response.error);
            } else {
              console.log('Data inserted successfully:', response.data);
              closeDataInputDialog();
            }
          });
      }
    };

    const showDataInputDialog = () => {
      dialogVisible.value = true;
    };

    const closeDataInputDialog = () => {
      dialogVisible.value = false;
      clientsData.value = {
        name: '',
        phone: '',
        streetName: '',
        houseNumber: '',
        city: '',
        zipCode: '',
      };
      buildingsData.value = {
        clientId: '',
        name: '',
        street: '',
        streetNumber: '',
        city: '',
        zipCode: '',
        description: '',
      };
    };

    const emitRefreshPage = () => {
      // this.$emit('refresh-event');
    };

    return {
      dialogVisible,
      selectedTab,
      clientsData,
      buildingsData,
      clientOptions,
      saveData,
      showDataInputDialog,
      closeDataInputDialog,
      emitRefreshPage,
    };
  },
};
</script>
