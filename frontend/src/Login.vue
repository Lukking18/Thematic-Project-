<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="handleSubmit" class="login-form">
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
import { userServices } from "../src/services/user.service"
import EmailValidator from 'email-validator'
export default {
  data(){
    return {
      email: "",
      password: "",
      submitted:false,
      error: ""
    }
  },
  methods: {
    handleSubmit(e){
      this.submitted = true
      this.error = ""
      const {email,password} = this

      if(!(email && password)){
        return;
      }

      if(!(EmailValidator.validate(email))){
        this.error = "Email isn't valid"
        return;
      }
        const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*]{6,20}$/
      
        if(!(password_pattern.test(password))){
          this.error = "Password does not meet regex"
          return;
        }

        userServices.login(email,password)
        .then(result => {
          console.log("Success!")
          this.$router.push("/") // Choose the endpoint to actually go to Frontend team... 
        })
        .catch(error => {
          this.error = error
          this.submitted = false
        })
    }
  }
}

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

