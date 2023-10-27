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


        <q-dialog v-model="infoDialog">
    
      <q-card>
            <q-card-section>
              <h4>
                {{item.Clients_name }}
              </h4>
              <p >
                Client ID: {{ item.Clients_id  }}
              </p>
    
              <p >
               Phone number: {{ item.Phone_number }}
              </p>
    
              <p >
              Address: {{ fullStreetName }}
              </p>
            </q-card-section>
            <!-- Buildings button in client information-->
            <q-card-actions class="q-pa-md">
              <q-btn
              label="Buildings"
              v-on:click="go_to_client_buildings()"  
     
              style="text-transform: none;"
            />
            </q-card-actions>
    
            <q-card-actions align="right">
              <q-btn label="Close" color="primary" @click="infoDialog = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>
         
          
    </div>
</template>
    
  <script>
    import { ref } from 'vue';
    export default {
      name: 'ClientCardItem',
      props: ['item'],

      methods:{
        go_to_client_buildings(){
          this.$emit('exit_card', this.props.item);
          console.log('REFRESGIN')
        },
    },

        setup(props) {
          const fullStreetName = props.item.Address_StreetName + " " + props.item.Address_HouseNumber + ", " +  props.item.Address_Zipcode + ", " + props.item.Address_City

            const infoDialog = ref(false);
            
                

            return {
            props,
            infoDialog,
            fullStreetName,

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