<template>
  <div id="language-selector">
    <b-row class="justify-content-center">
      <span class="mr-2 my-4">
        <strong>From:</strong>
      </span>
      <b-col class="my-3 p-0" col lg="3" md="3" sm="10" cols="9">
        <!-- When input changes it calls related method to emit selected data. -->
        <b-form-select
          class="language-selectors"
          v-model="optionFrom"
          @input="onOptionFromSelect"
          aria-label="Language to translate"
        >
          <option :value="null">Select an language</option>
          <option
            v-for="(option, index) in languageOptions"
            :key="index"
            :value="option"
            >{{ option.text }}</option
          >
        </b-form-select>
      </b-col>

      <!-- Interchanges Language Options -->
      <b-col class="p-0 " col lg="1" md="2" sm="12" cols="12">
        <button
          @click="interchangeLanguages"
          :class="{ rotated: rotated }"
          :disabled="this.optionTo === null || this.optionFrom === null"
          class="fa fa-exchange mt-3 ml-4 interchange-lang-btn btn disable-btn"
          aria-hidden="true"
        ></button>
      </b-col>

      <span class="mr-2 ml-4 my-4">
        <strong>To:</strong>
      </span>
      <b-col class="my-3 p-0" col lg="3" md="3" sm="10" cols="9">
        <!-- When input changes it calls related method to emit selected data. -->
        <b-form-select
          class="language-selectors"
          v-model="optionTo"
          @input="onOptionToSelect"
          aria-label="Output text translated"
        >
          <option :value="null">Select an language</option>
          <option
            v-for="(option, index) in languageOptions"
            :key="index"
            :value="option"
            >{{ option.text }}</option
          >
        </b-form-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// Language pairs are fetched from json file.
import langcodes from "./../assets/langcodes.json";

export default {
  name: "LanguageSelector",
  data() {
    return {
      languageOptions: langcodes,
      optionFrom: null,
      optionTo: null,
      rotated: false
    };
  },
  methods: {
    onOptionFromSelect() {
      this.$emit("onLangFromSelect", this.optionFrom);
    },
    onOptionToSelect() {
      this.$emit("onLangToSelect", this.optionTo);
    },
    // Interchange Language Options
    interchangeLanguages() {
      this.optionFrom = [this.optionTo, (this.optionTo = this.optionFrom)][0];
      // Remove rotated class name
      this.rotated = !this.rotated;
    }
  }
};
</script>
<style scoped>
.language-selectors:hover {
  cursor: pointer;
}
.interchange-lang-btn {
  background-color: rgb(204, 201, 201);
  border-radius: 50px;
  border: none;
  color: #000;
  cursor: pointer;
  padding: 10px 15px;
}

.interchange-lang-btn:hover {
  background-color: rgb(128, 125, 125);
  transition: 0.4s background-color, 0.1s transform;
}

.interchange-lang-btn.rotated {
  transform: rotate(180deg);
}

@media only screen and (max-width: 765px) {
  .interchange-lang-btn {
    margin-top: 0 !important;
  }
}
</style>
