<template>
  <b-container class="bv-example-row">
    <!-- Preloader Spinner Animation while loading = true -->
    <div class="spinner-container" v-if="loading">
      <b-spinner
        variant="success"
        style="width: 6rem; height: 6rem;"
        label="Text Centered Large Spinner"
        type="grow">
      </b-spinner>
    </div>

    <div v-else>
      <img class="mt-2" alt="Vue logo" src="../assets/logo.png" />
      <h1 class="my-4 h1">{{ msg }}</h1>

      <!-- Theme Color Switcher Component -->
      <SwitcherTheme />

      <!-- Language Selector Dropdown -->
      <language-selector
        @onLangFromSelect="updatePairFrom"
        @onLangToSelect="updatePairTo"
      ></language-selector>

      <p class="text-secondary">
        A translation app powered by
        <a
          class="vuejs-link text-decoration-none"
          href="https://vuejs.org/"
          target="_blank"
          rel="noopener"
        >
          Vuejs</a
        >,
        <a
          class="yandex-link text-decoration-none"
          href="https://tech.yandex.com/translate/"
          target="_blank"
          rel="noopener"
          >Yandex API</a
        >
        &
        <a
          class="responsive-voice-link text-decoration-none"
          href="https://responsivevoice.org/"
          target="_blank"
          rel="noopener"
          >ResponsiveVoice.js API</a
        >. Made with &#10084;&#65039; by
        <a
          class="github-profile-link color-info text-decoration-none"
          href="https://github.com/Manuel-Suarez-Abascal"
          target="_blank"
          rel="noopener"
          >Manuel Abascal.</a
        >
      </p>

      <b-row>
        <b-col class=" mb-3" lg="6" md="6" sm="12">
          <!-- Input field to get a value to translate -->
          <b-form-textarea
            class="w-100 textarea-container"
            type="text"
            rows="9"
            v-model="inputValue"
            :placeholder="placeholder"
            @keyup="translate"
            aria-label="Original text to be translated"
          >
          </b-form-textarea>

          <!-- Clear Text Button Component-->
          <div v-show="this.inputValue">
            <ButtonClear @clearText="clearTextValue" />
          </div>

          <!-- Button to copy source text -->
          <b-button
          id="copyBtn"
          class="disable-btn textarea-buttons source-text-btn p-2 bg-white"
          :disabled="!this.inputValue"
          :data-clipboard-text="this.inputValue"
          @click="showTooltipSourceText = true"> 
            <i class="fas fa-copy"></i>
        </b-button>

        <!-- Tooltip will show only when source text is available & button clicked -->
        <b-tooltip
          triggers="click"
          :show.sync="showTooltipSourceText"
          @shown="hideTooltipLater"
          target="copyBtn"
          placement="left">
          <strong>Text Copied</strong>
        </b-tooltip>

        </b-col>

        <b-col class="translated-container mb-3" lg="6" md="6" sm="12">
          <!-- Outputs the translation results -->
          <b-form-textarea
            id="translation-result"
            class="w-100 textarea-container"
            rows="9"
            v-if="wordTranslated"
            :value="wordTranslated"
          >
          </b-form-textarea>
          
          <!-- If no translation it shows this message -->
          <b-form-textarea
            class="w-100"
            rows="9"
            placeholder="The translation results will show here!"
            aria-label="Text already translated"
            v-else
          ></b-form-textarea>
          <!-- Button to copy translated content using clipboard.js -->
          <b-button
            id="copyBtn2"
            class="disable-btn textarea-buttons translation-text-btn p-2 bg-white"
            :disabled="!this.wordTranslated"
            :data-clipboard-text="this.wordTranslated"
            @click="showTooltipTranslatedText = true"
            ><i class="fas fa-copy"></i>
          </b-button>

          <!-- Tooltip will show only when translated text is available & button clicked -->
          <b-tooltip
            triggers="click"
            :show.sync="showTooltipTranslatedText"
            @shown="hideTooltipLater"
            target="copyBtn2"
            placement="left">
            <strong>Text Copied</strong>
          </b-tooltip>

          <!-- Text to Speech Audio button -->
          <b-button
            class="disable-btn p-2 border-0 textarea-buttons"
            @click="responseSpeak"
            :disabled="!this.wordTranslated"
            ><i class="fas fa-microphone"></i></b-button
          >

        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
