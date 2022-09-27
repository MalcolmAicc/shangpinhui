<template>
  <div id="app">
    <div style="height: 141px">
      <h1>
        <router-link to="/home" class="logo">
          <img
            v-show="!$route.meta.show"
            src="./components/Header/images/logo.png"
          />
        </router-link>
        <b v-show="$route.path == '/login'"></b>
        <img
          class="register"
          v-show="$route.path == '/register'"
          src="./assets/images/register.png"
          alt=""
        />
      </h1>
      <Header v-show="$route.meta.show" />
    </div>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    this.$store.dispatch("home/categoryList");
    this.$store.dispatch("users/userInfo");

    window.onbeforeunload = function ( ) {
      var storage = window.localStorage;
      storage.clear();
    };
  },
};
</script>

<style scoped>
h1 {
  line-height: 141px;
  margin-left: 200px;
}
h1 b {
  display: block;
  width: 110px;
  height: 40px;
  position: absolute;
  background: url("https://misc.360buyimg.com/user/passport/1.0.0/css/i/l-icon.png");
  top: 30px;
  left: 330px;
}
/* .register{
  display: block;
  width: 110px;
  height: 40px;
  position: absolute;
  background-image: './assets/images/register.png' ;
  top: 30px;
  left: 330px;
} */
.register {
  position: absolute;
  top: 15px;
  left: 325px;
}
</style>
