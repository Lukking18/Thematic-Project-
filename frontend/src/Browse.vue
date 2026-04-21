<template>
  <div class="browse-container">
    <h1>Browse Movies</h1>

    <div class="movies-grid">
      <div 
        v-for="movie in movies" 
        :key="movie.id" 
        class="movie-card"
        @click="goToMovie(movie.id)"
      >
        <img 
          v-if="movie.posterUrl" 
          :src="movie.posterUrl" 
          alt="Movie Poster"
        />
        <div v-else class="no-poster">No Poster</div>

        <h3>{{ movie.title }}</h3>
        <p>{{ movie.year }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// ❌ This file does not exist yet, so comment it out
// import { movieServices } from "../services/movie.service"

export default {
  data() {
    return {
      movies: []
    }
  },
  mounted() {
    // ❌ Comment out the call that breaks the app
    // movieServices.getAllMovies()
    //   .then(res => this.movies = res)
    //   .catch(err => console.log(err))

    // ✅ Temporary placeholder so the page doesn't break
    this.movies = []
  },
  methods: {
    goToMovie(id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

