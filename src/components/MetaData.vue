<template>
  <div class="link" data-cy="meta-data">
    <p class="text-secondary">
      A translation app powered by
      <a
        class="link__vue font-weight-bold text-decoration-none"
        data-cy="meta-data-link-vue"
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener"
      >
        Vuejs</a
      >,
      <a
        class="link__yandex font-weight-bold text-decoration-none"
        data-cy="meta-data-link-yandex"
        href="https://tech.yandex.com/translate/"
        target="_blank"
        rel="noopener"
        >Yandex API</a
      >
      &
      <a
        class="link__responsivevoice font-weight-bold text-decoration-none"
        data-cy="meta-data-link-responsivevoice"
        href="https://responsivevoice.org/"
        target="_blank"
        rel="noopener"
        >ResponsiveVoice.js API</a
      >. Made with &#10084;&#65039; by
      <a
        class="link__github font-weight-bold text-decoration-none"
        data-cy="meta-data-link-github"
        href="https://github.com/Manuel-Suarez-Abascal"
        target="_blank"
        rel="noopener"
        >Manuel Abascal.</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "MetaData"
};
</script>

<style lang="scss" scoped>
.link {
  &__vue {
    color: #4fc08d;
    &:hover {
      color: #0d9155;
    }
  }
  &__yandex {
    color: #e61400;
    &:hover {
      color: #9e1104;
    }
  }
  &__responsivevoice {
    color: #f37548;
    &:hover {
      color: #f74809;
    }
  }
}
</style>
