<template>
  <div class="switcher">
    <h1 class="switcher__title" data-cy="header-title">{{ title }}</h1>
    <b-form-checkbox
      class="switcher__checkbox"
      data-cy="theme-switcher"
      name="switcher"
      @change="changeThemeColor"
      switch
      v-model="checked"
    >
      <p v-if="checked">Dark-Theme</p>
      <p v-else>Light-Theme</p>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "SwitcherTheme",
  props: {
    title: {
      type: String,
      required: false,
      default: "Select Language Pair To Translate"
    }
  },
  data() {
    return {
      checked: true
    };
  },
  methods: {
    changeThemeColor() {
      const appWrapper = document.getElementById("app-wrapper");
      const currentClass = appWrapper.className;
      appWrapper.className =
        currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    }
  }
};
</script>

<style lang="scss">
.switcher {
  &__title {
    margin: 20px 0;
  }
  &__checkbox {
    display: inline-block;
    label {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
