<template>
  <div id="language-selector">
    <b-row class="justify-content-center">
      <span class="mx-2 my-4">
        <strong>From:</strong>
      </span>
      <b-col class="my-3 p-0" col lg="2" md="2">
        <!-- When input changes it calls related method to emit selected data. -->
        <b-form-select v-model="optionFrom" @input="onOptionFromSelect">
            <option :value="null">Select an language</option>
            <option v-for="option in languageOptions" :key="option.value" :value="option.value">{{option.text}}</option>
        </b-form-select>
      </b-col>
      <br>

      <span class="mr-2 ml-4 my-4">
        <strong>To:</strong>
      </span>
      <b-col class="my-3 p-0" col lg="2" md="2">
        <!-- When input changes it calls related method to emit selected data. -->
        <b-form-select v-model="optionTo" @input="onOptionToSelect">
            <option :value="null">Select an language</option>
            <option v-for="option in languageOptions" :key="option.value" :value="option.value">{{option.text}}</option>
        </b-form-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import axios from 'axios'
// Language pairs are fetched from json file.
import langcodes from './../assets/langcodes.json'

export default {
  name: "LanguageSelector",
  data() {
      return {
        languageOptions: langcodes,
        optionFrom: null,
        optionTo: null
      }
  },
  methods: {
      onOptionFromSelect() {
        this.$emit('onLangFromSelect', this.optionFrom)
      },
      onOptionToSelect() {
        this.$emit('onLangToSelect', this.optionTo)
      }
  }

};
</script>
<style scoped>
</style>