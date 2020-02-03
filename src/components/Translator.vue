<template>
  <b-container class="bv-example-row">
    <SpinnerAnimation v-if="loading" />

    <div v-else>
      <SwitcherTheme />

      <language-selector
        @onLangFromSelect="updatePairFrom"
        @onLangToSelect="updatePairTo"
      ></language-selector>

      <MetaData />

      <b-row>
        <b-col class=" mb-3" lg="6" md="6" sm="12">
          <b-form-textarea
            class="textarea w-100"
            data-cy="source-text-translation-form"
            type="text"
            rows="9"
            v-model="inputValue"
            :placeholder="placeholder"
            @keyup="translate"
            aria-label="Original text to be translated"
          >
          </b-form-textarea>

          <div v-show="this.inputValue">
            <DeleteButton
              data-cy="delete-text-btn"
              @deleteText="deleteTextValue"
            />
          </div>

          <b-button
            id="copyBtn"
            class="textarea__buttons textarea__buttons__disabled source-text-btn bg-white p-2"
            data-cy="source-form-copy-btn"
            :disabled="!this.inputValue"
            :data-clipboard-text="this.inputValue"
            @click="showTooltipSourceText = true"
          >
            <i class="fas fa-copy"></i>
          </b-button>

          <b-tooltip
            data-cy="source-form-copy-btn-tooltip"
            triggers="click"
            :show.sync="showTooltipSourceText"
            @shown="hideTooltipLater"
            target="copyBtn"
            placement="left"
          >
            <strong>Text Copied</strong>
          </b-tooltip>
        </b-col>

        <b-col class="translated-container mb-3" lg="6" md="6" sm="12">
          <b-form-textarea
            id="translation-result"
            class="w-100 textarea-container"
            data-cy="target-text-translation-form"
            rows="9"
            v-if="wordTranslated"
            :value="wordTranslated"
          >
          </b-form-textarea>

          <b-form-textarea
            class="w-100"
            rows="9"
            placeholder="The translation results will show here!"
            aria-label="Text already translated"
            v-else
          ></b-form-textarea>

          <b-button
            id="copyBtn2"
            class="textarea__buttons textarea__buttons__disabled p-2 bg-white"
            data-cy="target-form-copy-btn"
            :disabled="!this.wordTranslated"
            :data-clipboard-text="this.wordTranslated"
            @click="showTooltipTranslatedText = true"
            ><i class="fas fa-copy"></i>
          </b-button>

          <b-tooltip
            data-cy="target-form-copy-btn-tooltip"
            triggers="click"
            :show.sync="showTooltipTranslatedText"
            @shown="hideTooltipLater"
            target="copyBtn2"
            placement="left"
          >
            <strong>Text Copied</strong>
          </b-tooltip>

          <b-button
            class="textarea__buttons textarea__buttons__disabled border-0 p-2"
            data-cy="responsespeak-btn"
            @click="responseSpeak"
            :disabled="!this.wordTranslated"
            ><i class="fas fa-microphone"></i
          ></b-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import ClipboardJS from "clipboard";
import DeleteButton from "./DeleteButton";
import LanguageSelector from "./LanguageSelector";
import MetaData from "./MetaData";
import SpinnerAnimation from "./SpinnerAnimation";
import SwitcherTheme from "./SwitcherTheme";

export default {
  name: "Translator",
  components: {
    DeleteButton,
    LanguageSelector,
    MetaData,
    SpinnerAnimation,
    SwitcherTheme
  },
  data() {
    return {
      placeholder: "Type something ...",
      wordTranslated: "",
      inputValue: "",
      languageFrom: null,
      languageTo: null,
      languageTitle: null,
      loading: true,
      showTooltipSourceText: false,
      showTooltipTranslatedText: false
    };
  },
  mounted() {
    new ClipboardJS(".btn");
    this.preloaderSpinner();
  },
  computed: {
    languageTitleChange: function() {
      return this.languageTitle;
    }
  },
  methods: {
    responseSpeak() {
      responsiveVoice.speak(
        this.wordTranslated,
        this.languageTitle.replace(/\s+/g, " ").trim()
      );
    },
    preloaderSpinner() {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    hideTooltipLater() {
      setTimeout(() => {
        this.showTooltipSourceText = false;
        this.showTooltipTranslatedText = false;
      }, 1000);
    },
    translate(e) {
      if (e.key == "Enter") {
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
            this.wordTranslated = response.data.text[0];
          });
      }
    },
    updatePairFrom(index) {
      this.languageFrom = index.value;
    },
    updatePairTo(index) {
      this.languageTitle = index.text + " Female";
      this.languageTo = index.value;
    },
    deleteTextValue() {
      this.inputValue = "";
      this.wordTranslated = "";
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/scss/_light-dark-theme.scss";
@import "@/styles/scss/_copy-audio-buttons.scss";
</style>
