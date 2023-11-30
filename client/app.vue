<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const layout = 'home'

useHead({
  title: 'Glyph',
  meta: [
    { name: 'description', content: 'Experience enhanced teamwork with our Privacy-Focused Team Workspace App. Protect sensitive data while boosting collaboration efficiency. Try it now!' }
  ]
})
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
