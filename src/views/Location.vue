<template>
  <div class="location-page">
    <nav class="w-full p-2 flex justify-center items-center border-b m-3 border-primary">
      <h1 class="text-3xl font-bold">The Location of Rick and Morty TV Series</h1>
    </nav>
    <section class="location-details-container">
      <div v-if="location" class="location-details">
        <h2 class="text-3xl font-bold mb-4">{{ location.name }}</h2>
        <p class="text-lg mb-2"><span class="font-bold">Type:</span> {{ location.type }}</p>
        <p class="text-lg mb-2"><span class="font-bold">Dimension:</span> {{ location.dimension }}</p>
        <p class="text-lg mb-2"><span class="font-bold">Number of Residents:</span> {{ residents.length }}</p>

        <h3 class="text-2xl font-bold mt-6 mb-4">Residents</h3>
        <div class="resident-list-container">
          <div v-for="(resident, index) in residents" :key="resident.id" class="resident-item" :class="{ 'first-column': index % 3 === 0 }">
            <img :src="resident.image" :alt="resident.name" class="resident-image" />
            <p class="resident-name">{{ resident.name }}</p>
            <p>Status: <span class="font-bold">{{ resident.status }}</span></p>
            <p>Species: <span class="font-bold">{{ resident.species }}</span></p>
            <p>Gender: <span class="font-bold">{{ resident.gender }}</span></p>
          </div>
        </div>
      </div>
      <div v-else class="loading">Loading...</div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LocationPage',
  data() {
    return {
      location: null,
      residents: [],
    };
  },
  async created() {
    await this.loadLocation();
  },
  methods: {
    async loadLocation() {
      try {
        const { id } = this.$route.params;
        const query = `
          query ($id: ID!) {
            location(id: $id) {
              name
              type
              dimension
              residents {
                id
                name
                status
                species
                gender
                image
              }
            }
          }
        `;
        const response = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: { id }
        });
        this.location = response.data.data.location;
        this.residents = response.data.data.location.residents;
      } catch (error) {
        console.error('Failed to load location:', error);
      }
    },
  },
};
</script>

<style scoped>
.location-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d3436;
  color: #dfe6e9;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
}

.location-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.location-details {
  background-color: #74b9ff;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: center;
}

.text-lg {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.font-bold {
  font-weight: bold;
  color: #0984e3;
}

.resident-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.resident-item {
  width: calc(33.33% - 10px); /* Adjust according to your preference */
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2d3436;
}

.resident-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.resident-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.loading {
  font-size: 1.5rem;
  color: #0984e3;
}
</style>
