<template>
  <div class="single-movie-container">
    <div v-if="movie" class="movie-card">
      
      <!-- Top banner section with blurred background -->
      <div class="movie-banner" :style="{ backgroundImage: `url(${movie.posterUrl})` }">
        <div class="banner-overlay">
          <div class="banner-content">
            <div class="movie-poster">
              <img v-if="movie.posterUrl" :src="movie.posterUrl" :alt="movie.title + ' poster'" class="poster-image" />
              <div v-else class="poster-placeholder">
                <span>No Poster</span>
              </div>
            </div>
            
            <div class="movie-info-hero">
              <h2>{{ movie.title }} <span class="year">({{ movie.year }})</span></h2>
              
              <div class="metadata-row">
                <span class="rating-badge">⭐ {{ movie.rating }} / 10</span>
                <span class="duration">⏱ {{ movie.duration }} min</span>
                <span class="director">🎬 Dir: {{ movie.director }}</span>
              </div>
              
              <div class="genres">
                <span v-for="tag in movie.genre" :key="tag" class="genre-tag">{{ tag }}</span>
              </div>
              
              <div class="synopsis-box">
                <h3>Synopsis</h3>
                <p>{{ movie.synopsis }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Review section below -->
      <div class="reviews-section">
        <div class="reviews-header">
          <h3>User Reviews</h3>
          <button class="add-review-btn">
            <span>+</span> Write Review
          </button>
        </div>
        
        <div v-if="reviews.length === 0" class="no-reviews">
          <div class="empty-icon">📝</div>
          <p>No reviews yet. Be the first to share your thoughts!</p>
        </div>
        
        <div class="reviews-grid">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <div class="reviewer-profile">
                <div class="avatar">{{ review.author.charAt(0) }}</div>
                <div class="reviewer-info">
                  <h4>{{ review.author }}</h4>
                  <span class="review-date">{{ review.date }}</span>
                </div>
              </div>
              <div class="review-rating-pill">⭐ {{ review.rating }}/10</div>
            </div>
            <div class="review-body">
              <p>"{{" " + review.text + " "}}"</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    
    <div v-else class="loading-state">
      <div class="spinner"></div>
      <p>Loading cinematic experience...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleMovie',
  data() {
    return {
      // Mock data populated to represent a complete review page
      movie: {
        id: 1,
        title: 'Inception',
        year: '2010',
        director: 'Christopher Nolan',
        genre: ['Sci-Fi', 'Action', 'Thriller'],
        rating: 8.8,
        duration: 148,
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. The lines between reality and dream begin to blur as the team descends deeper into the subconscious.',
        posterUrl: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg'
      },
      reviews: [
        { 
          id: 1, 
          author: 'MovieCritic99', 
          rating: 9, 
          text: 'Absolutely fantastic! The visual effects were stunning and the plot kept me on the edge of my seat from start to finish. A true masterpiece by Nolan.',
          date: 'Oct 12, 2025'
        },
        { 
          id: 2, 
          author: 'CasualViewer', 
          rating: 7, 
          text: 'Good movie, but the pacing was a bit slow in the middle and it got slightly confusing with all the different dream layers. Still worth a watch.',
          date: 'Nov 03, 2025'
        }
      ]
    }
  },
  mounted() {
    // Note: When hooked to the backend, you would fetch real data here
    // const movieId = this.$route.params.id;
    // this.fetchMovieDetails(movieId);
    // this.fetchMovieReviews(movieId);
  }
}
</script>

<style scoped>
.single-movie-container {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.movie-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

/* Hero Banner Styles */
.movie-banner {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
}

.banner-overlay {
  background: linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 50%, rgba(15, 23, 42, 0.7) 100%);
  backdrop-filter: blur(8px);
  padding: 3rem 2.5rem;
}

.banner-content {
  display: flex;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.movie-poster {
  flex-shrink: 0;
  z-index: 2;
}

.poster-image {
  width: 240px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.1);
  transition: transform 0.3s ease;
}

.poster-image:hover {
  transform: scale(1.02);
}

.poster-placeholder {
  width: 240px;
  height: 360px;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 500;
  border: 1px dashed rgba(255,255,255,0.2);
}

.movie-info-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-info-hero h2 {
  margin: 0 0 1rem 0;
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.year {
  font-weight: 400;
  opacity: 0.85;
  font-size: 2rem;
}

.metadata-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.2rem;
  font-size: 1.05rem;
}

.rating-badge {
  background: #f59e0b;
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.3);
}

.duration, .director {
  opacity: 0.9;
  letter-spacing: 0.5px;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
}

.genre-tag {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.synopsis-box {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.2rem;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.synopsis-box h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #e2e8f0;
}

.synopsis-box p {
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
  font-size: 1rem;
}

/* Reviews Section */
.reviews-section {
  padding: 2.5rem;
  background: #f8fafc;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
}

.reviews-header h3 {
  margin: 0;
  font-size: 1.8rem;
  color: #1e293b;
}

.add-review-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
}

.add-review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.no-reviews {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  background: white;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.reviews-grid {
  display: grid;
  gap: 1.5rem;
}

.review-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s;
}

.review-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}

.reviewer-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
}

.reviewer-info h4 {
  margin: 0 0 0.2rem 0;
  color: #334155;
  font-size: 1.1rem;
}

.review-date {
  font-size: 0.85rem;
  color: #94a3b8;
}

.review-rating-pill {
  background: #fef3c7;
  color: #b45309;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.review-body {
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.6;
  font-style: italic;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .metadata-row, .genres {
    justify-content: center;
  }
  
  .synopsis-box {
    text-align: left;
  }
}
</style>
