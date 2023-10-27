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
             <q-card-section>
               <h4>
                 {{item.Clients_name }}
               </h4>
               <p >
                 Building ID: {{ item.Buildings_id  }}
               </p>
     
               <p >
                Client ID: {{ item.Clients_id }}
               </p>
     
             
             </q-card-section>
             <!-- Buildings button in client information-->
             <q-card-actions class="q-pa-md">
               <q-btn
               label="Buildings"
               v-on:click="go_to_client_buildings(selectedInfo.Clients_name)"  
               v-if="secondModel === 'one'"
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
       name: 'BuildingCardItem',
       props: ['item'],
 
       methods:{
         OpenDialogBox(){
           
           console.log('REFRESGIN')
         },
         
     },
 
         setup(props) {
             
             const infoDialog = ref(false);
             
             
                 
 
             return {
            
             infoDialog,
 
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