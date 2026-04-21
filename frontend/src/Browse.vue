<template>
  <div class="browse-container">
    <h1>Browse Movies</h1>

    <div class="movies-grid">
      <div 
         v-for="movie in movies"
          :key="movie.movie_id" 
          class="movie-card"
          @click="goToMovie(movie.movie_id)">
      

        <img 
          v-if="movie.posterUrl" 
          :src="movie.posterUrl" 
          alt="Movie Poster"
        />
        <div v-else class="no-poster">No Poster</div>

        <div v-if="error">
                {{ error }}
            </div>

        <h3>{{ movie.original_title }}</h3>
      
      </div>
    </div>
  </div>
</template>

<script>
// ❌ This file does not exist yet, so comment it out
// import { movieServices } from "../services/movie.service"
  import { coreService } from "../src/services/core.service"

  export default {
    data() {
      return {
        movies: [],
        error: "",
      }
    },
    mounted() {
      // ❌ Comment out the call that breaks the app
      // movieServices.getAllMovies()
      //   .then(res => this.movies = res)
      //   .catch(err => console.log(err))

      // ✅ Temporary placeholder so the page doesn't break
      //this.movies = []
      coreService.searchMovies()
            .then(movies => {
                this.movies = movies
                //this.loading = false
            })
            .catch(error => this.error = error)
    },
    methods: {
      goToMovie(id) {
        this.$router.push(`/movie/${id}`)
      }
    }
  }
</script>

