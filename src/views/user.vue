<template>
    <div id="user">
        <div class="user">
            <div class="header acea-row row-between-wrapper">
                <div class="acea-row row-between-wrapper">
                    <div class="picture">
                        <img :src="userInfo.avatar" alt="">
                    </div>
                    <div class="text">
                        <div class="acea-row row-middle">
                            <div class="name line1">{{ userInfo.nickname }}</div>
                            <div class="member acea-row row-middle" v-if="userInfo.vip">
                                <img :src="userInfo.vip_icon"/>{{ userInfo.vip_name }}
                            </div>
                        </div>
                        <router-link :to="'/user/data'" class="id" v-if="userInfo.phone">
                            ID：{{ userInfo.uid || 0
                            }}
                            <van-icon name="edit" class="icon"/>
                        </router-link>
                        <router-link :to="'/user/binding'" class="binding" v-else>
                            <span>绑定手机号</span>
                        </router-link>
                    </div>
                </div>
                <van-icon name="setting-o" class="icon-setting" @click="setting"/>
            </div>
            <div class="wrapper">
                <div class="nav acea-row row-middle">
                    <router-link :to="{ path: '/user/account' }" class="item">
                        <div>我的余额</div>
                        <div class="num">{{ userInfo.now_money || 0 }}</div>
                    </router-link>
                    <router-link
                            :to="'/user/user_promotion'"
                            class="item"
                            v-if="userInfo.is_promoter === 1 || userInfo.statu === 2"
                    >
                        <div>当前佣金</div>
                        <div class="num">{{ userInfo.brokerage_price || 0 }}</div>
                    </router-link>
                    <router-link :to="'/user/integral'" class="item" v-else>
                        <div>当前积分</div>
                        <div class="num">{{ userInfo.integral || 0 }}</div>
                    </router-link>
                    <router-link :to="'/user/user_coupon'" class="item">
                        <div>优惠券</div>
                        <div class="num">{{ userInfo.couponCount || 0 }}</div>
                    </router-link>
                </div>
                <div class="myOrder">
                    <div class="title acea-row row-between-wrapper">
                        <div>我的订单</div>
                        <router-link :to="'/order/list/'" class="allOrder">
                            全部订单
                            <van-icon name="arrow" class="icon"/>
                        </router-link>
                    </div>
                    <div class="orderState acea-row row-middle">
                        <router-link :to="{ path: '/order/list/' + 0 }" class="item">
                            <div class="pictrue">
                                <img src="../assets/img/dfk.png" />
                                <span
                                        class="order-status-num"
                                        v-if="orderStatusNum.unpaid_count > 0"
                                >{{ orderStatusNum.unpaid_count }}</span
                                >
                            </div>
                            <div>待付款</div>
                        </router-link>
                        <router-link :to="{ path: '/order/list/' + 1 }" class="item">
                            <div class="pictrue">
                                <img src="../assets/img/dfh.png" alt="" />
                                <span
                                        class="order-status-num"
                                        v-if="orderStatusNum.unshipped_count > 0"
                                >{{ orderStatusNum.unshipped_count }}</span
                                >
                            </div>
                            <div>待发货</div>
                        </router-link>
                        <router-link :to="{ path: '/order/list/' + 2 }" class="item">
                            <div class="pictrue">
                                <img src="../assets/img/dsh.png" alt="" />
                                <span
                                        class="order-status-num"
                                        v-if="orderStatusNum.received_count > 0"
                                >{{ orderStatusNum.received_count }}</span
                                >
                            </div>
                            <div>待收货</div>
                        </router-link>
                        <router-link :to="{ path: '/order/list/' + 3 }" class="item">
                            <div class="pictrue">
                                <img src="../assets/img/dpj.png" alt="" />
                                <span
                                        class="order-status-num"
                                        v-if="orderStatusNum.evaluated_count > 0"
                                >{{ orderStatusNum.evaluated_count }}</span
                                >
                            </div>
                            <div>待评价</div>
                        </router-link>
                        <router-link :to="'/order/refund_list'" class="item">
                            <div class="pictrue">
                                <img src="../assets/img/sh.png" alt=""/>
                                <span
                                        class="order-status-num"
                                        v-if="orderStatusNum.refund_count > 0"
                                >{{ orderStatusNum.refund_count }}</span
                                >
                            </div>
                            <div>售后/退款</div>
                        </router-link>
                    </div>
                </div>
                <div class="myService">
                    <div class="title acea-row row-middle">我的服务</div>
                    <div class="serviceList acea-row row-middle">
                        <template v-for="(item, index) in MyMenus">
                            <div
                                    class="item"
                                    :key="index"
                                    @click="goPages(index)"
                                    v-if="item.wap_url"
                            >
                                <div class="pictrue">
                                    <img :src="item.pic" />
                                </div>
                                <div>{{ item.name }}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <Tabbar :active="3"></Tabbar>
    </div>