// Imports axios to the component
import axios from "axios";
// Imports language selector component
import LanguageSelector from "./LanguageSelector";
// Imports ButtonClear component
import ButtonClear from "./ButtonClear";
// Imports theme switcher component
import SwitcherTheme from "./SwitcherTheme";
// Imports clipboard.js
import ClipboardJS from "clipboard";

export default {
  name: "Translator",
  // Imported components
  components: {
    LanguageSelector,
    SwitcherTheme,
    ButtonClear
  },
  data() {
    return {
      placeholder: "Type something ...",
      wordTranslated: "",
      inputValue: "",
      // from and to values are changed when LanguageSelector emits language codes.
      languageFrom: null,
      languageTo: null,
      // language voice value
      languageTitle: null,
      // Loading = true to show Preloader Spinner Animation
      loading: true,
      // Tooltip
      showTooltipSourceText: false,
      showTooltipTranslatedText: false
    };
  },
  mounted() {
    //Calls button to copy translation with clipboard.js
    new ClipboardJS(".btn");
    //Call preloader spinner function
    this.preloaderSpinner();
  },
  // Listens for change in language title
  computed: {
    languageTitleChange: function() {
      return this.languageTitle;
    }
  },
  methods: {
    // Method to get audio text to speech of translated text
    responseSpeak() {
      responsiveVoice.speak(
        this.wordTranslated,
        this.languageTitle.replace(/\s+/g, " ").trim()
      );
    },
    // function to make preloader spinner for 1500 miliseconds
    preloaderSpinner() {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    // function to fade away the tooltip after 4000 miliseconds
    hideTooltipLater() {
      setTimeout(() => {
        this.showTooltipSourceText = false;
        this.showTooltipTranslatedText = false;
      }, 1000);
    },
    // translate() method makes translate the input's value if keyboard key "Enter" is pressed
    translate(e) {
      // Checks if enter key has been pressed & calls Axios on true
      if (e.key == "Enter") {
        // Axios get() request using Yandex API
        axios
          .get(
            `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${
              this.languageFrom
            }-${
              this.languageTo
            }&key=trnsl.1.1.20190518T054559Z.6098481762cecacb.6b721345d2262aa024e24b0aa7bbc42011422525&text=${
              this.inputValue
            }&format=plain`
          )
          .then(response => {
            // Stores input value translation into translated result
            this.wordTranslated = response.data.text[0];
          });
      }
    },
    // It works when 'from' option is selected.
    updatePairFrom(index) {
      this.languageFrom = index.value;
    },
    // It works when 'to' option is selected.
    updatePairTo(index) {
      // Language title for voice audio text to speech
      this.languageTitle = index.text + " Female";
      // Language output translation
      this.languageTo = index.value;
    },
    clearTextValue(){
      // Resets input field
      this.inputValue = "";
      // Resets translation field
      this.wordTranslated = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* Preloader Spinner Vertical Positioning */
.spinner-container {
  margin-top: 30%;
}

@media only screen and (max-width: 750px) {
  .spinner-container {
    margin-top: 50%;
  }
}

h1 {
  color: #000;
}

.vuejs-link,
.yandex-link,
.responsive-voice-link,
.github-profile-link {
  font-weight: bold;
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

.responsive-voice-link {
  color: #f37548;
}

.responsive-voice-link:hover {
  color: #f74809;
}

/* textarea container styles */
.textarea-container {
  padding-right: 50px !important;
}

/* Styling when btn for copying text buttons */
.textarea-buttons {
  border: none;
  position: relative;
  bottom: 45px;
  float: right;
  margin-right: 19px;
}

.disable-btn:disabled {
  cursor: not-allowed;
}
/* Overrides vue-bootstrap class on buttons */
.btn-secondary {
  color: #000 !important; 
  background-color: #fff !important; 
  border: none !important;
}
.btn:focus {
  outline: none !important;
  box-shadow: none !important;
  border:1 px solid transparent !important;
}

</style>
