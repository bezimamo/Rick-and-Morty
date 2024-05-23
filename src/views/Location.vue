<template>
    <div class="location">
    <nav class="w-full p-2 flex justify-center items-center border-b m-3 border-[rgb(17,176,200)]">
        
        <img src="/image.png" alt="" class=""> 
    
    </nav>
    <section class="flex justify-center items-center flex-wrap p-3 gap-5">
   <div v-for="i in carddata" :key="i.id">
    <Card
     :name="i.name" 
    :type="i.type" 
    :dimensions="i.dimension"
     :residents="i.residents.length"
     />
   </div>
    </section>
    </div>
    </template>
    
    <script>
    import  axios from 'axios'
    import Card from '@/components/Card.vue'
    export default {
        name:'LocationView',
        components: {
            Card,
        },
        data() {
            return {
                carddata: []
            };
        },
        created() {
            this.load();
        },
        methods: {
           async load() {
               const data = await axios.get("https://rickandmortyapi.com/api/location");
            this.carddata = data.data.results;
            },
        },
    };
    </script>
    