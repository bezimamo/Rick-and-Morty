<template>
  <div class="homepage">
    <h1 class="text-color text-5xl font-bold text-center">The Rick and Morty Tv Series </h1>

    <!-- Carousel -->
    <div class="carousel">
      <div class="carousel-content">
        <div class="description">
          <h2>Description/Storyline</h2>
          <p>{{ showDescription }}</p>
        </div>
        <div>
          <img v-if="showImage" :src="showImage" alt="Rick and Morty Carousel" class="carousel-image" />
        </div>
      </div>
      <button @click="prevSlide" class="carousel-nav prev"> <p><</p></button>
      <button @click="nextSlide" class="carousel-nav next">></button>
    </div>

    <!-- Genre -->
    <div class="genre">
      <h2>Genre</h2>
      <p>{{ showGenre }}</p>
    </div>

    <!-- Creators -->
    <div class="creators">
      <h2>Creators</h2>
      <p>{{ showCreators }}</p>
    </div>

    <!-- Stars -->
    <div class="stars">
      <h2>Stars</h2>
      <p>{{ showStars }}</p>
    </div>

    <!-- Rating -->
    <div class="rating">
      <h2>Rating</h2>
      <p><span class="fa fa-star checked text-orange-400"></span> {{ showRating }}</p>
    </div>

    <!-- Episodes -->
    <div class="episodes">
      <h2>Episodes</h2>
      <div class="episode-cards text-black">
        <div v-for="episode in episodes" :key="episode.id" class="episode-card">
          <h3>{{ episode.name }}</h3>
          <p><strong>Episode:</strong> {{ episode.episode }}</p>
          <p><strong>Air Date:</strong> {{ episode.air_date }}</p>
          <RouterLink :to="{ name: 'EpisodePage', params: { id: episode.id } }">
            <button class="episode-button">View Episode</button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <RouterLink :to="{ name: 'EpisodePage' }">
        <button class="bg-custom-color text-white font-bold py-4 px-6 rounded">Episode</button>
      </RouterLink>
      <br/><br/>
      <RouterLink :to="{ name: 'Location' }">
        <button class="bg-red-200 text-white font-bold py-4 px-6 rounded">Location</button>
      </RouterLink>
      <RouterLink :to="{ name: 'Character' }">
        <button class="bg-red-200 text-white font-bold py-4 px-6 rounded">Character</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      showImage: '',
      showDescription: '',
      showGenre: '',
      showCreators: '',
      showStars: '',
      showRating: '',
      characters: [],
      episodes: [],
      currentSlideIndex: 0,
    };
  },
  created() {
    this.fetchShowData();
    this.fetchEpisodes();
  },
  methods: {
    async fetchShowData() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        this.characters = response.data.results;

        if (this.characters.length > 0) {
          this.showImage = this.characters[0].image;
          this.showDescription = this.characters[0].name;
        }

        this.showGenre = 'Sci-Fi, Comedy, Animation';
        this.showCreators = 'Dan Harmon, Justin Roiland';
        this.showStars = 'Justin Roiland, Chris Parnell, Spencer Grammer';
        this.showRating = '9.2';
      } catch (error) {
        console.error('Failed to fetch show data:', error);
      }
    },
    async fetchEpisodes() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        this.episodes = response.data.results.slice(0, 6);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
      }
    },
    nextSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.characters.length;
      this.showImage = this.characters[this.currentSlideIndex].image;
      this.showDescription = this.characters[this.currentSlideIndex].name;
    },
    prevSlide() {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.characters.length) % this.characters.length;
      this.showImage = this.characters[this.currentSlideIndex].image;
      this.showDescription = this.characters[this.currentSlideIndex].name;
    },
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Puppies+Play&display=swap');
.text-color {
  margin-bottom: 40px;
  margin-top: 20px;

  font-family: "Playfair Display","Cedarville Cursive", serif;
  color:gold;
}

.carousel {
  position: relative;
}

.carousel-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.carousel-image {
  max-width: 50%;
  height: auto;
  margin-left: auto;
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
  border: none;
  padding: 10px;
  cursor: pointer;
}
.checked{
  color:orange;
}
.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.episodes {
  margin-top: 20px;
}

.episode-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.episode-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.episode-card h3 {
  margin: 0;
  font-size: 1.2em;
}

.episode-card p {
  margin: 5px 0;
}

.episode-button {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.bg-custom-color {
  background-color: #1e90ff;
}
</style>
