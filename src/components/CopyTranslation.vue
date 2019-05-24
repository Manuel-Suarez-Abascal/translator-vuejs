<template>
    <div>
        <b-button variant="success" @click="copyTranslation">{{ title }}</b-button>
    </div>
</template>

<script>
export default {
    name: 'CopyTranslation',
    data() {
        return {

        }
    },
    // Changes text button
    props: ['title'],
    // $emits an event to the parent component(translator.vue) to get the translate value
    methods: {
        copyTranslation: function() {
            this.$emit('copy-text')
        }
    }
}
</script>

<style>

</style>
