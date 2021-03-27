<template>
  <b-overlay
    :show="show"
    spinner-variant="primary"
    spinner-type="grow"
    spinner-small
    rounded="sm"
    :fixed="fixed"
    :no-wrap="noWrap"
  >
    <slot></slot>
  </b-overlay>
</template>

<script>
export default {
  name: "MLoader",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    noWrap: {
      default: false,
      type: Boolean,
    },
    fixed: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
