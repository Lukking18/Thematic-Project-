<template>
  <div class="app-container">
    <nav class="navbar">
      <h2 class="logo">My App</h2>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>

    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App"
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
  background-color: #333;
  color: white;
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

.page-content {
  padding: 20px;
}
</style>

