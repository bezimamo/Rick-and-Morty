<template>
  <div class="character">
    <nav class="w-full p-2 flex justify-center items-center border-b m-3 border-[rgb(17,176,200)]">
      <h1 class="font-bold text-5xl text-blue-300">Characters of Rick and Morty</h1>
    </nav>
    <section class="flex justify-center items-center flex-wrap p-3 gap-5">
      <div v-for="character in characters" :key="character.id">
        <CharacterCard
          :name="character.name" 
          :status="character.status" 
          :species="character.species"
          :gender="character.gender"
          :image="character.image"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard.vue';

export default {
  name: 'CharacterView',
  components: {
    CharacterCard,
  },
  data() {
    return {
      characters: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const data = await axios.get("https://rickandmortyapi.com/api/character");
      this.characters = data.data.results;
    },
  },
};
</script>

<style scoped>
.character {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>