<template>

<q-dialog v-model="infoDialog">
      

   


       
  <q-card>
        <q-card-section>
          <h4>
            {{props.client.Clients_name }}
          </h4>
          <p >
            Client ID: {{ client.Clients_id  }}
          </p>

          <p >
           Phone number: {{ client.Phone_number }}
          </p>

          <p >
          Address: {{ client.Address_HouseNumber }}
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
          <q-btn label="Close" color="primary" @click="closeInfoDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
  
<script>
  export default {
    name: 'ClientCard',
    props: ['client'],

    setup(props){
      console.log(props.client)
    }
  };
</script>
  