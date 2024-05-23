<template>
  <div class="episode-card w-[350px] md:w-[450px] hover:cursor-pointer hover:scale[1.02] transition-all duration-300 rounded-xl bg-blue-50 h-auto p-3">
    <div class="card-content text-left p-2">
      <h2 class="text-2xl font-bold">{{ name }}</h2>
      <p>Episode: <span class="font-bold">{{ episode }}</span></p>
      <p>Air Date: <span class="font-bold">{{ air_date }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpisodeCard',
  props: {
    name: String,
    episode: String,
    air_date: String,
  },
};
</script>

<style scoped>
.episode-card {
  background-color: #ebf8ff;
  border-radius: 0.75rem;
  transition: transform 0.3s ease-in-out;
}

.episode-card:hover {
  transform: scale(1.02);
}

.card-content {
  padding: 1rem;
}

.card-content h2 {
  margin-bottom: 0.5rem;
}

.card-content p {
  margin: 0.25rem 0;
}
</style>