<template>
  <div class="language" data-cy="language-selector">
    <b-row class="justify-content-center">
      <span class="mr-2 my-4">
        <strong>From:</strong>
      </span>
      <b-col class="p-0 my-3" col lg="3" md="3" sm="10" cols="9">
        <b-form-select
          class="language__selectors"
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

      <b-col class="p-0" col lg="1" md="2" sm="12" cols="12">
        <button
          @click="interchangeLanguages"
          data-cy="interchange-language-btn"
          :class="{ btnRotated: btnRotated }"
          :disabled="this.optionTo === null || this.optionFrom === null"
          class="language__interchange btn disable-btn fa fa-exchange ml-4"
          aria-hidden="true"
        ></button>
      </b-col>

      <span class="mr-2 ml-4 my-4">
        <strong>To:</strong>
      </span>
      <b-col class="p-0 my-3" col lg="3" md="3" sm="10" cols="9">
        <b-form-select
          class="language__selectors"
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
import langcodes from "./../assets/langcodes.json";

export default {
  name: "LanguageSelector",
  data() {
    return {
      languageOptions: langcodes,
      optionFrom: null,
      optionTo: null,
      btnRotated: false
    };
  },
  methods: {
    onOptionFromSelect() {
      this.$emit("onLangFromSelect", this.optionFrom);
    },
    onOptionToSelect() {
      this.$emit("onLangToSelect", this.optionTo);
    },
    interchangeLanguages() {
      this.optionFrom = [this.optionTo, (this.optionTo = this.optionFrom)][0];
      this.btnRotated = !this.btnRotated;
    }
  }
};
</script>

<style lang="scss" scoped>
.language {
  &__selectors {
    &:hover {
      cursor: pointer;
    }
  }
  &__interchange {
    background-color: rgb(204, 201, 201);
    border-radius: 50px;
    border: none;
    color: #000;
    cursor: pointer;
    padding: 10px 15px;
    margin-top: 16px;
    &:hover {
      background-color: rgb(128, 125, 125);
      transition: 0.4s background-color, 0.1s transform;
    }
    &.btnRotated {
      transform: rotate(180deg);
    }
  }
  @media only screen and (max-width: 765px) {
    &__interchange {
      margin-top: 0;
    }
  }
}
</style>
