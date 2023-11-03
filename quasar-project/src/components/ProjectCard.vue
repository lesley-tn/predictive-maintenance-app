<template>
  <div>
 
   
    <button
        class="bg-lnf-navy/5 rounded-xl px-5 py-4 text-left w-full"
        @click="projectDialog = true"
      >
      <div >
        <h2 class="q-pb-lg q-mx-md">{{ project.Project_name }}</h2>

      
      <div class="h-24">
        <Doughnut :data="data" :options="options" />
      </div>
      </div>
    </button>
    
    <q-dialog v-model = "projectDialog" full-width >
      <q-card>
        <q-card-section>
          
          <div class="row justify-between">
            <h6>
              {{ project.Project_name }}
            </h6>
            <q-btn @click="setInputsToReadonly()" icon="edit" />
            
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section >
         

          <div class="q-pa-md">
   <q-table
      :rows="rows"
      :columns="columns"
      
      :rows-per-page-options="[]"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Task Name" :props="props">
            {{ props.row.Task_name }}
            <q-popup-edit :disable="inputsReadonly" v-model="props.row.Task_name" buttons v-slot="scope">
              <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set " />
            </q-popup-edit>
          </q-td>
          <q-td key="Exp Start Date" :props="props">
            {{ props.row.Expect_Start_Date}}
            <q-popup-edit :disable="inputsReadonly" v-model.number="props.row.Expect_Start_Date" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
          <q-td key="Expected Due" :props="props">
            <div class="text-pre-wrap">{{ props.row.Expected_Due}}</div>
            <q-popup-edit :disable="inputsReadonly" v-model.number="props.row.Expected_Due" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
          <q-td key="Cost" :props="props">
            {{ props.row.Cost }}
            <q-popup-edit :disable="inputsReadonly" v-model.number="props.row.Cost" buttons persistent v-slot="scope">
              <q-input  type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
          <q-td key="Status" :props="props">
            {{ props.row.Status }}
            <q-popup-edit :disable="inputsReadonly" v-model.number="props.row.Status" buttons label-set="Save" label-cancel="Close" v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
          
        </q-tr>
      </template>
    </q-table>
  </div>
       
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="items-end">
          <q-btn flat label="close" color="primary" v-close-popup />
        </q-card-actions>
     
      </q-card>
    </q-dialog>
  
  </div>
</template>

<script>
import { ref } from 'vue';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';



ChartJS.register(ArcElement, Legend);

export default {
  props: {
    project: Object,
  },
  components: {
    Doughnut,
  },
  data(props) {
    console.log(props.project.completedTasks)
    
    
    

    const rows = ref([])

    for (let i = 0; i< props.project.tasks.length; i++) {
      console.log("adding")
      let row_to_add = {
        
        Task_name: props.project.tasks[i].Task_name,  
        Expect_Start_Date: props.project.tasks[i].Expected_start_date, 
        Expected_Due: props.project.tasks[i].Expect_end_Date,
        Cost: props.project.tasks[i].Task_cost,
        Status: props.project.tasks[i].Task_status
      }
      rows.value.push(row_to_add)
    }

    const columns = [
     {name: 'Task Name', label:'Task Name',  align: 'left',},
     {name: 'Exp Start Date',label:'Exp Start Date',  align: 'left',},
     {name: 'Expected Due',label:'Expected Due',  align: 'left',},
     {name: 'Cost',label:'Cost',  align: 'left',},
     {name: 'Status', label:'Status',  align: 'left',},

    ]

    return {
      data: {
        labels: ['To do', 'In progress', 'Completed'],
        datasets: [
          {
            label: 'Dataset',
            data: [
              props.project.todoTasks,
              props.project.inProgressTasks,
              props.project.completedTasks,
            ],
            backgroundColor: ['#EA0029', '#f2a200', '#10B116'],
            pointStyle: 'circle',
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 0, // Set the box width to 0                         
            },
          display: false,
          position: 'right',
          },
        
        },
      },
      rows,
      columns,
      inputsReadonly: false,
    };
  },

  setup(){
  

    return{
      projectDialog: ref(false),
    }
  },

  methods: {

    setInputsToReadonly() {
      this.inputsReadonly = true;
    },
    setInputsToEditable() {
      this.inputsReadonly = false;
    },
  },

  
};
</script>




