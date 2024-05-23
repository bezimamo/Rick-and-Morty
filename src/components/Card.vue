<template>
    <div class="card">
      <h3>{{ name }}</h3>
      <p>Type: {{ type }}</p>
      <p>Dimension: {{ dimension }}</p>
      <p>Residents: {{ residents }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
    props: {
      name: String,
      type: String,
      dimension: String,
      residents: Number,
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
  }
  </style>