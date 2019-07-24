<template>
    <div class="spinner">
       <b-spinner
        class="spinner__animation"
        variant="success"
        style="width: 6rem; height: 6rem;"
        label="Text Centered Large Spinner"
        type="grow"
      >
      </b-spinner> 
    </div>
</template>

<script>
export default {
    name: "SpinnerAnimation",  
}
</script>

<style lang="scss" scoped>
/* Preloader Spinner Vertical Positioning */
.spinner {
  margin-top: 30%;
    @media only screen and (max-width: 750px) {
        .spinner {
            margin-top: 50%;
        }
    }
}
</style>
