<template>
  <div id="app" v-cloak>
      <loading v-show="LOADING"></loading>
      <router-view/>
  </div>
</template>

<style lang="scss">
</style>
<script>
    import {mapState} from 'vuex'
    import Loading from "./views/loading";
    export default {
        components: {Loading},
        computed:{
            ...mapState([
                "LOADING"
            ])
        }
    }
</script>