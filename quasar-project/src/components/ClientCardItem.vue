<template>
   <!-- loop to generate all infos, filter by search -->
   <div class="q-pa-md q-gutter-sm">
   <button
          class="border border-lnf-navy rounded-xl px-5 py-4 hover:bg-lnf-navy/5 duration-100 text-left"
    
          @click="infoDialog = true"
        >
          <p>
            {{ item.Clients_name }}
          </p>
          
  </button>


  <q-dialog v-model="infoDialog" @hide="editing=false">
    <q-card>
      <q-card-section class="q-pa-md">

        <template v-if="!editing">
          <div class="row justify-between">
            <h4>
              <span >{{ editedItem.Clients_name}}</span>
            </h4>
            <q-btn
              v-if="!editing"
              @click="startEditing"
              icon="edit"
            />
          </div>
            <p>Client ID: {{ item.Clients_id }}</p>
            <p>Phone Number:  {{item.Phone_number }}</p>
            <p>Address: {{ fullAddress }}</p>
            
            <!-- Buildings button in client information-->
            <q-card-actions class="q-pa-md">
              <q-btn label="Buildings" @click="go_to_client_buildings()" style="text-transform: none;" />
            </q-card-actions>

      <q-card-actions align="right">
        <q-btn label="Close" color="primary" @click="infoDialog = false" />
      </q-card-actions>

          </template>

          <template v-else>
            
              <q-input
                v-model="editedItem.Clients_name"
                label="Client Name"
                :rules="[val => val.length > 0 || 'Cannot be empty']"
                hide-bottom-space
              />
            
            <q-input v-model="editedItem.Phone_number" label="Phone number" />
            <q-input v-model="editedItem.Address_StreetName" label="Street Name" />
            <q-input v-model="editedItem.Address_HouseNumber" label="House Number" />
            <q-input v-model="editedItem.Address_Zipcode" label="Zipcode" />
            <q-input v-model="editedItem.Address_City" label="City" />

            <q-card-actions align="right">
        <q-btn  label="Save" color="primary" @click="update_client()" />
        <q-btn  label="Exit" color="primary" @click= "editing = false" />
        <q-btn  label="Delete" color=red @click= deleteClientData() />
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

      methods:{
        go_to_client_buildings(){
          this.$emit('exit_card', this.props.item);
          console.log('REFRESGIN')
        },

        startEditing() {
        // Start editing by copying the original item
         
          this.editing = true;
        },

        async update_client(){
          let client_id = this.props.item.Clients_id
      
        
          const { data, error } = await supabase
              .from('Clients')
              .update({ Clients_name: this.editedItem.Clients_name, 
                Phone_number : this.editedItem.Phone_number, 
                Address_HouseNumber: this.editedItem.Address_HouseNumber, 
                Address_StreetName : this.editedItem.Address_StreetName,
                Address_Zipcode : this.editedItem.Address_Zipcode,
                Address_City :this.editedItem.Address_City,
               })
              .eq('Clients_id', client_id)
              .select()


              this.refreshPage();
              this.editing = false;

        },

        async deleteClientData() {
          let client_id = this.props.item.Clients_id

          const { error } = await supabase
            .from('Clients')
            .delete()
            .eq('Clients_id', client_id)

            this.editing = false;
            this.infoDialog = false
        },
        refreshPage(){
          // location.reload();
          
        },



    },
  

        setup(props) {
          const fullAddress = props.item.Address_StreetName + ' ' + props.item.Address_HouseNumber + ', '  +  props.item.Address_Zipcode + ', '+ props.item.Address_City 
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
