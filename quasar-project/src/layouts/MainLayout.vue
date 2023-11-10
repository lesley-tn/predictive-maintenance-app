<!-- src/layouts/MainLayout.vue -->

<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
      :style="{ background: 'linear-gradient(#E65300, #EA0029)' }"
    >
      <div class="q-mb-md text-white">
        <q-list padding>
          <q-item>
            <q-item-section avatar>
              <q-btn flat @click="miniState = true" dense icon="menu" />
            </q-item-section>
          </q-item>

          <router-link
            to="/"
            v-slot="{ navigate }"
            style="text-decoration: none; color: inherit"
          >
            <q-item clickable v-ripple @click="navigate">
              <q-item-section avatar>
                <img src="/icons/ic-home.svg" alt="Home" class="h-6 w-6" />
              </q-item-section>
              <q-item-section>
                <p>Home</p>
              </q-item-section>
            </q-item>
          </router-link>

          <router-link
            to="/projects"
            v-slot="{ navigate }"
            style="text-decoration: none; color: inherit"
          >
            <q-item clickable v-ripple @click="navigate">
              <q-item-section avatar>
                <img
                  src="/icons/ic-kanban-white.svg"
                  alt="Projects"
                  class="h-6 w-6"
                />
              </q-item-section>
              <q-item-section><p>Projects</p></q-item-section>
            </q-item>
          </router-link>

          <router-link
            to="/UploadFile"
            v-slot="{ navigate }"
            style="text-decoration: none; color: inherit"
          >
            <q-item clickable v-ripple @click="navigate">
              <q-item-section avatar>
                <img src="/icons/ic-upload.svg" alt="Upload" class="h-6 w-6" />
              </q-item-section>
              <q-item-section><p>Upload File</p></q-item-section>
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
import { ref } from 'vue';

export default {
  setup() {
    const miniState = ref(false);
    const drawer = ref(false);

    const drawerClick = (e) => {
      if (miniState.value) {
        miniState.value = false;
        e.stopPropagation();
      }
    };

    const navigateTo = (route) => {
      // Perform any necessary navigation actions
      // For example, using Vue Router
      this.$router.push(route);
      closeDrawer();
    };

    const closeDrawer = () => {
      drawer.value = false;
    };

    return {
      drawer,
      miniState,
      drawerClick,
      navigateTo,
    };
  },
};
</script>
