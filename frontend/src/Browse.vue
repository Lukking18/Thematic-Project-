<template>
  <div class="browse-container">
    <h1 class="page-title">Browse Movies</h1>

    <!-- SEARCH + FILTER FORM -->
    <form class="search-form" @submit.prevent="fetchMovies">

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
          v-model="searchQuery.searchBudgetMin"
          type="number"
          placeholder="Min Budget"
          class="filter-input"
        />
        <input
          v-model="searchQuery.searchBudgetMax"
          type="number"
          placeholder="Max Budget"
          class="filter-input"
        />
      </div>

      <!-- Revenue Min/Max -->
      <div class="filter-row">
        <input
          v-model="searchQuery.searchRevenueMin"
          type="number"
          placeholder="Min Revenue"
          class="filter-input"
        />
        <input
          v-model="searchQuery.searchRevenueMax"
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
            .then(items => {
                this.items = items
                this.loading = false
            })
            .catch(error => this.error = error)
  },
/*
  methods: {
    fetchMovies() {
      this.loading = true;
      this.error = "";

      const queryString = new URLSearchParams(this.searchQuery).toString();

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
    

    formatNumber(num) {
      if (!num) return "0";
      return Number(num).toLocaleString();
    },
  },
  */
};
</script>

<style>
.browse-container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;
}

.search-input,
.filter-input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.filter-row {
  display: flex;
  gap: 10px;
}

.search-btn {
  padding: 10px;
  background: #2b6cb0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.search-btn:hover {
  background: #1e4f80;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.movie-card {
  padding: 15px;
  border-radius: 10px;
  background: #f8f8f8;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.movie-title {
  margin-bottom: 10px;
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
