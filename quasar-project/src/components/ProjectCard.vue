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
            <div>
            <q-btn v-if="this.inputsReadonly == true" @click="switchState()" icon="edit" />
            <div>
            <q-btn v-if="this.inputsReadonly == false"  @click="cancelUpdateTable()" icon="close" />
            <q-btn v-if="this.inputsReadonly == false"  @click="updateTable()" icon="check" />
            <q-btn v-if="this.inputsReadonly == false"  @click="addRow()" icon="add" />
            <q-btn v-if="this.inputsReadonly == false"  @click="deleteSelection()" icon="delete" />
            
            </div>
          </div>
        </div>
        </q-card-section>

        <q-separator />

        <q-card-section >
   

          <div class="q-pa-md">
          
   <q-table
      :rows="rows"
      :columns="columns"
      
      :rows-per-page-options="[]"
      row-key="Task_id"
      bordered
      :selection="isSelectionEnabled ? 'multiple' : 'none'"
      v-model:selected="selected"
        
 
     
    >
    
      <template v-slot:body="props"> 
        <q-tr :props="props">
          <q-th style="width: 1em" v-if="!this.inputsReadonly">
            <q-checkbox v-model="selected" :val="props.row" color="negative" />
          </q-th>

          <q-td key="Task Name" :props="props">
            {{ props.row.Task_name }}
            <q-popup-edit :disable="inputsReadonly" v-model="props.row.Task_name" buttons v-slot="scope">
              <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set " />
            </q-popup-edit>
          </q-td>

          <q-td key="Exp Start Date" :props="props">
            {{ props.row.Expect_Start_Date}}
            <q-popup-edit :disable="inputsReadonly" v-model="props.row.Expect_Start_Date" buttons v-slot="scope" >
              
              <q-input  v-model="scope.value" dense autofocus @keyup.enter="scope.set"> 
               
                <template v-slot:prepend>
                   <q-icon name="event" class="cursor-pointer">
                     <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                       <q-date v-model="scope.value" mask="YYYY-MM-DD">
                         <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                         </div>
                       </q-date>
                     </q-popup-proxy>
                   </q-icon>
                </template>

              </q-input>
            </q-popup-edit>
          </q-td>

          <q-td key="Expected Due" :props="props">
            <div class="text-pre-wrap">{{ props.row.Expect_Due}}</div>
            <q-popup-edit :disable="inputsReadonly" v-model="props.row.Expect_Due" buttons v-slot="scope">
              <q-input  v-model="scope.value" dense autofocus @keyup.enter="scope.set"> 
               
               <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="scope.value" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
               </template>

             </q-input>
            </q-popup-edit>
          </q-td>

          <q-td key="Cost" :props="props">
            {{ props.row.Cost }}
            <q-popup-edit :disable="inputsReadonly" v-model="props.row.Cost" buttons persistent v-slot="scope">
              <q-input  type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
          <q-td key="Status" :props="props">
            {{ props.row.Status }}
            <q-popup-edit :disable="inputsReadonly" v-model="props.row.Status" buttons v-slot="scope">
              <q-select v-model="scope.value" dense autofocus @keyup.enter="scope.set" :options="statusOptions"/>
            </q-popup-edit>
          </q-td>
          
        </q-tr>
        
      </template>

 
    </q-table>
  </div>
       
        </q-card-section>

        <q-separator />
        <div class="row q-pa-md justify-around">
        <q-input  v-if="addingRow" v-model="newRow.name" dense autofocus counter  />
        <q-input  v-if="addingRow"  v-model="newRow.start_date" dense autofocus > 
               
               <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="newRow.start_date" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
               </template>

             </q-input>

        <q-input  v-if="addingRow" v-model="newRow.end_date" dense autofocus > 
               
               <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="newRow.end_date" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
               </template>

             </q-input>

             <q-input   v-if="addingRow" type="number" v-model="newRow.cost" dense autofocus />
             <q-select  v-if="addingRow" v-model="newRow.status" dense autofocus :options="statusOptions"/>
             <q-btn  v-if="addingRow"  @click="confirmAddRow()" icon="add" />
            </div>
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
import { supabase } from '../assets/supabase';
import _ from 'lodash';




ChartJS.register(ArcElement, Legend);

