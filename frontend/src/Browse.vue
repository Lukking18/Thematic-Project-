<template>
  <div > <!--class="browse-container"-->
    <h1>Browse Movies</h1>

    <div > <!--class="movies-grid"-->
      <em v-if="loading">Loading movies...</em>

        <ul v-if="movies.length">
                <li v-for="movie in movies" :key="movie.movie_id">
                  <h3>{{ movie.title }}</h3>
                </li>
            </ul>

            <div v-if="error">
                {{ error }}
            </div>

      <!--</ul>
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

        -->

        
      
      
    </div>
  </div>
</template>

<script>
// ❌ This file does not exist yet, so comment it out
// import { movieServices } from "../services/movie.service"
  import { coreService } from "../src/services/core.service"
  //import { userService } from "../src/services/user.service"

  export default {
    data() {
      return {
        movies: [],
        error: "",
        loading: true,
        searchQuery: {
        searchText: '',
        searchReleaseDate: null,
        searchBudgetMin: null,
        searchBudgetMax: null ,
        searchRevenueMin: null,
        searchRevenueMax: null,
      },
      }
    },
    mounted() {
      // ❌ Comment out the call that breaks the app
      // movieServices.getAllMovies()
      //   .then(res => this.movies = res)
      //   .catch(err => console.log(err))

      // ✅ Temporary placeholder so the page doesn't break
      //this.movies = []
      coreService.searchMovies(this.searchQuery)
            .then(movies => {
                this.movies = movies
                this.loading = false
            })
            .catch(error => this.error = error)
    }
    /*methods: {
      goToMovie(id) {
        this.$router.push(`/movie/${id}`)
      }
    }
    */
  }
</script>