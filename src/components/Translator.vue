<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- Input field to get a value to translate -->
    <input type="text" v-model="inputValue" :placeholder="placeholder" @keyup="translate">

    <!-- Outputs the translation results -->
    <div v-if="wordTranslated">
      {{ wordTranslated }}
    </div>

    <!-- If no translation it shows this message -->
    <div v-else>The translation results will show here!</div>

  </div>
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

</style>
