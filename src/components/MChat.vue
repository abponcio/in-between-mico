<template>
  <div class="chat-box">
    <div class="chat-header d-flex justify-content-between align-items-center">
      <h3>{{ player.name }}</h3>
      <div class="small">{{ users.length }} total</div>
    </div>
    <div class="chat-area">
      <ul class="chat-list">
        <li
          :class="chat.player.name === player.name ? 'my-chat' : 'other-chat'"
          v-for="(chat, index) in chats"
          :key="index"
        >
          <div class="chat-bubble">
            <div class="chat-name font-weight-bold">
              {{ chat.player.name }}
            </div>
            <div class="chat-message">
              {{ chat.message }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="send-message-area">
      <form @submit.prevent="sendMessage">
        <div class="form-group">
          <div class="input-group">
            <textarea
              class="form-control"
              v-model="message"
              @keydown.enter.exact.prevent
              @keyup.enter.exact="sendMessage"
              @keydown.enter.shift.exact="newline"
              resized="false"
              :disabled="loading"
            ></textarea>
            <div class="input-group-append">
              <button
                class="btn btn-secondary d-flex align-items-center"
                :disabled="loading"
              >
                Send <b-spinner class="ml-2" small v-if="loading"></b-spinner>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      loading: false,
    };
  },
  computed: {
    chats() {
      return this.$store.state.table.chats;
    },
    users() {
      return this.$store.state.table.players;
    },
    player() {
      return this.$store.state.player;
    },
  },
  methods: {
    async sendMessage() {
      this.loading = true;

      const payload = {
        player: this.player,
        message: this.message,
      };

      this.$store.dispatch("sendChat", payload);

      try {
        await this.$db
          .collection("tables")
          .doc("table1")
          .set({ chats: this.$store.state.table.chats }, { merge: true });

        this.message = "";
      } catch (ex) {
        console.error(ex);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-box {
  .chat-area {
    min-height: 20em;
    border: 1px solid #ccc;
    border-radius: 0.2em;

    .chat-list {
      margin: 0;
      padding: 0;
      list-style-type: none;

      li {
        padding: 0.5em;
        text-align: left;

        .chat-bubble {
          display: inline-block;
          background-color: #ccc;
          padding: 0.5em;
          border-radius: 0.5em;
          min-width: 10em;
        }

        &.my-chat {
          text-align: right;
          .chat-bubble {
            background-color: #007bff;
            color: #fff;
          }
        }
      }
    }
  }
  .send-message-area {
    margin-top: 0.5em;

    textarea {
      resize: none;
    }
  }
}
</style>
