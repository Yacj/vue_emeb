<template>
    <div id="HoverButton"
         :style="{top : top +'px'}"
         class="hover"
         @touchmove="touchmove($event)">
        <div class="hoverCon"
             :class="hoverActive === true ? 'on':'' ">
            <router-link
                    :to="'/'"
                    class="iconfont icon-shouye-xianxing"
            ></router-link>
            <router-link
                    :to="'/cart'"
                    class="iconfont icon-caigou-xianxing"
            ></router-link>
            <router-link
                    :to="'/user'"
                    class="iconfont icon-yonghu1"
            >
            </router-link>
        </div>
        <div class="picture" @click="open">
            <img :src="
            hoverActive === true
            ? require('../../assets/img/close.gif')
            : require('../../assets/img/open.gif')"
                 alt=""
            >
        </div>
    </div>
</template>

<script>
    export default {
        name: "HoverButton",
        data() {
            return {
                top: "",
                hoverActive: false
            }
        },
        mounted() {
        },
        methods: {
            touchmove(e) {
                e.preventDefault();
                let top =
                    e.touches[0].pageY -
                    (document.documentElement.scrollTop || document.body.scrollTop) -
                    this.$el.clientHeight;
                if (top > 390) top = 390;
                else if (top < 55) top = 55;
                this.top = top;
            },
            open() {
                this.hoverActive = !this.hoverActive
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #HoverButton {
        position: fixed;
        top: 7.8rem;
        color: #fff;
        text-align: center;
        z-index: 33;
        right: .1rem;

        .hoverCon {
            overflow: hidden;
            width: .86rem;
            border-radius: .5rem;
            transition: all .3s ease-in-out 0s;
            opacity: 0;
            transform: scale(0);
            height: 0;
            color: #e93323;

        }

        .hoverCon.on {
            opacity: 1;
            transform: scale(1);
            height: 3rem;
            padding: .34rem 0;
            margin-bottom: .2rem;
            background-color: #e93323 !important;

            .iconfont {
                font-size: .48rem;
                color: #fff;
                display: inline-block;
                height: .9rem;
                margin: 0 auto
            }
        }

        .picture {
            width: .86rem;
            height: .86rem;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%
            }
        }
    }
</style>