
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div  id="app" class="flex flex-col h-screen">
    <nav class="w-full p-2 flex justify-start  border-b border-[rgb(17,176,200)]">
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <main class="flex-grow">
      <RouterView/>
      
    </main>
  </div>
  
  
</template>

<style scoped>
nav {
  background-color: #fff;
}
main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
