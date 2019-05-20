<template>
  <b-container class="bv-example-row">
    <h1 class="my-4 h1">{{ msg }}</h1>

    <!-- Language Selector Dropdown -->
    <b-row class="justify-content-center">

      <span class="mx-2 my-4"><strong>From:</strong></span>
      <b-col class="my-3 p-0" col lg="2" md="2">
        <b-form-select v-model="selected1" :options="options"></b-form-select>
      </b-col>
      <br>

      <span class="mr-2 ml-4 my-4"><strong>To:</strong></span>
      <b-col class="my-3 p-0" col lg="2" md="2">
        <b-form-select v-model="selected2" :options="options"></b-form-select>
      </b-col>
    </b-row>

    <p class="text-secondary">A translation app powered by <a class="vuejs-link text-decoration-none" href="https://vuejs.org/" target="_blank"> Vuejs</a> & <a class="yandex-link text-decoration-none" href="https://tech.yandex.com/translate/" target="_blank">Yandex's API</a>. Made by <a class="color-info text-decoration-none" href="https://github.com/Manuel-Suarez-Abascal" target="_blank">Manuel Abascal.</a></p>

    <b-row>
      <b-col class="translation-container mb-3" lg="6" md="6" sm="12">
        <!-- Input field to get a value to translate -->
        <b-form-textarea class="w-100" type="text" rows="5" v-model="inputValue" :placeholder="placeholder" @keyup="translate"></b-form-textarea>
      </b-col>

      <b-col class="translated-container mb-3" lg="6" md="6" sm="12">
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
      msg: 'Select Language Pair To Translate',
      placeholder: 'Type something ...',
      wordTranslated: '',
      inputValue: '',
      
      // Language Options 1
      selected1: null,
        options: [
          { value: null, text: 'Select an option' },
          { value: 'en', text: 'English' },
          { value: 'fr', text: 'French' },
          { value: 'es', text: 'Spanish' }
        ],

        // Language Options 2
      selected2: null,
        options: [
          { value: null, text: 'Select an option' },
          { value: 'en', text: 'English' },
          { value: 'fr', text: 'French' },
          { value: 'es', text: 'Spanish' }
        ]
    }
  },
  methods: {
      // translate() method makes translate the input's value if keyboard key "Enter" is pressed
      translate(e) {
        
        // Checks if enter key has been pressed
        if( e.key == 'Enter' ){
          // Axios get() request using Yandex API
          axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?lang='+this.selected1+'-'+this.selected2+'&key=trnsl.1.1.20190518T054559Z.6098481762cecacb.6b721345d2262aa024e24b0aa7bbc42011422525&text='+this.inputValue+'&format=plain').then(response => {
          
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

</style>