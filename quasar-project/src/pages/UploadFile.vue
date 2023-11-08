<template>
  <div>
    
    <!-- chart -->
    <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-file
        v-model="files"
        label="Pick files"
        filled
        counter
       
        max-files="3"
        
        style="max-width: 300px"
        accept=".csv"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn  @click="importData()" icon="add" />
    </div>
  </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ref } from 'vue';
import { supabase } from '../assets/supabase';
ChartJS.register(ArcElement, Tooltip, Legend);




export default {
  
  name: 'FinancialReportsPage',
  components: {
  
  },
  setup() {
    var csvData=[]
    const isItDone = ref(false)
    // const app = createApp(App)

    // app.use(VuePapaParse)
    // app.mount('#app')
    const readDataAndUpdateDatabase = async (csvData) => {
     
      for (let i = 0; i< csvData.length; i++) {
        if (i != 0)  {
          
          let client_name = csvData[i][0]

          
          const { data, error } = await supabase
            .from('Clients')
            .insert([
              { Clients_name: client_name},
            ])
            .select()

            if(!error){

            }
                    
        }
      }
        

   
    }

    const config = {
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: false,
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: undefined,
	error: undefined,
	download: false,
	downloadRequestHeaders: undefined,
	downloadRequestBody: undefined,
	skipEmptyLines: false,
	chunk: undefined,
	chunkSize: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';'],
	skipFirstNLines: 0,
  step: function(result){
    csvData.push(result.data)
  },
  complete: function(results, file) {
    console.log('Complete', csvData.length, 'records.'); 
    this.isItDone = true
    readDataAndUpdateDatabase(csvData)
  }
 
}
    return {
     config,
     csvData,
     isItDone,
    };
  },
  methods: {
    importData(){
      console.log(this.files)
      this.$papa.parse(this.files, this.config)
    }


  },
};
</script>
