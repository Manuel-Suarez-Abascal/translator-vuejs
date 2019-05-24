<template>
  <b-container class="bv-example-row">
    <h1 class="my-4 h1">{{ msg }}</h1>
    <!-- Theme Color Switcher Component -->
    <theme-switcher></theme-switcher>
    <!-- Language Selector Dropdown -->
    <language-selector @onLangFromSelect="updatePairFrom" @onLangToSelect="updatePairTo"></language-selector>

    <p class="text-secondary">A translation app powered by <a class="vuejs-link text-decoration-none" href="https://vuejs.org/" target="_blank"> Vuejs</a> & <a class="yandex-link text-decoration-none" href="https://tech.yandex.com/translate/" target="_blank">Yandex's API</a>. Made by <a class="color-info text-decoration-none" href="https://github.com/Manuel-Suarez-Abascal" target="_blank">Manuel Abascal.</a></p>

    <b-row>
      <b-col class="translation-container mb-3" lg="6" md="6" sm="12">
        <!-- Input field to get a value to translate -->
        <b-form-textarea class="w-100" type="text" rows="5" v-model="inputValue" :placeholder="placeholder" @keyup="translate"></b-form-textarea>
      </b-col>

      <b-col class="translated-container mb-3" lg="6" md="6" sm="12">
        <!-- Outputs the translation results -->
        <b-form-textarea id="translation-result" class="w-100" rows="5" v-if="wordTranslated" :value="wordTranslated"></b-form-textarea>

        <!-- If no translation it shows this message -->
        <b-form-textarea class="w-100" rows="5" placeholder="The translation results will show here!" v-else></b-form-textarea>
      </b-col>
    </b-row>

      <!-- Button to copy translated content using clipboard.js -->
      <b-button id="copyBtn" class="my-4" :data-clipboard-text="this.wordTranslated" variant="outline-success">Copy to Clipboard</b-button>

      <!-- Tooltip will show only when text is translated & button clicked -->
      <b-tooltip v-if="this.wordTranslated" triggers="click" target="copyBtn" placement="right">
        <strong>Text Copied</strong>
      </b-tooltip>
  </b-container>
</template>

<script>

// Import axios to the component
import axios from 'axios';
// Import language selector component
import LanguageSelector from './LanguageSelector'
// Import theme switcher component
import ThemeSwitcher from './ThemeSwitcher'


export default {
  name: "Translator",
  data() {
    return {
      msg: 'Select Language Pair To Translate',
      placeholder: 'Type something ...',
      wordTranslated: '',
      inputValue: '',
      // from and to values are changed when LanguageSelector emits language codes.
      languageFrom: null,
      languageTo: null
    }
  },
  mounted(){
    //Calls button to copy translation with clipboard.js
    new ClipboardJS('.btn');
  },
  methods: {
      // translate() method makes translate the input's value if keyboard key "Enter" is pressed
      translate(e) {
        
        // Checks if enter key has been pressed
        if( e.key == 'Enter' ){
          // Axios get() request using Yandex API
          axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?lang='+this.languageFrom+'-'+this.languageTo+'&key=trnsl.1.1.20190518T054559Z.6098481762cecacb.6b721345d2262aa024e24b0aa7bbc42011422525&text='+this.inputValue+'&format=plain').then(response => {
          
          // Stores input value translation into translated result
          this.wordTranslated = response.data.text[0]
          
          // Resets input field
          this.inputValue = ''
        }) 
      }
    },

    // It works when 'from' option is selected.
    updatePairFrom(val) {
      this.languageFrom = val;
    },

    // It works when 'to' option is selected.
    updatePairTo(val) {
      this.languageTo = val;
    },
  },
  components: {
    LanguageSelector,
    ThemeSwitcher
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  color: #000;
}
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