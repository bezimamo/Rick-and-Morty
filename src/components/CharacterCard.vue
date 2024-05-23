
<template>
  <div class="character-card w-[350px] md:w-[450px] hover:cursor-pointer hover:scale[1.02] transition-all duration-300 rounded-xl bg-blue-50 h-auto p-3">
    <img :src="image" alt="Character Image" class="w-full h-auto rounded-t-xl">
    <div class="card-content text-left p-2">
      <h2 class="text-2xl font-bold">{{ name }}</h2>
      <p>Status: <span class="font-bold">{{ status }}</span></p>
      <p>Species: <span class="font-bold">{{ species }}</span></p>
      <p>Gender: <span class="font-bold">{{ gender }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    name: String,
    status: String,
    species: String,
    gender: String,
    image: String,
  },
};
</script>

<style scoped>
.character-card img {
  width: 100%;
  height: auto;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
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