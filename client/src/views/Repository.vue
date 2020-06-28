<template>
  <div>
    <div v-if="repository != null">
      <h1>{{ repository.name }}</h1>
      <h4 v-if="repository.description != 'None'">
        {{ repository.description }}
      </h4>
      <p>uuid: {{ repository.uuid }}</p>
      <p>Public: {{ repository.public }}</p>
      <p>Url: {{ repository.url }}</p>
      <p>
        Creation time:
        {{ new Date(repository.creation_time) || moment("dddd, MMMM Do YYYY") }}
      </p>
    </div>

    <div>
      <p v-for="acl in acls" :key="acl.name">
        {{ acl }}
      </p>
    </div>

    <b-overlay :show="show" no-wrap></b-overlay>
  </div>
</template>

<script>
export default {
  name: "Repository",
  data() {
    return {
      show: false,
      repository: null,
      acls: null,
    };
  },
  created() {
    this.getRepository();
  },
  methods: {
    getAcls() {
      console.log(this.repository.name);
      this.axios
        .get("/repository/acls", {
          params: {
            email: this.$store.getters["getUser"].login,
            password: this.$store.getters["getUser"].password,
            repoName: this.$route.params.name,
          },
        })
        .then((response) => {
          console.log(response);
          this.acls = response.data;
          this.show = false;
        })
        .catch((e) => {
          console.log(e);
          this.show = false;
        });
    },
    getRepository() {
      this.show = true;
      this.axios
        .get("/repository", {
          params: {
            email: this.$store.getters["getUser"].login,
            password: this.$store.getters["getUser"].password,
            repoName: this.$route.params.name,
          },
        })
        .then((response) => {
          this.repository = response.data;
          this.getAcls();
        })
        .catch((e) => {
          console.log(e);
          this.show = false;
        });
    },
    deleteRepository() {
      this.axios
        .post("/repository/delete", {
          email: this.$store.getters["getUser"].login,
          password: this.$store.getters["getUser"].password,
          repoName: this.$route.params.name,
        })
        .then((response) => {
          this.$router.push("/");
          return;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
