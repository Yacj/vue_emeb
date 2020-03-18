<template>
    <div id="recommend">
        <div class="title acea-row row-center-wrapper">
            <span class="iconfont icon-zhuangshixian"></span>
            <span class="name">为你推荐</span>
            <span class="iconfont icon-zhuangshixian lefticon"></span>
        </div>
        <div class="recommendList acea-row row-center-wrapper">
            <router-link
                    to="detail"
                    class="item"
                    v-for="(item,index) in recommendList"
                    :key="index">
                <div class="pictrue">
                    <img :src="item.image" class="image" />
                </div>
                <div class="name line1">{{ item.store_name }}</div>
                <div class="money font-color-red">
                    ￥<span class="num">{{ item.price }}</span>
                </div>
            </router-link>
        </div>
        <div class="" style="height: 1.2rem"></div>
    </div>
</template>

<script>
    import {recommendService} from "../../api/recommend/recommend";

    export default {
        name: "recommend",
        data() {
            return {
                recommendList:[]
            }
        },
        mounted() {
         recommendService.recommend().then(res=>{
             this.recommendList = res.data
         })
        },
        methods: {},
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#recommend{
    .title{
        height: 1.35rem;
        font-size: .28rem;
        color: #282828;
        .iconfont{
            color: #454545;
            height: .5rem;
            line-height: .5rem;
        }
        .name{
            margin: 0 .28rem;
        }
        .lefticon{
            transform: rotate(180deg);
        }
    }
    .recommendList{
        padding: 0 .3rem;
        -webkit-box-pack: justify;
        justify-content: space-between;
        .item{
            width: 3.35rem;
            margin-bottom: .3rem;
            .pictrue{
                width: 100%;
                height: 3.35rem;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: .06rem;
                }
            }
            .name{
                font-size: .28rem;
                color: #282828;
                margin-top: .2rem;
            }
            .money{
                font-size: .2rem;
                margin-top: .03rem;
                color: #fc4141;
                .num{
                    font-size: .28rem;
                }
            }
        }
    }
}
</style>