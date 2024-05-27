<template>
  <div class="episode-page">
    <nav class="w-full p-2 flex justify-center items-center border-b m-3 border-[rgb(17,176,200)]">
      <img src="/image.png" alt="" class="logo">
    </nav>
    <section class="episode-details-container">
      <div v-if="episode" class="episode-details">
        <h2 class="text-3xl font-bold">{{ episode.name }}</h2>
        <p class="text-lg">Episode: <span class="font-bold">{{ episode.episode }}</span></p>
        <p class="text-lg">Air Date: <span class="font-bold">{{ episode.air_date }}</span></p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EpisodePage',
  data() {
    return {
      episode: null,
    };
  },
  async created() {
    await this.loadEpisode();
  },
  methods: {
    async loadEpisode() {
      try {
        const { id } = this.$route.params; // Get episode ID from route params
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        this.episode = response.data;
      } catch (error) {
        console.error('Failed to load episode:', error);
      }
    },
  },
};
</script>

<style scoped>
.episode-page {
  padding: 2rem;
}

.logo {
  width: 150px; /* Adjust size as needed */
  height: auto;
}

.episode-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.episode-details {
  background-color: #ebf8ff;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}

.text-lg {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.font-bold {
  font-weight: bold;
}
</style>
