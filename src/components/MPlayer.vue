<template>
  <div class="card-area">
    <div class="d-flex align-items-center">
      <div class="player-info">
        {{ player.name }}
        PHP {{ numeral(player.money).format("0,0.00") }}
      </div>
      <div class="actions ml-4 d-flex">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Bet" />
          <div class="input-group-append">
            <button class="btn btn-primary">Bet</button>
          </div>
        </div>
        <div class="ml-2">
          <button class="btn btn-secondary">Fold</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    player() {
      return this.$store.state.player;
    },
  },
};
</script>
