<template>
  <div class="app-container">
    <nav class="navbar">
      <h2 class="logo">MovieBox</h2>

      <ul class="nav-links">
        <li><router-link to="/browse">Home</router-link></li>

        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/signup">Sign Up</router-link></li>

        <li v-if="isLoggedIn">
          <button class="logout-btn" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>

    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MOVIE APP",

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("session_token");
    }
  },

  methods: {
    async logout() {
  const token = localStorage.getItem("session_token");

  try {
    await axios.post(
      "http://localhost:3333/logout",
      {},
      { headers: { "X-Authorization": token } }
    );
  } catch (err) {
    console.log("Logout error:", err);
  }

  // Clear everything
  localStorage.removeItem("session_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");

  // Force Vue to re-render the navbar
  this.$forceUpdate();

  // Redirect AFTER re-render
  this.$router.push("/login");
}
  }
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: #0f1f3d;
  color: white;
  border-radius: 16px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

.logout-btn {
  background: transparent;
  border: 1px solid white;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.page-content {
  padding: 20px;
}
</style>


