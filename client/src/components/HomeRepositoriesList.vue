<template>
  <div>
    <b-row style="padding-bottom: 1em;" class="justify-content-md-center">
      <b-col md="8">
        <b-row>
          <b-col md="4" cols="8">
            <b-form-input
              size="md"
              placeholder="Search"
              v-model="search"
            ></b-form-input>
          </b-col>
          <b-col md="4" cols="2">
            <b-button
              v-b-modal.create-modal
              variant="success"
              style="font-weight: bold;"
              >Create</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-md-center">
      <b-col md="8">
        <b-list-group v-if="repositories != null">
          <b-list-group-item
            v-for="repo in searchedRepositories"
            :key="repo.name"
            class="d-flex justify-content-between align-items-center"
            style="height: 3.5em;"
            @mouseover="hoveredItem = repo.name"
            @mouseleave="hoveredItem = null"
          >
            {{ repo.name }}
            <div style="float: right;">
              <b-button
                class="form-button-modal"
                style="margin-right: .5em;"
                size="sm"
                :to="{ name: 'repository', params: { name: repo.name } }"
                v-if="hoveredItem == repo.name && isRepoDeleteLoading == false"
              >
                <font-awesome-icon icon="pen" />
              </b-button>
              <b-button
                class="form-button-modal"
                variant="danger"
                size="sm"
                @click="removeRepo(repo.name)"
                v-if="hoveredItem == repo.name && isRepoDeleteLoading == false"
              >
                <font-awesome-icon icon="trash-alt" />
              </b-button>

              <b-button
                v-if="deletingRepo == repo.name && isRepoDeleteLoading"
                variant="danger"
                size="sm"
                class="float-right"
                disabled
              >
                <b-spinner small></b-spinner>
              </b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>

    <repository-create
      @add-new-repository="updateRepositoriesList"
    ></repository-create>

    <b-overlay :show="show" no-wrap></b-overlay>
  </div>
</template>

<script>
import RepositoryCreate from "./Repository/RepositoryCreate";

export default {
  name: "HomeRepositoriesList",
  components: {
    RepositoryCreate,
  },
  data() {
    return {
      hoveredItem: null,
      repositories: null,
      search: null,
      searchedRepositories: null,
      show: true,
      isRepoDeleteLoading: false,
      deletingRepo: null,
    };
  },
  methods: {
    updateRepositoriesList(event) {
      this.repositories.push({ name: event });
      this.searchedRepositories = this.repositories;
    },
    removeRepo(repo) {
      this.isRepoDeleteLoading = true;
      this.deletingRepo = repo;
      this.axios
        .post("/repository/delete", {
          email: this.$store.getters["getUser"].login,
          password: this.$store.getters["getUser"].password,
          repoName: repo,
        })
        .then(() => {
          this.deletingRepo = null;
          this.isRepoDeleteLoading = false;
          this.repositories = this.repositories.filter((v) => {
            return v.name != repo;
          });
          this.filterRepositories();
        })
        .catch((e) => {
          console.log(e);
          this.deletingRepo = null;
          this.isRepoDeleteLoading = false;
        });
    },
    signOut() {
      this.$store.dispatch("setUser", null);
      this.$router.push("login");
    },
    getRepositories() {
      this.axios
        .get("/repositories", {
          params: {
            email: this.$store.getters["getUser"].login,
            password: this.$store.getters["getUser"].password,
          },
        })
        .then((response) => {
          this.show = false;
          this.repositories = response.data;
          this.searchedRepositories = response.data;
        })
        .catch((e) => {
          console.log(e);
          this.show = false;
        });
    },
    filterRepositories() {
      this.searchedRepositories = this.repositories.filter((v) => {
        if (v.name.substring(0, this.search.length) == this.search) {
          return v;
        }
      });
    },
  },
  created() {
    this.getRepositories();
  },
  watch: {
    search() {
      this.filterRepositories();
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  font-weight: bold !important;
}
</style>
