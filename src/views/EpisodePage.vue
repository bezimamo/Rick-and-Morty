<template>
  <div class="episode-page">
    <nav class="w-full p-2 flex justify-center items-center border-b m-3 border-[rgb(17,176,200)]">
      <img src="/image.png" alt="" class="">
    </nav>
    <section class="flex justify-center items-center flex-wrap p-3 gap-5">
      <div v-for="episode in episodes" :key="episode.id">
        <EpisodeCard
          :name="episode.name"
          :episode="episode.episode"
          :air_date="episode.air_date"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import EpisodeCard from '@/components/EpisodeCard.vue';

export default {
  name: 'EpisodePage',
  components: {
    EpisodeCard,
  },
  data() {
    return {
      episodes: [],
    };
  },
  created() {
    this.loadEpisodes();
  },
  methods: {
    async loadEpisodes() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        this.episodes = response.data.results;
      } catch (error) {
        console.error('Failed to load episodes:', error);
      }
    },
  },
};
</script>

<style scoped>
.episode-page {
  padding: 2rem;
}
</style>