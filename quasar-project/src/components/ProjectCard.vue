<template>
    <q-card>
        
      <q-card-section>
        <h2>{{ project.Project_id }}</h2>
        <p>{{ project.Clients_id }}</p>
      </q-card-section>
      <q-card-section>
    
      </q-card-section>
    </q-card>
  </template>
  
  <script type="module">
  import { onMounted } from 'vue';

  
  export default {
    props: {
      project: Object,
    },
    

    setup(props) {

  
      return {
        sections: [
          { label: 'Red section', value: props.project.todoTasks, color: 'red' },
          { label: 'Green section', value: 25, color: 'green' },
          { label: 'Blue section', value: 25, color: 'blue' }
        ],
    
      };
    },
    components: {
    
    },
    
    
  };
  </script>

  
  