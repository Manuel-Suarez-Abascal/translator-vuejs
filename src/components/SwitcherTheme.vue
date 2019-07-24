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
      required: true,
      default: "Select Language Pair To Translate",
    }
  },
  data() {
    return {
      checked: true
    }
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
    margin-bottom: 20px;
  }
  &__checkbox {
    label {
      &:hover {
        cursor: pointer;
      }
    }
  }
}

/* Dark & Light mode styling */
.dark-mode {
  background-color: #111;
  color: #fff;
}

.light-mode {
  background-color: #ffff;
  color: #111;
}

.dark-mode span {
  color: #fff;
}

.dark-mode h1 {
  color: #fff;
}

.dark-mode p {
  color: #fff;
}

.light-mode h1 {
  color: #000;
}
</style>
