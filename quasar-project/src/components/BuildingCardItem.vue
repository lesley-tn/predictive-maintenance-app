<template>
    <!-- loop to generate all infos, filter by search -->
    <div class="q-pa-md q-gutter-sm">
    <button
           class="border border-lnf-navy rounded-xl px-5 py-4 hover:bg-lnf-navy/5 duration-100 text-left"
     
           @click="infoDialog = true"
         >
           <p>
             {{ item.Building_name }}
           </p>
           
   </button>
 
 
 <q-dialog v-model="infoDialog">
     
  <q-card>
    <q-card-section class="q-pa-md">
      <template v-if="!editing">
          <div class="row justify-between">
            <h4>
              {{ item.Building_name }}
            </h4>
            <q-btn
              v-if="!editing"
              @click="startEditing"
              icon="edit"
            />
          </div>
  
      <p >
        Building ID: {{ item.Buildings_id  }}
      </p>
     
      <p >
        Client ID: {{ item.Clients_id }}
      </p>

      <p >
        Building Address: {{ fullBuildingAddress }}
      </p>

      <p v-if="item.Building_description && item.Building_description.trim() !== ''">
        Description: {{ item.Building_description }}
      </p>
      <q-card-actions align="right">
        <q-btn label="Close" color="primary" @click=closeDialogBox />
      </q-card-actions> 
    </template>
    
    <template v-else>       
      <q-input
        v-model="editedItem.Building_name"
        label="Building Name"
        :rules="[val => val.length > 0 || 'Cannot be empty']"
        hide-bottom-space
        />
          
      <q-input v-model="editedItem.Building_street" label="Street Name" />
      <q-input v-model="editedItem.Building_streetNumber" label="House Number" />
      <q-input v-model="editedItem.Building_zipCode" label="Zipcode" />
      <q-input v-model="editedItem.Building_city" label="City" />
      <q-input v-model="editedItem.Building_description" label="Description" />

      <q-card-actions align="right">
        <q-btn  label="Save" color="primary" @click="update_building()" />
        <q-btn  label="Exit" color="primary" @click= "editing = false" />
        <q-btn  label="Delete" color=red @click= deleteBuildingData />
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
 
       methods:{
         OpenDialogBox(){
           
           console.log('REFRESGIN')
         },

         closeDialogBox(){
          this.editing = false;
          this.infoDialog = false;
         },

         startEditing() {
        // Start editing by copying the original item
          this.editedItem = { ...this.item };
          this.editing = true;
        },

        async update_building(){
          let Building_id = this.props.item.Buildings_id
      
        
          const { data, error } = await supabase
              .from('Buildings')
              .update({ Building_name: this.editedItem.Building_name, 
                Building_street : this.editedItem.Building_street, 
                Building_streetNumber: this.editedItem.Building_streetNumber, 
                Building_zipCode : this.editedItem.Building_zipCode,
                Building_city : this.editedItem.Building_city,
                Building_description :this.editedItem.Building_description,
               })
              .eq('Buildings_id', Building_id)
              .select()

              this.editing = false;

        },

        async deleteBuildingData() {
          let Building_id = this.props.item.Buildings_id

          
          const { error } = await supabase
            .from('Buildings')
            .delete()
            .eq('Buildings_id', Building_id)

            this.editing = false;
            this.infoDialog = false
        }

         
     },
 
         setup(props) {
            const fullBuildingAddress = props.item.Building_street + " " + props.item.Building_streetNumber + ", " +  props.item.Building_zipCode + ", " + props.item.Building_city
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
         }
 
     
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