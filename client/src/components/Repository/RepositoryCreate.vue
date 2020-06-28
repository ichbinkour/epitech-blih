<template>
  <div>
    <b-modal
      id="create-modal"
      title="Create a repository"
      v-model="show"
      @close="emitClosedEvent"
    >
      <b-form-group
        id="input-group-1"
        label="Repository name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          name="repoNameInput"
          v-model="repoName"
          required
          :state="validateState('repoNameInput')"
          v-validate="{ required: true }"
          data-vv-as="repository name"
          placeholder="Enter a repo name"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">{{
          veeErrors.first("repoNameInput")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <p style="font-weight: bold;">ACL</p>

      <b-button
        size="sm"
        class="form-button-modal"
        variant="success"
        @click="addAcl()"
      >
        <font-awesome-icon icon="plus" />
      </b-button>

      <b-row v-if="acls.length == 0">
        <b-col>
          <p>No rights for the repository</p>
        </b-col>
      </b-row>

      <b-row v-else v-for="acl in acls" :key="acl.id">
        <b-col md="7">
          <b-form inline>
            <b-button
              class="form-button-modal"
              variant="danger"
              size="sm"
              @click="removeAcl(acl)"
            >
              <font-awesome-icon icon="trash-alt" />
            </b-button>
            <b-form-input
              class="acl-user"
              placeholder="User"
              v-model="acl.to"
            ></b-form-input>
          </b-form>
        </b-col>

        <b-col md="5">
          <b-form-group id="acl-list">
            <b-form-checkbox-group
              value-field="item"
              text-field="name"
              v-model="acl.selected"
            >
              <b-form-checkbox
                v-for="right in acl.rights"
                :key="right.name"
                :value="right.name"
                >{{ right.name }}</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>

      <template v-slot:modal-footer>
        <div class="w-100">
          <div v-if="creationLoader">
            <b-button variant="primary" size="sm" class="float-right" disabled>
              <b-spinner small></b-spinner>
            </b-button>
          </div>
          <b-button
            v-else
            variant="primary"
            size="sm"
            class="float-right"
            @click="createRepository"
          >
            Create
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "RepositoryCreate",
  data() {
    return {
      repoName: "",
      acls: [
        {
          to: "ramassage-tek",
          id: 1,
          rights: [
            { item: "r", name: "r" },
            { item: "w", name: "w" },
            { item: "a", name: "a" },
          ],
          selected: ["r"],
        },
        {
          to: "",
          id: 2,
          rights: [
            { item: "r", name: "r" },
            { item: "w", name: "w" },
            { item: "a", name: "a" },
          ],
          selected: [],
        },
      ],
      creationLoader: false,
      show: false,
    };
  },
  methods: {
    emitClosedEvent() {
      this.repoName = "";
      this.acls = [
        {
          to: "ramassage-tek",
          id: 1,
          rights: [
            { item: "r", name: "r" },
            { item: "w", name: "w" },
            { item: "a", name: "a" },
          ],
          selected: ["r"],
        },
        {
          to: "",
          id: 2,
          rights: [
            { item: "r", name: "r" },
            { item: "w", name: "w" },
            { item: "a", name: "a" },
          ],
          selected: [],
        },
      ];
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    addAcl() {
      this.acls.push({
        to: "",
        id: new Date().getTime(),
        rights: [
          { item: "r", name: "r" },
          { item: "w", name: "w" },
          { item: "a", name: "a" },
        ],
        selected: [],
      });
    },
    removeAcl(acl) {
      this.acls = this.acls.filter((v) => {
        return v.id != acl.id;
      });
    },
    formatAcls() {
      var finalAcls = [];

      this.acls.forEach((acl) => {
        var userAcls = "";
        acl.selected.forEach((selectedAcl) => {
          userAcls += selectedAcl;
        });
        if (acl.to != "") {
          finalAcls.push({
            name: acl.to,
            acls: userAcls,
          });
        }
      });
      return finalAcls;
    },
    createRepository() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        this.creationLoader = true;
        this.axios
          .post("/repository", {
            repoName: this.repoName,
            email: this.$store.getters["getUser"].login,
            password: this.$store.getters["getUser"].password,
          })
          .then(() => {
            var acls = this.formatAcls();
            acls.forEach((elem) => {
              this.axios
                .post("/repository/acl", {
                  repoName: this.repoName,
                  email: this.$store.getters["getUser"].login,
                  password: this.$store.getters["getUser"].password,
                  acl: elem,
                })
                .then((response) => {
                  return response;
                })
                .catch((e) => {
                  return e;
                });
            });
            this.creationLoader = false;
            this.show = false;
            this.$emit("add-new-repository", this.repoName);
          })
          .catch((e) => {
            this.creationLoader = false;
            alert(e.response.data.error);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#acl-list {
  margin-top: 6px;
}
.form-button-modal {
  margin-right: 1em;
}
.acl-user {
}
</style>
