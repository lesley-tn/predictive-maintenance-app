<template>
  <div>
    <q-btn
      @click="showDataInputDialog"
      icon="add"
      label="Input data"
      flat
      class="button h-full"
    />
    <q-dialog v-model="DataInputDialog">
      <q-card
        class="p-8 min-w-[50%] rounded-xl"
        flat
        style="border-radius: 0.75rem"
      >
        <h4 class="mb-4">Input Data</h4>
        <q-tabs v-model="selectedTab">
          <q-tab name="clients" label="Clients" class="text-body" />
          <q-tab name="buildings" label="Buildings" class="text-body" />
        </q-tabs>
        <q-tab-panels v-model="selectedTab">
          <q-tab-panel name="clients" class="p-0">
            <div>
              <!-- Clients Data Input Form -->
              <q-input
                label="Clients Name"
                v-model="clientsData.name"
                :rules="[(val) => val.length > 0 || 'Cannot be empty']"
                hide-bottom-space
                class="text-body"
              />
              <q-input
                label="Phone Number"
                v-model="clientsData.phone"
                class="text-body"
              />
              <q-input
                label="Street Name"
                v-model="clientsData.streetName"
                class="text-body"
              />
              <q-input
                label="House Number"
                v-model="clientsData.houseNumber"
                class="text-body"
              />
              <q-input
                label="City"
                v-model="clientsData.city"
                class="text-body"
              />
              <q-input
                label="Zip Code"
                v-model="clientsData.zipCode"
                class="text-body"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="buildings" class="p-0">
            <div>
              <!-- Buildings Data Input Form -->
              <q-select
                label="Clients ID"
                v-model="buildingsData.clientId"
                :options="clientOptions"
                class="text-body"
              />
              <q-input
                label="Building Name"
                v-model="buildingsData.name"
                :rules="[(val) => val.length > 0 || 'Cannot be empty']"
                hide-bottom-space
                class="text-body"
              />
              <q-input
                label="Street"
                v-model="buildingsData.street"
                class="text-body"
              />
              <q-input
                label="Street Number"
                v-model="buildingsData.streetNumber"
                class="text-body"
              />
              <q-input
                label="Zip Code"
                v-model="buildingsData.zipCode"
                class="text-body"
              />
              <q-input
                label="City"
                v-model="buildingsData.city"
                class="text-body"
              />
              <q-input
                label="Description"
                v-model="buildingsData.description"
                class="text-body"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="right" class="mt-8 p-0 gap-4">
          <button
            label="Cancel"
            class="border-2 border-lnf-red rounded-xl !text-lnf-red px-6 py-3 uppercase font-medium text-body"
            flat
            @click="closeDataInputDialog"
          >
            Cancel
          </button>
          <button
            label="Save"
            class="border-2 border-lnf-red bg-lnf-red rounded-xl text-white px-6 py-3 uppercase font-medium text-body"
            @click="saveData"
            flat
            v-on:click="$emit('refresh-event')"
          >
            Save
          </button>
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
    const DataInputDialog = ref(false);
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
      DataInputDialog.value = true;
    };

    const closeDataInputDialog = () => {
      DataInputDialog.value = false;
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
      DataInputDialog,
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
