<!-- src/layouts/MainLayout.vue -->

<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer  v-model="drawer"
        show-if-above

        :mini="!drawer || miniState"
        @click.capture="drawerClick"

        :width="200"
        :breakpoint="500"
        bordered
        :style="{ background: 'linear-gradient(#E65300, #EA0029)' }"
      > 
       
      
      <div class="q-mb-md text-white"  >
        
        <q-list padding>

          <q-item >
          <q-item-section avatar>
            <q-btn
              flat
              @click="miniState = true"
              dense
             
              icon="menu"
            
            />
          </q-item-section>
          </q-item> 

          <router-link to="/" v-slot="{ navigate }"  style="text-decoration: none; color: inherit;">
      <q-item
        clickable
        v-ripple
        @click="navigate"
      >
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          Home
        </q-item-section>
      </q-item>
    </router-link>

    <router-link to="/projects" v-slot="{ navigate }"  style="text-decoration: none; color: inherit;">
      <q-item
        clickable
        v-ripple
        @click="navigate"
       
      >
        <q-item-section avatar>
          <q-icon name="layers" />
        </q-item-section>
        <q-item-section>
          Projects
        </q-item-section>
      </q-item>
    </router-link>

    <router-link to="/FinancialReports" v-slot="{ navigate }"  style="text-decoration: none; color: inherit;">
      <q-item
        clickable
        v-ripple
        @click="navigate"
      >
        <q-item-section avatar>
          <q-icon name="trending_up" />
        </q-item-section>
        <q-item-section>
          Financial Report
        </q-item-section>
      </q-item>
    </router-link>

           
        </q-list>
           
      </div>
    </q-drawer>

    <q-page-container>
      <!-- Page content -->
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>




<script>
import { ref } from 'vue'


export default {
  setup() {
    const miniState = ref(false)
    const drawer = ref(false)

    const drawerClick = (e) => {
      if (miniState.value) {
        miniState.value = false
        e.stopPropagation()
      }
    }

    const navigateTo = (route) => {
      // Perform any necessary navigation actions
      // For example, using Vue Router
      this.$router.push(route)
      closeDrawer()
    }

    const closeDrawer = () => {
      drawer.value = false
    }

    return {
      drawer,
      miniState,
      drawerClick,
      navigateTo
    }
  },
};
</script>



