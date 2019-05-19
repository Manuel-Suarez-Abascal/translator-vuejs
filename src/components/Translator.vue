<template>
  <b-container class="bv-example-row">
    <h1 class="mb-4">{{ msg }}</h1>
    <p class="text-secondary">A translation app powered by <a class="vuejs-link text-decoration-none" href="https://vuejs.org/" target="_blank"> Vuejs</a> & <a class="yandex-link text-decoration-none" href="https://tech.yandex.com/translate/" target="_blank">Yandex's API</a>. Made by <a class="color-info text-decoration-none" href="https://github.com/Manuel-Suarez-Abascal" target="_blank">Manuel Abascal.</a></p>
    <b-row>
      <b-col class="translation-container" lg="6" md="6" sm="12">
        <!-- Input field to get a value to translate -->
        <b-form-textarea class="w-100" type="text" rows="5" v-model="inputValue" :placeholder="placeholder" @keyup="translate"></b-form-textarea>
      </b-col>

      <b-col class="translated-container" lg="6" md="6" sm="12">
        <!-- Outputs the translation results -->
        <b-form-textarea class="w-100" rows="5" v-if="wordTranslated" :value="wordTranslated"></b-form-textarea>

        <!-- If no translation it shows this message -->
        <b-form-textarea class="w-100" rows="5" placeholder="The translation results will show here!" v-else></b-form-textarea>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

// Import axios to the component
import axios from 'axios';

export default {
  name: "Translator",
  data() {
    return {
      msg: 'Translate from English to Spanish',
      placeholder: 'Type something ...',
      wordTranslated: '',
      inputValue: ''
    }
  },
  methods: {
      // translate() method makes translate the input's value if keyboard key "Enter" is pressed
      translate(e) {
        // Checks if enter key has been pressed
        if( e.key == 'Enter' ){
          
          // Axios get() request using Yandex API
          axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-es&key=trnsl.1.1.20190518T054559Z.6098481762cecacb.6b721345d2262aa024e24b0aa7bbc42011422525&text='+this.inputValue+'&lang=en-es&format=plain').then(response => {
          
          // Stores input value translation into translated result
          this.wordTranslated = response.data.text[0]
          
          // Resets input field
          this.inputValue = ''
        }) 
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

/* Links styling */
.vuejs-link {
  color: #4fc08d;
}

.vuejs-link:hover {
  color: #0d9155;
}

.yandex-link {
  color: #e61400;
}

.yandex-link:hover {
  color: #9e1104;
}

/* Adds margin bottom to translation textarea on mobile version */
@media only screen and (max-width: 700px) {
  .translation-container, .translated-container {
    margin-bottom: 25px;
  }
}
</style>