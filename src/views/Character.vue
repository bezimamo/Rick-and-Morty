<template>
  <div class="character-page">
    <nav class="navbar">
      <h1 class="text-3xl font-bold">The Character of Rick and Morty TV Series</h1>
    </nav>
    <section class="character-details-container">
      <div v-if="character" class="character-details">
        <!-- Character details -->
        <h2 class="character-name">{{ character.name }}</h2>
        <img :src="character.image" :alt="character.name + ' Image'" class="character-image" />
        <div class="character-info">
          <p>Status: <span class="highlight">{{ character.status }}</span></p>
          <p>Species: <span class="highlight">{{ character.species }}</span></p>
          <p>Gender: <span class="highlight">{{ character.gender }}</span></p>
          <p>Last known location: <span class="highlight">{{ character.location.name }}</span></p>
        </div>
        
        <!-- Episodes -->
        <h3 class="episodes-heading">Episodes {{ character.name }} appears in</h3>
        <div class="episode-list-container">
          <div v-for="(episode, index) in character.episode" :key="episode.id" class="episode-item" :class="{ 'first-column': index % 3 === 0 }">
            <p><span class="highlight">Name:</span> {{ episode.name }}</p>
            <p><span class="highlight">Air Date:</span> {{ episode.air_date }}</p>
            <p><span class="highlight">Episode:</span> {{ episode.episode }}</p>
            <p><span class="highlight">Created:</span> {{ episode.created }}</p>
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
  name: 'CharacterView',
  data() {
    return {
      character: null,
    };
  },
  created() {
    const characterId = this.$route.params.id;
    this.loadCharacter(characterId);
  },
  methods: {
    async loadCharacter(id) {
      const query = `
        query ($id: ID!) {
          character(id: $id) {
            name
            status
            species
            gender
            image
            location {
              name
            }
            episode {
              id
              name
              air_date
              episode
              created
            }
          }
        }
      `;
      
      try {
        const response = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: { id },
        });
        this.character = response.data.data.character;
      } catch (error) {
        console.error('Failed to fetch character:', error);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.character-page {
  padding: 2rem;
  background-color: #0a0b0c; /* Light background color */
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
}

.logo {
  width: 150px;
  height: auto;
}

.character-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
}

.character-details {
  background-color: #0000; /* White background for character details */
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
  max-width: 600px;
  width: 100%;
}

.character-name {
  font-size: 2rem;
  font-weight: bold;
  color: #00BD7E; /* Dark color for the title */
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Arial Black', sans-serif; /* Modern font for the title */
}

.character-info {
  font-size: 1.2rem;
  color: #34495e; /* Slightly lighter color for the info text */
  margin-bottom: 0.5rem;
  font-family: 'Helvetica', sans-serif; /* Clean font for the info text */
}

.character-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.character-image:hover {
  transform: scale(1.05);
}

.highlight {
  font-weight: bold;
  color: #f7d000; /* Highlight color */
}

.episodes-heading {
  font-size: 1.5rem;
  font-weight: bold;
  color:#00BD7E;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.episode-list {
  list-style: none;
  padding: 0;
}
.episode-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.episode-item {
  width: calc(33.33% - 10px); /* Adjust according to your preference */
  background-color: #8ba2a5;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}
.episode-item.first-column {
  margin-right: 10px;
}

.episode-item:hover {
  background-color: #00BD7E;
}
.loading {
  font-size: 1.5rem;
  color: #61dafb;
}
</style>