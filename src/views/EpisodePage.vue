<template>
  <div class="episode-page">
    <nav class="navbar">
      <h1 class="text-3xl font-bold">The Episode  of Rick and Morty TV Series</h1>
    </nav>
    <section class="episode-details-container">
      <div v-if="episode" class="episode-details">
        <h2 class="episode-name">{{ episode.name }}</h2>
        <p class="episode-info">Episode: <span class="highlight">{{ episode.episode }}</span></p>
        <p class="episode-info">Air Date: <span class="highlight">{{ episode.air_date }}</span></p>
        <p class="episode-info">Created: <span class="highlight">{{ episode.created }}</span></p>
      </div>
      <div v-if="episodeCharacters.length" class="character-list">
        <h2 class="character-list-title">Characters in this Episode</h2>
        <div v-for="character in episodeCharacters" :key="character.id" class="character-card">
          <img :src="character.image" :alt="character.name" class="character-image" />
          <div class="character-info">
            <h3 class="character-name">{{ character.name }}</h3>
            <p>Status: <span class="highlight">{{ character.status }}</span></p>
            <p>Species: <span class="highlight">{{ character.species }}</span></p>
            <p>Gender: <span class="highlight">{{ character.gender }}</span></p>
          </div>
        </div>
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
      episodeCharacters: []
    };
  },
  async created() {
    await this.loadEpisode();
  },
  methods: {
    async loadEpisode() {
      try {
        const { id } = this.$route.params; // Get episode ID from route params
        const query = `
          query ($id: ID!) {
            episode(id: $id) {
              name
              air_date
              episode
              created
              characters {
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
        this.episode = response.data.data.episode;
        this.episodeCharacters = response.data.data.episode.characters;
      } catch (error) {
        console.error('Failed to load episode:', error);
      }
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.episode-page {
  padding: 2rem;
  background-color: #f0f4f8; /* Light background color */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  width: 100%;
  padding: 1rem;
  background-color: #11b0c8; /* Primary color for the navbar */
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.episode-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.episode-details {
  background-color: #ffffff; /* White background for episode details */
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
  max-width: 600px;
  width: 100%;
  margin-bottom: 2rem;
}

.episode-name {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50; /* Dark color for the title */
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Arial Black', sans-serif; /* Modern font for the title */
}

.episode-info {
  font-size: 1.2rem;
  color: #34495e; /* Slightly lighter color for the info text */
  margin-bottom: 0.5rem;
  font-family: 'Helvetica', sans-serif; /* Clean font for the info text */
}

.highlight {
  font-weight: bold;
  color: #e74c3c; /* Highlight color */
}

.character-list {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.character-list-title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Arial Black', sans-serif;
}

.character-card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(33% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.character-image {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}

.character-info {
  font-size: 1rem;
  color: #34495e;
  font-family: 'Helvetica', sans-serif;
}

.character-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
</style>