</template>

<script>
    import Tabbar from "../components/Tabbar/Tabbar";
    import {userService} from "../api/user/user";

    export default {
        name: "user",
        components: {Tabbar},
        data() {
            return {
                userInfo: {},
                orderStatusNum:{},
                MyMenus:[]
            }
        },
        mounted() {
            document.body.style.backgroundColor = "rgb(245, 245, 245)";
            this.getUserData()
        },
        methods: {
            getUserData() {
                userService.userInfo().then(res => {
                    this.userInfo = res.data
                    this.orderStatusNum = res.data.orderStatusNum;
                })
                userService.userMenu().then(res=>{
                    this.MyMenus = res.data.routine_my_menus
                })
            },
            setting() {
                console.log('23')
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #user {
        height: 100%;
        width: 100%;

        .user {
            position: absolute;
            width: 100%;

            .header {
                padding: 0 .3rem;
                height: 1.9rem;
                position: relative;
                background-color: #e93323;

                &:after {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -.98rem;
                    z-index: -1;
                    content: "";
                    height: 1rem;
                    width: 100%;
                    border-radius: 0 0 50% 50%;
                    background-color: #e93323;
                }

                .picture {
                    width: 1.2rem;
                    height: 1.2rem;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        border: .03rem solid #f5f5f5;
                    }
                }

                .text {
                    width: 4.34rem;
                    color: #fff;
                    margin-left: .35rem;
                    text-align: left;

                    .name {
                        font-size: .32rem;
                        max-width: 2.6rem;
                        width: unset;
                    }

                    .member {
                        padding: 0 .1rem;
                        height: .36rem;
                        background-color: rgba(0, 0, 0, .2);
                        font-size: .2rem;
                        border-radius: .3rem;
                        margin-left: .17rem;

                        img {
                            width: .28rem;
                            height: .28rem;
                            font-size: .2rem;
                            margin-right: .08rem;
                        }
                    }

                    .id {
                        color: hsla(0, 0%, 100%, .6);
                        font-size: .26rem;
                        margin-top: .15rem;

                        .icon {
                            font-size: .3rem;
                            margin-left: .12rem;
                        }
                    }
                }

                .icon-setting {
                    font-size: .36rem;
                    color: #fff;
                    margin-top: -.52rem;
                }
            }

            .wrapper{
                padding: 0 .2rem;
                .nav{
                    background-color: #fff;
                    border-radius: .06rem;
                    height: 1.4rem;
                    .item{
                        -webkit-box-flex: 1;
                        flex: 1;
                        text-align: center;
                        font-size: .26rem;
                        color: #aaa;
                        position: relative;
                        .num{
                            margin-top: .1rem;
                            font-size: .36rem;
                            color: #282828;
                        }
                        &:after{
                            position: absolute;
                            content: "";
                            left: 0;
                            width: 1px;
                            height: .7rem;
                            background-color: #eee;
                            top: 50%;
                            margin-top: -.35rem;
                        }
                    }
                }
                .myOrder{
                    background-color: #fff;
                    border-radius: .1rem;
                    margin-top: .15rem;
                    .title{
                        height: .88rem;
                        padding: 0 .3rem;
                        border-bottom: 1px dashed #eee;
                        font-size: .3rem;
                        color: #282828;
                        .allOrder{
                            font-size: .26rem;
                            color: #666;
                            .icon{
                                font-size: .25rem;
                                margin-left: .07rem;
                            }
                        }
                    }
                    .orderState{
                        height: 1.6rem;
                        .item{
                            font-size: .26rem;
                            color: #454545;
                            flex: 1;
                            text-align: center;
                            .pictrue{
                                width: .49rem;
                                height: .42rem;
                                margin: 0 auto .18rem auto;
                                position: relative;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                                .order-status-num{
                                    min-width: .13rem;
                                    background-color: #fff;
                                    color: #ee5a52;
                                    border-radius: 15px;
                                    position: absolute;
                                    right: -.14rem;
                                    top: -.15rem;
                                    font-size: .2rem;
                                    padding: 0 .08rem;
                                    border: 1px solid #ee5a52;
                                    box-sizing: border-box;
                                }
                            }
                        }
                    }
                }
                .myService{
                    background-color: #fff;
                    margin-top: .15rem;
                    border-radius: .1rem;
                    .title{
                        height: .88rem;
                        padding: 0 .3rem;
                        border-bottom: 1px dashed #eee;
                        font-size: .3rem;
                        color: #282828;
                    }
                    .serviceList{
                        padding: .08rem 0 .27rem 0;
                        .item{
                            width: 25%;
                            text-align: center;
                            font-size: .26rem;
                            color: #333;
                            margin-top: .3rem;
                            .pictrue{
                                width: .52rem;
                                height: .52rem;
                                margin: 0 auto .16rem auto;
                                position: relative;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>