export default {
  props: {
    project: Object,
  },
  components: {
    Doughnut,
  },

  setup(props) {
  const originalRows = [];
  const selected = ref([]);
  const isSelectionEnabled = ref(false)
  // const selectAll = ref(false);
  // const selectAllRows = () => {
  //     if (selectAll.value) {
  //       selected.value = rows.map(row => row.name);
  //     } else {
  //       selected.value = [];
  //     }
  //   };


  for (let i = 0; i< props.project.tasks.length; i++) {
      
      let row_to_add = {
        Task_id: props.project.tasks[i].ProjectTasks_id, 
        Task_name: props.project.tasks[i].Task_name,  
        Expect_Start_Date: props.project.tasks[i].Expected_start_date, 
        Expect_Due: props.project.tasks[i].Expected_end_date,
        Cost: props.project.tasks[i].Task_cost,
        Status: props.project.tasks[i].Task_status
      }
      
      originalRows.push({ ...row_to_add });
    }
    console.log("SET VALUE OF ORIGINAL ROWS")

    const rows = _.cloneDeep(originalRows);

    const columns = [
     {name: 'Task Name', label:'Task Name',  align: 'left',},
     {name: 'Exp Start Date',label:'Expected Start Date',  align: 'left',},
     {name: 'Expected Due',label:'Expected Due',  align: 'left',},
     {name: 'Cost',label:'Cost(€)',  align: 'left',},
     {name: 'Status', label:'Status',  align: 'left',},

    ]


    const statusOptions = ['To Do', 'In Progress', 'Completed'];
    const newRow = ref({})

    newRow.value={name:"", start_date:"", end_date:"", cost:"", status:""}
    const project_id = ref(props.project.Project_id)
    
    return{      
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
      inputsReadonly: ref(true),
      originalRows,
      projectDialog: ref(false),
      statusOptions,
      addingRow: ref(false),
      newRow,
      project_id,
      selected,
      isSelectionEnabled,
      // selectAllRows,
      // selectAll,

    }
  },

  methods: {
    // deleteSelected() {
    //   for (const item of this.selected) {
    //     this.deleteRow(item);
    //   }
    //   this.selected = [];
    // },
    // deleteval(row) {
    //   this.deleteRow(row);
      
    // },

    // async deleteRow(row) {
    //   if (!row) return;
    //   const { error } = await supabase
    //     .from('ProjectTasks')
    //     .delete()
    //     .eq('ProjectTasks_id', this.project.Task_id)
    // },

    async confirmAddRow() {
        console.log(this.project_id)

            const { data, error } = await supabase
        .from('ProjectTasks')
        .upsert([
          { Task_name: this.newRow.name,
          Task_status: this.newRow.status,
          Project_id: this.project_id,
        },
        ])
        .select();

        if (error) {
          // Handle the error for this row if needed
          console.error(`Error adding row: ${error.message}`);
        } 



      console.log(this.newRow)
    },
    async deleteSelection(){
      for (const task of this.selected){

             const { error } = await supabase
        .from('ProjectTasks')
        .delete()
        .eq('ProjectTasks_id', task.Task_id)
    }

      

    },

    addRow() {
      this.addingRow = true
    },
    cancelUpdateTable(){
      this.rows = _.cloneDeep(this.originalRows);
      this.inputsReadonly = true;
      this.addingRow = false;
      this.isSelectionEnabled = false;
    },

    switchState() {
         // Toggle inputsReadonly between true and false
         console.log("Switching")
      this.inputsReadonly = !this.inputsReadonly;
this.isSelectionEnabled  =  !this.isSelectionEnabled
   

      if (this.inputsReadonly) {
        // If inputsReadonly is true, restore rows to their original state
        this.rows = [...this.originalRows];
      }
      
    },
    
    async updateTable(){
      
      for (const row of this.rows) {
        // Prepare the update data for each row
        const updateData = {
          Task_name: row.Task_name,
          Expected_start_date: row.Expect_Start_Date,
          Expected_end_date: row.Expect_Due,
          Task_cost: row.Cost,
          Task_status: row.Status,
          
          // Define your update data here based on the row values
        };
        console.log(updateData)
        
        const { data, error } = await supabase
          .from('ProjectTasks')
          .update(updateData)
          .eq('ProjectTasks_id', row.Task_id) // Adjust as needed to match your criteria
          .select();

          
        
        if (error) {
          // Handle the error for this row if needed
          console.error(`Error updating row: ${error.message}`);
        } else {

          this.inputsReadonly = true;
        }
       
          
        
    }
  }


  },
 
  
};
</script>




