<template>
  <div>
    <h1>Sign Up</h1>
    <p>Create your account below.</p>

    <form @submit.prevent="handleSignUp" class="signup-form">
      <label>First Name</label>
      <input v-model="first_name" type="text" required />

      <label>Last Name</label>
      <input v-model="last_name" type="text" required />

      <label>Email</label>
      <input v-model="email" type="email" required />

      <label>Password</label>
      <input v-model="password" type="password" required />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Create Account</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUpPage",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleSignUp() {
      this.error = "";

      try {
        const res = await axios.post("http://localhost:3333/users", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        });

        console.log("Account created:", res.data);

        localStorage.setItem("signup_email", this.email);
        localStorage.setItem("signup_password", this.password);

        this.$router.push("/login");
      } catch (err) {
        this.error = err.response?.data?.error_message || "Something went wrong";
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 40px auto;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.error {
  color: red;
}
</style>
