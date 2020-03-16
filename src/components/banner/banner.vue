<template>
    <div id="banner">
        <swiper :options="swiperOption" v-if="banner.length > 0">
            <swiper-slide v-for="(item, index) in banner" :key="index" >
                    <img :src="item.pic" />
            </swiper-slide>
            <div class="swiper-pagination paginationBanner" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "banner",
        props:{
            banner:{
                type:Array,
                required:true
            }
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: ".paginationBanner",
                        clickable: true
                    },
                    autoplay: {
                        disableOnInteraction: false,
                        delay: 2000
                    },
                    loop: true,
                    speed: 1000,
                    observer: true,
                    observeParents: true
                },
            }
        },
        mounted() {
        },
        methods: {},
        component: {
            //someComponent
        }
    }
</script>
<style  lang="scss">
#banner{
    height: 3.75rem;
    img{
        width: 100%;
        height: 100%;
    }
    .swiper-pagination {
        bottom: .07rem
    }
    .swiper-pagination-bullet {
        width: .2rem;
        height: .04rem;
        border-radius: .03rem;
        background-color: #fff;
        opacity: .6
    }
    .swiper-pagination-bullet-active {
        opacity: 1
    }
}
</style>