import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import EpisodePage from '../views/EpisodePage.vue'
import Location from '../views/Location.vue'
import Character from '@/views/Character.vue'; // Import Character component


const routes =[
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  
  {
    path: '/episodepage',
    name: 'EpisodePage',
    component: EpisodePage
    }, 
  
    {
      path: '/location',
      name: 'Location',
      component: Location
      } ,
      { path: '/character',
       name: 'Character',
        component: Character
       } // Add Character route
 
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
   
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
     // component: () => import('../views/EpisodePage.vue')
    
})

export default router
