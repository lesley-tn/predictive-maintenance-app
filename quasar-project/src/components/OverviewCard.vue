<template>
  <div class="flex rounded-xl px-6 py-4 bg-slate-100 justify-between">
    <!-- info -->
    <p>
      <span class="text-heading text-3xl block mb-1">{{ number }}</span>
      <span>{{ text }}</span>
    </p>
    <!-- icon -->
    <img :src="icon" alt="icon" />
  </div>
</template>

<script>
export default {
  name: 'OverviewCard',
  props: {
    number: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* add any custom styles here */
</style>
