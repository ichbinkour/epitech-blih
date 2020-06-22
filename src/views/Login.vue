<template>
  <b-container class="ic-container">
    <b-row class="justify-content-md-center">
      <b-col lg="8" md="12" align-self="center">
        <b-card header="Login" header-tag="header" footer-tag="footer">
          <b-card-text>
            <b-form @submit="logIn()">
              <b-row class="ic-padding-bottom">
                <b-col lg="8" class="ic-padding-bottom">
                  <b-form-input
                    v-model="login"
                    placeholder="Enter your login"
                  ></b-form-input>
                </b-col>
                <b-col lg="8">
                  <b-form-input
                    type="password"
                    v-model="password"
                    placeholder="Enter your password"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-button @click="logIn()" variant="primary">Login</b-button>
            </b-form>
          </b-card-text>
          <template v-slot:footer>
            <em
              >Made with ❤️ by
              <a href="https://github.com/ichbinkour" target="_blank"
                >@ichbinkour</a
              ></em
            >
          </template>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    logIn() {},
  },
};
</script>

<style lang="scss" scoped>
.ic-container {
  padding: 2em;
}
.ic-padding-bottom {
  padding-bottom: 1em;
}
</style>
