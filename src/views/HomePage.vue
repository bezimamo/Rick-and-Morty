<template>
  <div class="homepage bg-black text-white">
    <h1 class="title text-5xl font-bold text-center">The Rick and Morty TV Series</h1>

    <!-- Carousel -->
    <div class="carousel-container">
      <div class="carousel">
        <button @click="prevSlide" class="carousel-nav prev">
          <span>&lt;</span>
        </button>
        <div class="carousel-content">
          <div class="description">
            <p>{{ showDescription }}</p>
          </div>
          <div class="character-carousel">
            <img v-if="currentSlideImage" :src="currentSlideImage" alt="Rick and Morty Carousel" class="carousel-image" />
            <div class="character-name">
              <h2>{{ currentSlideName }}</h2>
            </div>
          </div>
        </div>
        <button @click="nextSlide" class="carousel-nav next">
          <span>&gt;</span>
        </button>
      </div>
    </div>

    <!-- Show Details -->
    <div class="show-details">
      <div class="detail">
        <h2>Genre</h2>
        <p>{{ showGenre }}</p>
      </div>
      <div class="detail">
        <h2>Creators</h2>
        <p>{{ showCreators }}</p>
      </div>
      <div class="detail">
        <h2>Stars</h2>
        <p>{{ showStars }}</p>
      </div>
      <div class="detail">
        <h2>Rating</h2>
        <p><span class="fa fa-star checked text-orange-400"></span> {{ showRating }}</p>
      </div>
    </div>

    <!-- Characters List -->
    <div class="characters">
      <h2 class="text-color font-bold text-4xl text-center my-6">Characters of Rick and Morty</h2>
      <section class="flex justify-center items-center flex-wrap p-3 gap-5">
        <div v-for="character in characters" :key="character.id" class="character-card">
          <router-link :to="{ name: 'Character', params: { id: character.id } }">
            <img :src="character.image" :alt="character.name + ' Image'" class="character-image">
            <div class="character-details">
              <h3 class="text-xl font-bold">{{ character.name }}</h3>
            </div>
          </router-link>
        </div>
      </section>
    </div>

    <!-- Episodes List -->
    <div class="episodes">
      <h2 class="text-color font-bold text-4xl text-center my-6">Episodes of Rick and Morty</h2>
      <section class="flex justify-center items-center flex-wrap p-3 gap-5">
        <div v-for="episode in episodes" :key="episode.id" class="episode-card">
          <router-link :to="{ name: 'EpisodePage', params: { id: episode.id } }">
            <div class="episode-details">
              <h3 class="text-xl font-bold">{{ episode.name }}</h3>
              <p>Episode: <span class="font-bold">{{ episode.episode }}</span></p>
              <p>Air Date: <span class="font-bold">{{ episode.air_date }}</span></p>
            </div>
          </router-link>
        </div>
      </section>
    </div>

    <!-- Locations List -->
    <div class="locations">
      <h2 class="text-color font-bold text-4xl text-center my-6">Locations of Rick and Morty</h2>
      <section class="flex justify-center items-center flex-wrap p-3 gap-5">
        <div v-for="location in locations" :key="location.id" class="location-card">
          <router-link :to="{ name: 'Location', params: { id: location.id } }">
            <div class="location-details">
              <h3 class="text-xl font-bold">{{ location.name }}</h3>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      characters: [],
      episodes: [],
      locations: [],
      showDescription: 'Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network\'s nighttime programming block Adult Swim. The show follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted but fretful grandson Morty Smith, who split their time between domestic life and interdimensional adventures.',
      showGenre: 'Sci-Fi, Comedy, Animation',
      showCreators: 'Dan Harmon, Justin Roiland',
      showStars: 'Justin Roiland, Chris Parnell, Spencer Grammer',
      showRating: '9.2',
      currentSlideIndex: 0,
      currentSlideImage: '',
      currentSlideName: ''
    };
  },
  created() {
    this.fetchCharacters();
    this.fetchEpisodes();
    this.fetchLocations();
  },
  methods: {
    async fetchCharacters() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        this.characters = response.data.results;
        this.setInitialSlide();
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      }
    },
    async fetchEpisodes() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        this.episodes = response.data.results;
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/location');
        this.locations = response.data.results;
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    },
    setInitialSlide() {
      if (this.characters.length > 0) {
        this.currentSlideImage = this.characters[0].image;
        this.currentSlideName = this.characters[0].name;
      }
    },
    nextSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.characters.length;
      this.currentSlideImage = this.characters[this.currentSlideIndex].image;
      this.currentSlideName = this.characters[this.currentSlideIndex].name;
    },
    prevSlide() {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.characters.length) % this.characters.length;
      this.currentSlideImage = this.characters[this.currentSlideIndex].image;
      this.currentSlideName = this.characters[this.currentSlideIndex].name;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Puppies+Play&display=swap');
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-bottom: 40px;
  margin-top: 20px;
  font-family: "Playfair Display", "Cedarville Cursive", serif;
  color: gold;
}

.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
}

.carousel {
  position: relative;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
}

.carousel-image {
  max-width: 100%;
  height: auto;
  margin-left: auto;
  border-radius: 8px;
}

.character-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-name {
  margin-top: 10px;
  text-align: center;
}

.description {
  max-width: 45%;
  margin-right: 20px;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev {
  left: 10px;
  border: 2px white solid;
  left: 930px;
}

.next {
  right: 10px;
  border: 2px white solid
}

.show-details {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}

.detail {
  text-align: center;
  justify-content: space-between;
  margin: 10px
}
.checked {
  color: orange;
}

.characters, .episodes, .locations {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.character-card, .episode-card, .location-card {
  width: 200px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}
.character-card:hover, .episode-card:hover, .location-card:hover {
  transform: scale(1.05);
}
.character-image, .episode-image, .location-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.character-details, .episode-details, .location-details {
  margin-top: 10px;
  justify-content: center;
  gap: 10px;
  padding: 10px
}
</style>
