<template>
  <main class="Login">
    <v-container fluid>
      <v-row>
        <div class="left col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="content">
            <div class="header flex-s-b align-center">
              <div class="logo">
                <img src="@/assets/images/pages/global/logo.png" alt="Top Doctors">
              </div>
            </div>

            <div class="body">
              <div class="title">
                <span>Login</span>
              </div>

              <form @submit.prevent="login()">
                <v-text-field
                  v-model="loginData.email"
                  label="Your Email"
                  type="email"
                  required
                  :rules="[rules.required, rules.email]"
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="loginData.password"
                  label="Your Password"
                  type="password"
                  required
                  :rules="[rules.required, rules.counter]"
                  outlined
                ></v-text-field>

                <v-btn
                  class="mr-4"
                  color="primary"
                  type="submit"
                >
                  Login
                </v-btn>
              </form>
            </div>
          </div>
        </div>
        
        <div class="right col-xl-6 col-lg-6 col-md-6 d-xl-flex d-lg-flex d-md-flex d-sm-none d-none">
          <div class="line-1">
            <div class="line-2">
              <div class="line-3">
                <img src="@/assets/images/pages/login/doctor-image.png" alt="Doctor image">
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </main>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        // Login data
        loginData: {
          email: "doctor@gmail.com",
          password: "password",
        },
        
        // Validation rules
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length >= 6 || 'Min 6 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
    },
    created() {
      // check if user token is valid
      if (localStorage.userToken) {
        this.axios
        .get(process.env.VUE_APP_API_URL + `dashboard/me`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then(() => {
          // redirect to dashboard overview
          this.$router.push({ name: 'Overview' });
        })
        .catch((error) => {
          if(error) {
            // clear localStorage
            localStorage.clear();
          }
        });
      }
    },
    methods: {
      
      // Normal login method
      login() {

        let data = new FormData();
        data.append("email", this.loginData.email);
        data.append('password', this.loginData.password);

        this.axios
        .post(process.env.VUE_APP_API_URL + `/admin/login`, data)
        .then((response) => {
          // Set user data and user token in localStorage
          // localStorage.setItem("userObject", JSON.stringify(response.data.user));
          localStorage.setItem("userToken", response.data.data.token);
          // Redirect user to dashboard overview page
          this.$router.push({ name: 'Overview' });
        })
        .catch((error) => {
          console.log(error);
          this.$snotify.error("");
        });
      },
      
      // Login with google account
      async googleLogin() {
        const googleUser = await this.$gAuth.signIn();
        let data = new FormData();
        data.append("name", googleUser.getBasicProfile().sf);
        data.append("email", googleUser.getBasicProfile().zv);
        this.axios.post(process.env.VUE_APP_API_URL + "callback/google", data).then((response) => {
          // Set user object in localStorage
          // localStorage.setItem("userObject", JSON.stringify(response.data));
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.$snotify.error("بيانات غير صحيحة");
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/pages/auth/_login.scss";
</style>