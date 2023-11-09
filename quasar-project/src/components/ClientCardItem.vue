<template>
  <!-- loop to generate all infos, filter by search -->
  <div>
    <button
      class="bg-lnf-navy/5 rounded-xl px-5 py-4 text-left w-full"
      @click="infoDialog = true"
    >
      <p>
        {{ item.Clients_name }}
      </p>
    </button>

    <q-dialog v-model="infoDialog" @hide="editing = false" flat>
      <q-card flat class="dialog-card" style="border-radius: 0.75rem">
        <q-card-section>
          <q-card-actions class="absolute right-0 top-0">
            <q-btn icon="close" flat @click="infoDialog = false" />
          </q-card-actions>
          <template v-if="!editing">
            <div class="row items-end gap-2 mb-4">
              <h4>
                {{ editedItem.Clients_name }}
              </h4>
              <div class="flex mb-1 opacity-40 items-end">
                <img src="/icons/ic-id.svg" class="mr-1 h-5 w-5" />
                <p class="text-lg leading-none">ID: {{ item.Clients_id }}</p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex">
                <img src="/icons/ic-phone.svg" class="mr-1 h-4 w-4" />
                <p>{{ item.Phone_number }}</p>
              </div>
              <div class="flex">
                <img src="/icons/ic-map.svg" class="mr-1 h-4 w-4" />
                <p>{{ fullAddress }}</p>
              </div>
            </div>
            <div class="flex flex-nowrap gap-4 mt-8">
              <button
                v-if="!editing"
                @click="startEditing"
                class="button-red-outline flex items-center justify-center w-1/2 h-12"
              >
                <img src="/icons/ic-edit.svg" class="mr-2 h-5 w-5" />
                <p>Edit Details</p>
              </button>
              <!-- Buildings button in client information-->
              <q-card-actions class="w-1/2 p-0">
                <button
                  @click="go_to_client_buildings()"
                  class="flex items-center justify-center button-red w-full h-12"
                >
                  <img
                    src="/icons/ic-building-white.svg"
                    class="mr-2 h-5 w-5"
                  />
                  <p>Go to Buildings</p>
                </button>
              </q-card-actions>
            </div>
          </template>

          <template v-else>
            <q-input
              v-model="editedItem.Clients_name"
              label="Client Name"
              :rules="[(val) => val.length > 0 || 'Cannot be empty']"
              hide-bottom-space
            />

            <q-input v-model="editedItem.Phone_number" label="Phone number" />
            <q-input
              v-model="editedItem.Address_StreetName"
              label="Street Name"
            />
            <q-input
              v-model="editedItem.Address_HouseNumber"
              label="House Number"
            />
            <q-input v-model="editedItem.Address_Zipcode" label="Zipcode" />
            <q-input v-model="editedItem.Address_City" label="City" />

            <q-card-actions align="right">
              <q-btn label="Save" color="primary" @click="update_client()" />
              <q-btn label="Exit" color="primary" @click="editing = false" />
              <q-btn label="Delete" color="red" @click="deleteClientData()" />
            </q-card-actions>
          </template>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../assets/supabase';

export default {
  name: 'ClientCardItem',
  props: ['item'],

  methods: {
    go_to_client_buildings() {
      this.$emit('exit_card', this.props.item);
      console.log('REFRESGIN');
    },

    startEditing() {
      // Start editing by copying the original item

      this.editing = true;
    },

    async update_client() {
      let client_id = this.props.item.Clients_id;

      const { data, error } = await supabase
        .from('Clients')
        .update({
          Clients_name: this.editedItem.Clients_name,
          Phone_number: this.editedItem.Phone_number,
          Address_HouseNumber: this.editedItem.Address_HouseNumber,
          Address_StreetName: this.editedItem.Address_StreetName,
          Address_Zipcode: this.editedItem.Address_Zipcode,
          Address_City: this.editedItem.Address_City,
        })
        .eq('Clients_id', client_id)
        .select();

      this.refreshPage();
      this.editing = false;
    },

    async deleteClientData() {
      let client_id = this.props.item.Clients_id;

      const { error } = await supabase
        .from('Clients')
        .delete()
        .eq('Clients_id', client_id);

      this.editing = false;
      this.infoDialog = false;
    },
    refreshPage() {
      // location.reload();
    },
  },

  setup(props) {
    const fullAddress =
      props.item.Address_StreetName +
      ' ' +
      props.item.Address_HouseNumber +
      ', ' +
      props.item.Address_Zipcode +
      ', ' +
      props.item.Address_City;
    const infoDialog = ref(false);
    const editing = ref(false);
    const editedItem = ref([]);

    editedItem.value = { ...props.item };

    return {
      props,
      infoDialog,
      fullAddress,

      editing,
      editedItem,
    };
  },
};
</script>

<!--
    ?
    // IF CLIENTS SELECTED
    clients.filter((client) => client.Clients_name.toLowerCase().includes(search.toLowerCase()))

    // .filter((buiilding) => buildingsData.Clients_id.includes(s))

    :
    // IF BUILDINGS SELECTED
    buildings.filter((building) => building.Building_name.toLowerCase().includes(search.toLowerCase()))

    " -->
