<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin" class="login-form">
      <label>Email</label>
      <input v-model="email" type="email" required />

      <label>Password</label>
      <input v-model="password" type="password" required />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";

      try {
        const res = await axios.post("http://localhost:3333/login", {
          email: this.email,
          password: this.password
        });

        // NEW CHECK — backend returns null when login fails
        if (!res.data || !res.data.session_token) {
          this.error = "Invalid email or password";
          return;
        }

        localStorage.setItem("token", res.data.session_token);
        localStorage.setItem("user_id", res.data.user_id);

        this.$router.push("/");
      } catch (err) {
        this.error = err.response?.data?.error_message || "Login failed";
      }
    }
  }
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.error {
  color: red;
}
</style>

