<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="list in floorList" :key="list.id" :listProps="list"/>
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

import {mapState} from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch("home/getFloorList");
    // this.$store.dispatch("users/userInfo")
  },
  computed:{
    ...mapState("home",['floorList'])
  },
};
</script>

<style>
</style>