<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand :to="{ path: '/' }">Blih Web</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{ $store.getters["getUser"].login }}</em>
          </template>
          <b-dropdown-item @click="signOut()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <b-breadcrumb :items="bcItems"></b-breadcrumb>

    <div style="padding: 1em;">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      bcItems: []
    };
  },
  methods: {
    fillBcItems() {
      this.bcItems = this.$route.meta.breadcrumb;
    },
    signOut() {
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    }
  },
  created() {},
  mounted() {
    this.fillBcItems();
  },
  watch: {
    $route: function() {
      this.fillBcItems();
    }
  }
};
</script>

<style lang="scss"></style>
