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
            <div    v-if="cartList.valid.length > 0"
                    class="adminstrate acea-row row-center-wrapper"
                    @click="manage">
                {{ footerswitch ? "取消" : "管理" }}
            </div>

        </div>
        <div
                class="noCart"
                v-if="cartList.valid.length === 0 && cartList.invalid.length === 0"
        >
            <div class="pictrue">
                <img src="../assets/img/noCart.png" />
            </div>
            <recommend></recommend>
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
                count:0,
                cartList: { invalid: [], valid: [] },
                footerswitch:true
            }
        },
        mounted() {
            document.body.style.backgroundColor = "rgb(245, 245, 245)";

            this.getCartData()
        },
        methods: {
            getCartData(){
              cartService.cartList().then(res=>{
                  this.cartList = res.data
              })
            },
            manage(){
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #cart{
        position: absolute;
        width: 100%;
        .cartNav{
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
            .icon{
                font-size: .25rem;
                top: 2px;
            }
        }
        .nav{
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
            .num{
                color: #fc4141!important;
            }
        }
        .noCart{
            margin-top: 1.71rem;
            background-color: #fff;
            padding: .78rem 0 .56rem 0;
            .pictrue{
                width: 4.14rem;
                height: 3.36rem;
                margin: 0 auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>