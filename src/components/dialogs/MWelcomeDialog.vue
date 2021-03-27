<template>
  <b-modal
    v-model="nameModalShow"
    centered
    title="Welcome What's your name"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <m-loader :show="loading" no-wrap fixed z-index="1100"></m-loader>
    <form ref="welcomeForm" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="nameState"
      >
        <b-form-input
          id="name-input"
          v-model="name"
          :state="nameState"
          required
        ></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "MWelcomeDialog",
  data() {
    return {
      name: "",
      nameState: null,
      nameModalShow: true,
      loading: false,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.welcomeForm.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      this.loading = true;
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      // Hide the modal manually
      await this.$nextTick(() => {});

      this.$store.dispatch("setNewPlayer", {
        name: this.name,
        money: 1000,
      });

      try {
        await this.$db
          .collection("tables")
          .doc("table1")
          .set({ players: this.$store.state.table.players }, { merge: true });

        this.nameModalShow = false;
      } catch (ex) {
        console.error(ex);
      } finally {
        this.loading = false;
        this.resetModal();
      }
    },
  },
};
</script>
