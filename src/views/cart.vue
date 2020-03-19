<template>
    <div id="cart">
        <div class="cartNav acea-row row-around row-middle">
            <div class="item">
                <van-icon name="passed" class="icon"/>
                100%正品保证
            </div>
            <div class="item">
                <van-icon name="passed" class="icon"/>
                所有商品精挑细选
            </div>
            <div class="item">
                <van-icon name="passed" class="icon"/>
                售后无忧
            </div>
        </div>
        <div class="nav acea-row row-between-wrapper">
            <div>
                购物数量
                <span class="num">
                    {{count}}
                </span>
            </div>
            <div v-if="cartList.valid.length > 0"
                 class="adminstrate acea-row row-center-wrapper"
                 @click="manage">
                {{ footerswitch ? "取消" : "管理" }}
            </div>
        </div>
        <div v-if="cartList.valid.length > 0 || cartList.invalid.length > 0">
            <div class="list">
                <div
                        class="item acea-row row-between-wrapper"
                        v-for="(item, index) in cartList.valid"
                        :key="index"
                >
                    <div class="select-btn">
                        <div class="checkbox-wrapper">
                            <label class="well-check">
                                <input
                                        type="checkbox"
                                        name=""
                                        value=""
                                        :checked="item.checked"
                                        @click="switchSelect(index)"
                                />
                                <i class="icon"></i>
                            </label>
                        </div>
                    </div>
                    <div class="picTxt acea-row row-between-wrapper">
                        <div
                                class="pictrue"
                                @click="$router.push({ path: '/detail/' + item.product_id })"
                        >
                            <img
                                    :src="item.productInfo.attrInfo.image"
                                    v-if="item.productInfo.attrInfo"
                            />
                            <img :src="item.productInfo.image" v-else/>
                        </div>
                        <div class="text">
                            <div class="line1">{{ item.productInfo.store_name }}</div>
                            <div class="infor line1" v-if="item.productInfo.attrInfo">
                                属性：{{ item.productInfo.attrInfo.suk }}
                            </div>
                            <div class="money">￥{{ item.truePrice }}</div>
                        </div>
                        <div class="carnum acea-row row-center-wrapper">
                            <div
                                    class="reduce"
                                    :class="cartList.valid[index].cart_num <= 1 ? 'on' : ''"
                                    @click.prevent="reduce(index)"
                            >
                                -
                            </div>
                            <div class="num">{{ item.cart_num }}</div>
                            <div
                                    class="plus"
                                    v-if="cartList.valid[index].attrInfo"
                                    :class=" cartList.valid[index].cart_num >=cartList.valid[index].attrInfo.stock? 'on': ''"
                                    @click.prevent="plus(index)"
                            >
                                +
                            </div>
                            <div
                                    class="plus"
                                    v-else
                                    :class="
                  cartList.valid[index].cart_num >= cartList.valid[index].stock
                    ? 'on'
                    : ''
                "
                                    @click.prevent="plus(index)"
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noCart"
             v-if="cartList.valid.length === 0 && cartList.invalid.length === 0"
        >
            <div class="pictrue">
                <img src="../assets/img/noCart.png"/>
            </div>
            <recommend></recommend>
        </div>
        <div style="height: 2.1rem"></div>
        <div class="footer acea-row row-between-wrapper"
             v-if="cartList.valid.length > 0">
            <div class="">
                <div class="select-btn">
                    <div class="checkbox-wrapper">
                        <label class="well-check">
                            <input
                                    type="checkbox"
                                    name=""
                                    value=""
                                    :checked="isAllSelect && cartCount > 0"
                                    @click="allChecked"
                            />
                            <i class="icon"></i>
                            <span class="checkAll">全选 ({{ cartCount }})</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="money acea-row row-middle" v-if="footerswitch === false">
                <span class="font-color-red">￥{{ countmoney }}</span>
                <div class="placeOrder bg-color-red" @click="placeOrder">立即下单</div>
            </div>
            <div class="button acea-row row-middle" v-else>
                <div class="bnt cart-color" @click="collectAll">收藏</div>
                <div class="bnt" @click="delgoods">删除</div>
            </div>
        </div>
        <tabbar :active="2"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "../components/Tabbar/Tabbar";
    import {cartService} from "../api/cart/cart";
    import Recommend from "../components/recommend/recommend";

    export default {
        name: "cart",
        components: {Recommend, Tabbar},
        data() {
            return {
                count: 0,
                cartList: {invalid: [], valid: []},
                footerswitch: false,
                isAllSelect: false,
                cartCount: 0,
                countmoney: 0,
                checkedIds: []
            }
        },
        mounted() {
            document.body.style.backgroundColor = "rgb(245, 245, 245)";
            this.getCartData()
            this.$store.commit('showLoading')
        },
        methods: {
            getCartData() {
                cartService.cartList().then(res => {
                    this.cartList = res.data
                    this.$store.commit('hideLoading')
                })
            },
            manage() {
                this.footerswitch = !this.footerswitch
            },
            switchSelect(index) {
                let cart = this.cartList.valid[index],
                    cartId = this.checkedIds.indexOf(cart.id);
                let len = this.cartList.valid.length;
                console.log(len)
                let selectNum = [];

                cart.checked = !cart.checked;
                if (cartId !== -1) this.checkedIds.splice(cartId, 1);
                if (cart.checked) {
                    this.checkedIds.push(cart.id);
                }
                for (let i = 0; i < len; i++) {
                    if (this.cartList.valid[i].checked === true) {
                        selectNum.push(true);
                    }
                }
                this.isAllSelect = selectNum.length === len;
            },
            plus() {

            },
            reduce(index) {
                console.log(index)
            },
            allChecked() {

            },
            collectAll() {

            },
            delgoods() {

            },
            placeOrder() {

            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #cart {
        position: absolute;
        width: 100%;
        .cartNav {
            height: .76rem;
            padding: 0 .3rem;
            font-size: .22rem;
            color: #8c8c8c;
            position: fixed;
            left: 0;
            width: 100%;
            background-color: #f5f5f5;
            z-index: 5;
            top: 0;

            .icon {
                font-size: .25rem;
                top: 2px;
            }
        }

        .nav {
            width: 100%;
            height: .8rem;
            background-color: #fff;
            padding: 0 .3rem;
            font-size: .28rem;
            color: #282828;
            position: fixed;
            left: 0;
            z-index: 5;
            top: .76rem;
            border-bottom: 1px solid #f5f5f5;

            .num {
                color: #fc4141 !important;
            }
        }

        .list {
            margin-top: 1.71rem;

            .item {
                padding: .25rem .3rem;
                background-color: #fff;
                margin-bottom: .15rem;

                .checkbox-wrapper {
                    position: relative;

                    input {
                        display: none;
                    }

                    .icon {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        border: 1px solid #ccc;
                        border-radius: 50%;
                        transform: translateY(-50%);
                    }
                }

                .picTxt {
                    width: 6.27rem;
                    position: relative;

                    .pictrue {
                        width: 1.6rem;
                        height: 1.6rem;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: .06rem;
                        }
                    }

                    .carnum {
                        height: .44rem;
                        position: absolute;
                        bottom: .07rem;
                        right: 0;

                        div {
                            border: 1px solid #a4a4a4;
                            width: .66rem;
                            text-align: center;
                            height: 100%;
                            line-height: .44rem;
                            font-size: .28rem;
                            color: #a4a4a4;
                        }

                        .reduce {
                            border-right: 0;
                            border-radius: .03rem 0 0 .03rem;
                            line-height: .39rem;
                        }

                        .num {
                            color: #282828;
                        }

                        .plus {
                            border-left: 0;
                            border-radius: 0 .03rem .03rem 0;
                            line-height: .38rem;
                        }
                    }
                }

                .text {
                    width: 4.44rem;
                    font-size: .28rem;
                    color: #282828;
                    text-align: left;

                    .money {
                        font-size: .32rem;
                        color: #282828;
                        margin-top: .26rem;
                    }
                }
            }
        }

        .noCart {
            margin-top: 1.71rem;
            background-color: #fff;
            padding: .78rem 0 .56rem 0;

            .pictrue {
                width: 4.14rem;
                height: 3.36rem;
                margin: 0 auto;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .footer {
            width: 100%;
            height: .96rem;
            background-color: #fafafa;
            position: fixed;
            bottom: 1rem;
            padding: 0 .3rem;
            border-top: 1px solid #eee;

            .checkbox-wrapper {
                position: relative;

                input {
                    display: none;
                }
                .icon {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    transform: translateY(-50%);
                }
            }
            .checkAll {
                font-size: .28rem;
                color: #282828;
                margin-left: .6rem;
            }

            .money {
                font-size: .3rem;

                .font-color-red {
                    color: #fc4141 !important;
                }

                .placeOrder {
                    color: #fff;
                    font-size: .3rem;
                    width: 2.26rem;
                    height: .7rem;
                    border-radius: .5rem;
                    text-align: center;
                    line-height: .7rem;
                    margin-left: .22rem;
                    background: #e93323;
                }
            }

            .button {
                .bnt {
                    font-size: .28rem;
                    color: #999;
                    border-radius: .5rem;
                    border: 1px solid #999;
                    width: 1.6rem;
                    height: .6rem;
                    text-align: center;
                    line-height: .6rem;
                }

                .bnt ~ .bnt {
                    margin-left: .17rem;
                }

                .cart-color {
                    color: #ff3700 !important;
                    border: 1px solid #ff3700 !important;
                }
            }
        }
    }
    .checkbox-wrapper input:checked+.icon {
        background-color: #e93323;
        border-color: #e93323;
        background-image: url(../assets/img/check.png);
        background-size: .21rem .15rem;
        background-repeat: no-repeat;
        background-position: 50%;
    }
</style>