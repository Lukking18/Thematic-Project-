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
import { movieServices } from "../services/movie.service"

export default {
  data() {
    return {
      movies: []
    }
  },
  mounted() {
    movieServices.getAllMovies()
      .then(res => this.movies = res)
      .catch(err => console.log(err))
  },
  methods: {
    goToMovie(id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style>
.browse-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.movie-card {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
  border: 1px solid #ddd;
}

.movie-card:hover {
  transform: scale(1.03);
}

.movie-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 6px;
}

.no-poster {
  width: 100%;
  height: 220px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}
</style>
