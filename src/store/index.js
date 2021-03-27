import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const TABLE_STATUS = {
  WAIT: "waiting",
  PLAY: "playing",
};

const DEFAULT_TABLE = {
  state: TABLE_STATUS.WAIT,
  round: 0,
  currentPlayer: null,
  shuffledCards: null,
  pot: 0,
  players: [],
  chats: [],
};

const DEFAULT_PLAYER = {
  id: null,
  name: "",
  ready: false,
  onHand: null,
  money: 0,
  role: null,
};

export default new Vuex.Store({
  state: {
    player: DEFAULT_PLAYER,
    cards: Array.from({ length: 52 }, (_, i) => i + 1),
    table: DEFAULT_TABLE,
  },
  mutations: {
    setNewPlayer(state, data) {
      state.player = Object.assign(state.player, data);

      if (
        !state.table.players.some((player) => player.name === state.player.name)
      ) {
        state.table.players.push(data);
      }
    },
    sendChat(state, data) {
      state.table.chats.push(data);
    },
    updateTable(state, data) {
      state.table = Object.assign(state.table, data);
    },
  },
  actions: {
    async setNewPlayer(store, data) {
      store.commit("setNewPlayer", data);
    },
    async sendChat(store, data) {
      store.commit("sendChat", data);
    },
    async updateTable(store, data) {
      store.commit("updateTable", data);
    },
  },
  modules: {},
});
