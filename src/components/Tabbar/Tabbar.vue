<template>
    <div id="Tabbar">
        <van-tabbar v-model="actives">
            <van-tabbar-item
                    :icon="item.icon"
                    :info="item.info"
                    :dot="item.dot"
                    :key="index"
                    @click="footerNavigateTo(item)"
                    v-for="(item,index) in footerlist">
                {{ item.name }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    let footerlist = [
        {
            index: 0,
            name: '首页',
            path: '/home',
            icon: 'icon iconfont icon-shouye-xianxing',
            dot: false,
            info: ''// 此处为空时 dom不显示
        },
        {
            index: 1,
            name: '分类',
            path: '/category',
            icon: 'icon iconfont icon-ingyongchengxu-xianxing',
            dot: false,
            info: ''// 此处为空时 dom不显示
        },
        {
            index: 2,
            name: '购物车',
            path: '/cart',
            icon: 'icon iconfont icon-caigou-xianxing',
            dot: false,
            info: ''// 此处为空时 dom不显示
        },
        {
            index: 3,
            name: '我的',
            path: '/user',
            icon: 'icon iconfont icon-yonghu1',
            dot: false,
            info: ''// 此处为空时 dom不显示
        },
    ]
    export default {
        name: "Tabbar",
        props: ['active'],
        data() {
            return {
                actives: this.active,
                footerlist:footerlist
            }
        },
        mounted() {
        },
        methods: {
            footerNavigateTo(item){
                this.$router.push({path: item.path})
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #Tabbar{
        z-index: 101;
    }
    #Tabbar .van-tabbar-item--active {
        color: #fc4141!important;
    }
</style>