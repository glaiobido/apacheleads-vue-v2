<template>
        <loading :active.sync="isLoading" 
            :can-cancel="false" 
            :on-cancel="onCancel"
            loader="dots"
            color="#233dd2"
            :height="150"
            :width="150"
            :is-full-page="fullPage"></loading>
        
        
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        name: "page-spinner",
        props: ['isLoading', 'fullPage'],
        data() {
            return {
               
            }
        },
        components: {
            Loading
        },
        methods: {
            onCancel() {
              console.log('User cancelled the loader.')
            }
        }
    }
</script>