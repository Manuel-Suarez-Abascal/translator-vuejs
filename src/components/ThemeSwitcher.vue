<template>
    <div>
        <!-- Theme Dark/Light Switcher -->
        <b-form-checkbox v-model="checked" name="check-button" @change="changeThemeColor" switch>
            <p v-if="checked">Dark-Theme</p>
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

.dark-mode span {
    color: #fff;
}

.dark-mode h1 {
    color: #fff;
}

.dark-mode p {
    color: #fff;
}

.light-mode h1{
    color: #000;
}

</style>
