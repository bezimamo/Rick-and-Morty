<template>
  <div class="character">
    <div class="character-details" v-if="character">
      <h1 class="font-bold text-3xl mb-3">{{ character.name }}</h1>
      <img :src="character.image" :alt="character.name + ' Image'" class="character-image mb-3" />
      <p>Status: <span class="font-bold">{{ character.status }}</span></p>
      <p>Species: <span class="font-bold">{{ character.species }}</span></p>
      <p>Gender: <span class="font-bold">{{ character.gender }}</span></p>
    </div>
    <div v-else>Loading...</div>
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
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        this.character = response.data;
      } catch (error) {
        console.error('Failed to fetch character:', error);
      }
    },
  },
};
</script>

<style scoped>
.character {
  display: flex;
  justify-content: center;
  align-items: center;
}

.character-details {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 20px;
}

.character-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
