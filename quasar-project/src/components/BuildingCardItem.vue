<template>
  <!-- loop to generate all infos, filter by search -->
  <div>
    <button
      class="bg-lnf-navy/5 rounded-xl px-5 py-4 text-left w-full"
      @click="infoDialog = true"
    >
      <p>
        {{ item.Building_name }}
      </p>
    </button>

    <q-dialog v-model="infoDialog" @hide="editing = false" flat>
      <q-card flat class="dialog-card" style="border-radius: 0.75rem">
        <q-card-section>
          <q-card-actions class="absolute right-0 top-0">
            <q-btn icon="close" flat @click="closeDialogBox" />
          </q-card-actions>
          <template v-if="!editing">
            <div class="row items-end gap-2 mb-4">
              <h4>
                {{ item.Building_name }}
              </h4>
              <div class="flex mb-1 opacity-40 items-end">
                <img src="/icons/ic-building.svg" class="mr-1 h-5 w-5" />
                <p class="text-lg leading-none">ID: {{ item.Buildings_id }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex">
                <img src="/icons/ic-id.svg" class="mr-1 h-4 w-4" />
                <p>Client ID {{ item.Clients_id }}</p>
              </div>

              <div class="flex">
                <img src="/icons/ic-map.svg" class="mr-1 h-4 w-4" />
                <p>{{ fullBuildingAddress }}</p>
              </div>

              <p
                v-if="
                  item.Building_description &&
                  item.Building_description.trim() !== ''
                "
              >
                Description: {{ item.Building_description }}
              </p>
            </div>
            <button
              v-if="!editing"
              @click="startEditing"
              class="button-red-outline flex items-center justify-center w-full h-12 mt-8"
            >
              <img src="/icons/ic-edit.svg" class="mr-2 h-5 w-5" />
              <p>Edit Details</p>
            </button>
          </template>

          <template v-else>
            <div class="py-8 flex flex-col gap-4">
              <q-input
                v-model="editedItem.Building_name"
                label="Building Name"
                :rules="[(val) => val.length > 0 || 'Cannot be empty']"
                hide-bottom-space
                class="text-body"
              />

              <q-input
                v-model="editedItem.Building_street"
                label="Street Name"
                class="text-body"
              />
              <q-input
                v-model="editedItem.Building_streetNumber"
                label="House Number"
                class="text-body"
              />
              <q-input
                v-model="editedItem.Building_zipCode"
                label="Zipcode"
                class="text-body"
              />
              <q-input
                v-model="editedItem.Building_city"
                label="City"
                class="text-body"
              />
              <q-input
                v-model="editedItem.Building_description"
                label="Description"
                class="text-body"
              />
            </div>

            <q-card-actions class="flex gap-4 p-0" align="right">
              <button
                label="Exit"
                color="primary"
                @click="editing = false"
                flat
                class="button-red-outline"
              >
                Cancel
              </button>
              <button
                label="Delete"
                @click="deleteBuildingData"
                flat
                class="button-red-outline"
              >
                Delete
              </button>
              <button
                label="Save"
                color="primary"
                @click="update_building()"
                flat
                class="button-red"
              >
                Save
              </button>
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
  name: 'BuildingCardItem',
  props: ['item'],

  methods: {
    OpenDialogBox() {
      console.log('REFRESGIN');
    },

    closeDialogBox() {
      this.editing = false;
      this.infoDialog = false;
    },

    startEditing() {
      // Start editing by copying the original item
      this.editedItem = { ...this.item };
      this.editing = true;
    },

    async update_building() {
      let Building_id = this.props.item.Buildings_id;

      const { data, error } = await supabase
        .from('Buildings')
        .update({
          Building_name: this.editedItem.Building_name,
          Building_street: this.editedItem.Building_street,
          Building_streetNumber: this.editedItem.Building_streetNumber,
          Building_zipCode: this.editedItem.Building_zipCode,
          Building_city: this.editedItem.Building_city,
          Building_description: this.editedItem.Building_description,
        })
        .eq('Buildings_id', Building_id)
        .select();

      this.editing = false;
    },

    async deleteBuildingData() {
      let Building_id = this.props.item.Buildings_id;

      const { error } = await supabase
        .from('Buildings')
        .delete()
        .eq('Buildings_id', Building_id);

      this.editing = false;
      this.infoDialog = false;
    },
  },

  setup(props) {
    const fullBuildingAddress =
      props.item.Building_street +
      ' ' +
      props.item.Building_streetNumber +
      ', ' +
      props.item.Building_zipCode +
      ', ' +
      props.item.Building_city;
    const infoDialog = ref(false);
    const editing = ref(false);
    const editedItem = ref([]);

    return {
      props,
      infoDialog,
      fullBuildingAddress,
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
