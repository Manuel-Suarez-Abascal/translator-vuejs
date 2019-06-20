<template>
  <b-container class="bv-example-row">
    <!-- Preloader Spinner Animation while loading = true -->
    <div class="spinner-container" v-if="loading">
      <b-spinner
        variant="success"
        style="width: 6rem; height: 6rem;"
        label="Text Centered Large Spinner"
        type="grow"
      ></b-spinner>
    </div>

    <div v-else>
      <img class="mt-5" alt="Vue logo" src="../assets/logo.png" />
      <h1 class="my-4 h1">{{ msg }}</h1>
      <!-- Theme Color Switcher Component -->
      <theme-switcher></theme-switcher>
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
        <b-col class="translation-container mb-3" lg="6" md="6" sm="12">
          <!-- Input field to get a value to translate -->
          <b-form-textarea
            class="w-100"
            type="text"
            rows="5"
            v-model="inputValue"
            :placeholder="placeholder"
            @keyup="translate"
            aria-label="Original text to be translated"
          ></b-form-textarea>
        </b-col>

        <b-col class="translated-container mb-3" lg="6" md="6" sm="12">
          <!-- Outputs the translation results -->
          <b-form-textarea
            id="translation-result"
            class="w-100"
            rows="5"
            v-if="wordTranslated"
            :value="wordTranslated"
          ></b-form-textarea>

          <!-- If no translation it shows this message -->
          <b-form-textarea
            class="w-100"
            rows="5"
            placeholder="The translation results will show here!"
            aria-label="Text already translated"
            v-else
          ></b-form-textarea>
        </b-col>
      </b-row>

      <!-- Button to copy translated content using clipboard.js -->
      <b-button
        id="copyBtn"
        class="disable-btn my-4"
        :disabled="!this.wordTranslated"
        :data-clipboard-text="this.wordTranslated"
        variant="outline-success"
        @click="showTooltip = true"
        >Copy Translation</b-button
      >

      <!-- Tooltip will show only when text is translated & button clicked -->
      <b-tooltip
        triggers="click"
        :show.sync="showTooltip"
        @shown="hideTooltipLater"
        target="copyBtn"
        placement="bottom"
      >
        <strong>Text Copied</strong>
      </b-tooltip>

      <!-- Text to Speech Audio button -->
      <b-button
        variant="outline-info"
        class="disable-btn m-3 px-4"
        @click="responseSpeak"
        :disabled="!this.wordTranslated"
        >Play</b-button
      >
    </div>
  </b-container>
</template>

<script>
// Import axios to the component
import axios from "axios";
// Import language selector component
import LanguageSelector from "./LanguageSelector";
// Import theme switcher component
import ThemeSwitcher from "./ThemeSwitcher";
// Import clipboard.js
import ClipboardJS from "clipboard";

export default {
  name: "Translator",
  data() {
    return {
      msg: "Select Language Pair To Translate",
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
      showTooltip: false
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
    // function to make preloader spinner for 1000 milisecond
    preloaderSpinner() {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    // function to fade away the tooltip
    hideTooltipLater() {
      setTimeout(() => {
        this.showTooltip = false;
      }, 4000);
    },
    // translate() method makes translate the input's value if keyboard key "Enter" is pressed
    translate(e) {
      // Checks if enter key has been pressed
      if (e.key == "Enter") {
        // Axios get() request using Yandex API
        axios
          .get(
            "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=" +
              this.languageFrom +
              "-" +
              this.languageTo +
              "&key=trnsl.1.1.20190518T054559Z.6098481762cecacb.6b721345d2262aa024e24b0aa7bbc42011422525&text=" +
              this.inputValue +
              "&format=plain"
          )
          .then(response => {
            // Stores input value translation into translated result
            this.wordTranslated = response.data.text[0];

            // Resets input field
            this.inputValue = "";
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
    }
  },
  components: {
    LanguageSelector,
    ThemeSwitcher
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

/* Styling when btn for copying translation is disabled */
.disable-btn:disabled {
  cursor: not-allowed;
  background-color: #808080 !important;
  color: #ffffff !important;
  border: none !important;
}
</style>
