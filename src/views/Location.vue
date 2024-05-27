<!-- LocationPage.vue -->
<template>
    <div class="location">
      <nav class="w-full p-2 flex justify-center items-center border-b m-3 border-[rgb(17,176,200)]">
        <img src="/image.png" alt="" class=""> 
      </nav>
      <section class="flex justify-center items-center flex-wrap p-3 gap-5">
        <div v-if="location" class="location-details">
          <h2>{{ location.name }}</h2>
          <p>Type: {{ location.type }}</p>
          <p>Dimension: {{ location.dimension }}</p>
          <p>Number of Residents: {{ location.residents.length }}</p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LocationPage',
    data() {
      return {
        location: null
      };
    },
    created() {
      this.loadLocation();
    },
    methods: {
      async loadLocation() {
        try {
          const locationId = this.$route.params.id;
          const response = await axios.get(`https://rickandmortyapi.com/api/location/${locationId}`);
          this.location = response.data;
        } catch (error) {
          console.error('Failed to load location:', error);
        }
      },
    },
  };
  </script>
  