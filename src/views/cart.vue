<template>
    <div id="cart">
        <Tabbar :active="2"></Tabbar>
    </div>
</template>

<script>
    import Tabbar from "../components/Tabbar/Tabbar";
    export default {
        name: "cart",
        components: {Tabbar},
        data() {
            return {}
        },
        mounted() {
        },
        methods: {},
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">

</style>