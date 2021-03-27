<template>
  <div class="home container-fluid my-4">
    <template v-if="player.name.length">
      <m-table class="table-area"></m-table>
      <!-- <m-player class="player-area"></m-player> -->
      <m-chat class="chat-area"></m-chat>
    </template>
    <m-welcome-dialog></m-welcome-dialog>
  </div>
</template>

<script>
import MWelcomeDialog from "@/components/dialogs/MWelcomeDialog";
import MTable from "@/components/MTable";
// import MPlayer from "@/components/MPlayer";
import MChat from "@/components/MChat";

export default {
  name: "Home",
  components: {
    MWelcomeDialog,
    MTable,
    // MPlayer,
    MChat,
  },
  computed: {
    player() {
      return this.$store.state.player;
    },
  },
  mounted() {
    console.log(this.$db);

    console.log(this.$db.collection("tables"));
    this.$db
      .collection("tables")
      .doc("table1")
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.$store.dispatch("updateTable", doc.data());
      });
  },
};
</script>

<style lang="scss" scoped>
.chat-area {
  max-width: 30rem;
  margin-top: 4em;
}

.home {
  display: grid;
}
</style>
