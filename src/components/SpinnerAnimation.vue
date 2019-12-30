<template>
  <div class="spinner">
    <b-spinner
      class="spinner__animation"
      variant="success"
      label="Centered Large Spinner Text"
      type="grow"
    >
    </b-spinner>
  </div>
</template>

<script>
export default {
  name: "SpinnerAnimation"
};
</script>

<style lang="scss" scoped>
.spinner {
  margin-top: 30%;
  &__animation {
    height: 6rem;
    width: 6rem;
  }
  @media only screen and (max-width: 750px) {
    .spinner {
      margin-top: 50%;
    }
  }
}
</style>
