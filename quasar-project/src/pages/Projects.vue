<template>
  <div class="p-8 relative">
    <h1>Projects</h1>
    <div class="q-pt-md q-gutter-md">
    <q-badge rounded style ="background-color: #EA0029; color"  label="TO DO" />
    <q-badge rounded style ="background-color: #F2A200" label="IN PROGRESS" />
    <q-badge rounded style ="background-color: #10B116" label="COMPLETED" />
  </div>
    <AddNewProject class="fixed top-10 right-8" />
    <!-- Loop through and use ProjectCard for each project -->
    <div class="q-pt-lg grid grid-cols-3 gap-8">
   
    <project-card
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../assets/supabase';
import AddNewProject from 'src/components/AddNewProject.vue';
import ProjectCard from '../components/ProjectCard.vue';

export default {
  components: {
    ProjectCard,
    AddNewProject,
  },
  name: 'ProjectsPage', // Update the component name

  setup() {
    const projects = ref([]); // Store your projects here

    const fetchData = async () => {
      try {
        const { data: buildingsData, error: buildingsError } = await supabase
          .from('Buildings')
          .select('*');

        const { data: projectsData, error: projectsError } = await supabase
          .from('MaintenanceProjects')
          .select('*');

        const { data: projectTasksData, error: tasksError } = await supabase
          .from('ProjectTasks')
          .select('*');
    
        
          if (!buildingsError && !projectsError && !tasksError) {
          // Process your data here and populate the projects array
          projects.value = projectsData.map((project) => { 
            // You can further process project data here
            // For instance, calculate the number of tasks in different statuses
            const tasks = projectTasksData.filter(
              (task) => task.Project_id === project.Project_id
            );

            const todoTasks = tasks.filter(
              (task) => task.Task_status === 'To Do'
            ).length;
            const inProgressTasks = tasks.filter(
              (task) => task.Task_status === 'In Progress'
            ).length;
            const completedTasks = tasks.filter(
              (task) => task.Task_status === 'Completed'
            ).length;

            return {
              ...project,
              todoTasks,
              inProgressTasks,
              completedTasks,
              tasks,
              
            };
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      projects,
    };
  },
};
</script>
