<template>
  <div id="language-selector">
    <b-row class="justify-content-center">
      <span class="mr-2 my-4">
        <strong>From:</strong>
      </span>
      <b-col class="my-3 p-0" col lg="3" md="3" sm="10" cols="9">
        <!-- When input changes it calls related method to emit selected data. -->
        <b-form-select v-model="optionFrom" @input="onOptionFromSelect">
            <option :value="null">Select an language</option>
            <option v-for="(option, index) in languageOptions" :key="index" :value="option">{{option.text}}</option>
        </b-form-select>
      </b-col>

      <!-- Interchanges Language Options -->
      <b-col class="p-0" col lg="1" md="2" sm="12" cols="12">
        <i  @click="interchangeLanguages" class="fa fa-exchange mt-3 ml-4 interchange-lang-btn" aria-hidden="true"></i>
      </b-col>

      <span class="mr-2 ml-4 my-4">
        <strong>To:</strong>
      </span>
      <b-col class="my-3 p-0" col lg="3" md="3" sm="10" cols="9">
        <!-- When input changes it calls related method to emit selected data. -->
        <b-form-select v-model="optionTo" @input="onOptionToSelect">
            <option :value="null">Select an language</option>
            <option v-for="(option, index) in languageOptions" :key="index" :value="option">{{option.text}}</option>
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
      },
      // Interchange Language Options
      interchangeLanguages(){
        this.optionFrom = [this.optionTo, this.optionTo = this.optionFrom][0];
      }
  }

};
</script>
<style scoped>

.interchange-lang-btn {
  background-color: rgb(216, 216, 216);
  border-radius: 8px;
  cursor: pointer;
  padding: 10px 15px;
}
@media only screen and (max-width: 765px) {
  .interchange-lang-btn {
    margin-top: 0 !important;
  }
}

</style>