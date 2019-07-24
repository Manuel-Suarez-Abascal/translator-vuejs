<template>
  <div class="switcher">
    <h1 class="switcher__title">{{ title }}</h1>
    <!-- Switcher Dark/Light Theme -->
    <b-form-checkbox
      class="switcher__checkbox"
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
    // Toggle class in app id to create dark/light theme
    changeThemeColor() {
      var body = document.getElementById("app-wrapper");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
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

/* Dark & Light mode styling */
.light-mode {
  background-color: #ffff;
    h1 {
    color: #000;
  }
}

.dark-mode {
  background-color: #111;
  h1, p, span {
    color: #fff;
  }
}
</style>
