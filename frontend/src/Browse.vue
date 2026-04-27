<template>
  <div class="browse-container">
    <h1 class="page-title">Browse Movies</h1>

    <!-- SEARCH + FILTER FORM -->
    <form class="search-form" @submit.prevent="searchMovies">

      <!-- Search Text -->
      <input
        v-model="searchQuery.searchText"
        type="text"
        placeholder="Search movies, actors, directors, genres..."
        class="search-input"
      />

      <!-- Release Date -->
      <input
        v-model="searchQuery.searchReleaseDate"
        type="text"
        placeholder="Release year (e.g. 1999)"
        class="filter-input"
      />

      <!-- Budget Min/Max -->
      <div class="filter-row">
        <input
          v-model.number="searchQuery.searchBudgetMin"
          type="number"
          placeholder="Min Budget"
          class="filter-input"
        />
        <input
          v-model.number="searchQuery.searchBudgetMax"
          type="number"
          placeholder="Max Budget"
          class="filter-input"
        />
      </div>

      <!-- Revenue Min/Max -->
      <div class="filter-row">
        <input
          v-model.number="searchQuery.searchRevenueMin"
          type="number"
          placeholder="Min Revenue"
          class="filter-input"
        />
        <input
          v-model.number="searchQuery.searchRevenueMax"
          type="number"
          placeholder="Max Revenue"
          class="filter-input"
        />
      </div>

      <button class="search-btn">Search</button>
    </form>

    <!-- LOADING -->
    <em v-if="loading" class="loading">Loading movies...</em>

    <!-- ERROR -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- MOVIE GRID -->
    <div v-if="movies.length" class="movies-grid">
      <div
        v-for="movie in movies"
        :key="movie.movie_id"
        class="movie-card"
      >
        <router-link :to="'/movie/' + movie.movie_id">
          <h2 class="movie-title">{{ movie.title }}</h2>
        </router-link>

        <p><strong>Release:</strong> {{ movie.release_date }}</p>
        <p><strong>Budget:</strong> ${{ formatNumber(movie.budget) }}</p>
        <p><strong>Revenue:</strong> ${{ formatNumber(movie.revenue) }}</p>

        <p><strong>Genres:</strong> {{ movie.genres }}</p>
        <p><strong>Actors:</strong> {{ movie.actors }}</p>
        <p><strong>Director:</strong> {{ movie.director_name }}</p>
      </div>
    </div>

    <!-- NO RESULTS -->
    <p v-if="!loading && movies.length === 0" class="no-results">
      No movies found.
    </p>
  </div>
</template>

<script>
import { coreService } from "../src/services/core.service";

export default {
  data() {
    return {
      movies: [],
      error: "",
      loading: false,
      searchQuery: {
        searchText: "",
        searchReleaseDate: "",
        searchBudgetMin: null,
        searchBudgetMax: null,
        searchRevenueMin: null,
        searchRevenueMax: null,
      },
    };
  },

  mounted() {
    //this.fetchMovies();
    coreService.searchMovies(this.searchQuery)
            .then(movies => {
                this.movies = movies
                this.loading = false
            })
            .catch(error => this.error = error)
  },

  methods: {
    async searchMovies() {
      this.loading = true;
      this.error = "";

      try {
        const movies = await coreService.searchMovies(this.searchQuery);
        this.movies = movies;
      } catch (err) {
        this.error = "Failed to load movies";
      } finally {
        this.loading = false;
      }
    },

      //const queryString = new URLSearchParams(this.searchQuery).toString();
/*
      fetch(`http://localhost:3333/search?${queryString}`)
        .then((res) => res.json())
        .then((data) => {
          this.movies = data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = "Failed to load movies";
          this.loading = false;
        });
    },
    */

    formatNumber(num) {
      if (!num) return "0";
      return Number(num).toLocaleString();
    },
  },
};
</script>

<style>
body {
  background-color: #0f1f3d;
}

.browse-container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  min-height: 100vh;
  color: white;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
}

.search-form {
  background: #162b4f;
  padding: 22px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
   display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto 35px auto;
}

.search-input,
.filter-input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
}

.filter-input {
  width: 100%;
  box-sizing: border-box;
}

.filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.search-btn {
  padding: 12px;
  background: #2b6cb0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.search-btn:hover {
  background: #3b82f6;
  font-weight: bold;
  border-radius: 8px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.movie-card {
  background: #162b4f;
  color: white;
  border: 1px solid #29466f;
  padding: 20px;
  border-radius: 12px;
}

.movie-title {
  color: #93c5fd;
}

.loading {
  font-style: italic;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
}
</style>