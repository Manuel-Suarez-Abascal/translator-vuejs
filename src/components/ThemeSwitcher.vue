<template>
    <div>
        <!-- Theme Dark/Light Switcher -->
        <b-form-checkbox v-model="checked" name="check-button" @change="changeThemeColor" switch>
            <p v-if="checked" class="text-dark">Dark-Theme</p>
            <p v-else>Light-Theme</p>
        </b-form-checkbox>
    </div>
</template>

<script>
export default {
    name: "ThemeSwitcher",
    data() {
        return {
            checked: true
        }
    },
    // Toggle class in app id to create dark/light theme
    methods: {
        changeThemeColor(){
            var body = document.getElementById("app");
            var currentClass = body.className;
            body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
        }
    }
}
</script>

<style>
/* Dark & Light mode styling */
.dark-mode {
  background-color: #111;
  color: #fff; 
}

.light-mode {
  background-color: #ffff;
  color: #111; 
}

.dark-mode h1, p, span {
    color: #fff;
}

</style>
