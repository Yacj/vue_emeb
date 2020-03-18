<template>
    <div class="home">
        <div class="header acea-row row-center-wrapper">
            <router-link to="search" class="search acea-row row-middle">
            <span class="icon">
                <van-icon name="search"/>
            </span>
                搜索商品
            </router-link>
        </div>
        <div class="banner">
            <div class="banner-load" v-if="bannerList.length <= 0">
                <van-loading size="24px">加载中...</van-loading>
            </div>
            <banner :banner="bannerList" v-if="bannerList.length > 0"></banner>
        </div>
        <div class="nav">
            <van-grid
                    :border="false"
                    :column-num="4"
            >
                <van-grid-item
                        v-for="(item,index) in menus"
                        :key="index">
                    <img :src="item.pic"/>
                    <span>
                        {{item.name}}
                    </span>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="specialArea acea-row row-between-wrapper">
            <router-link
                    :to="activityOne.wap_link ? activityOne.wap_link : ''"
                    class="assemble">
                <img :src="activityOne.pic" alt="">
                <div class="text">
                    <div class="name">{{ activityOne.title }}</div>
                    <div class="infor">{{ activityOne.info }}</div>
                </div>
            </router-link>
            <div class="list acea-row row-column-between">
                <router-link
                        :to="item.wap_link ? item.wap_link : ''"
                        class="item"
                        v-for="(item, index) in activity"
                        :key="index"
                >
                    <img :src="item.pic"/>
                    <div class="text">
                        <div class="name">{{ item.title }}</div>
                        <div class="infor">{{ item.info }}</div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="wrapper">
            <div class="title acea-row row-between-wrapper">
                <div class="text">
                    <div class="name">快速选择</div>
                    <div class=""></div>
                </div>
            </div>
        </div>
        <Tabbar :active="0"></Tabbar>
        <HoverButton></HoverButton>
    </div>
</template>

<script>
    import {homeService} from '../api/home/home'
    import HoverButton from "../components/HoverButton/HoverButton";
    import Banner from "../components/banner/banner";
    import Tabbar from "../components/Tabbar/Tabbar";

    export default {
        name: 'Home',
        components: {Tabbar, Banner, HoverButton},
        data() {
            return {
                bannerList: [],
                menus: [],
                activity: [],
                activityOne: {}
            }
        },
        mounted() {
            this.getHomeData()
        },
        methods: {
            async getHomeData() {
                this.$store.commit('showLoading')
                await homeService.home().then(res => {
                    let data = res.data;
                    this.bannerList = data.banner
                    this.menus = data.menus
                    this.activity = data.activity
                    if (data.activity.length) {
                        this.activityOne = data.activity.shift();
                    }
                    this.$store.commit('hideLoading')
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .home {
        background-color: #fff;
        width: 100%;

        .banner-load {
            position: relative;
            left: calc(50% - 25px);
            overflow: hidden;
            width: 100%;
            height: 0;
            padding-bottom: 50.6%
        }

        .header {
            height: .98rem;
            width: 100%;

            .search {
                width: 100%;
                height: .64rem;
                background-color: #f5f5f5;
                border-radius: .5rem;
                padding: 0 .28rem;
                font-size: .28rem;
                color: #bbb;

                .icon {
                    font-size: .34rem;
                    margin-right: .16rem;
                    padding-top: 5px;
                }
            }
        }

        .nav {
            img {
                width: .9rem;
                height: .9rem;
                margin-bottom: 0.15rem;
            }

            span {
                font-size: .26rem;
                color: #333333;
            }
        }

        .specialArea {
            padding: .3rem;

            .assemble {
                width: 2.6rem;
                height: 2.6rem;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: .05rem;
                }

                .text {
                    position: absolute;
                    top: .37rem;
                    left: .22rem;
                }

                .name {
                    font-size: .3rem;
                    color: #fff;
                }

                .infor {
                    font-size: .22rem;
                    color: hsla(0, 0%, 100%, .8);
                    margin-top: .05rem;
                }
            }

            .list {
                height: 2.6rem;
                width: 4.16rem;

                .item {
                    width: 100%;
                    height: 1.24rem;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    .text {
                        position: absolute;
                        top: .23rem;
                        left: .28rem;
                    }

                    .name {
                        font-size: .3rem;
                        color: #fff;
                    }

                    .infor {
                        font-size: .22rem;
                        color: hsla(0, 0%, 100%, .8);
                        margin-top: .05rem;
                    }
                }
            }
        }
    }
</style>