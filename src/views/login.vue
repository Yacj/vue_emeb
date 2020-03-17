<template>
    <div id="login">
        <div class="register">
            <div class="shading">
                <div class="picture acea-row row-center-wrapper">
                    <img src="../assets/img/logo2.png" alt="">
                </div>
            </div>
            <div class="whiteBg" v-if="formItem === 1">
                <div class="title">
                    <van-tabs v-model="active"
                              title-active-color="#282828">
                        <van-tab title="账户登录">
                            <div class="list">
                                <div class="item">
                                    <div class="acea-row row-between-wrapper">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-phone"></use>
                                        </svg>
                                        <input type="text" placeholder="输入手机号码" required="required" v-model="account">
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="acea-row row-between-wrapper">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-code"></use>
                                        </svg>
                                        <input type="password" placeholder="填写登录密码" required="required" v-model="password">
                                    </div>
                                </div>
                                <div class="forgetPwd">
                                    <van-icon name="question-o"/>
                                    忘记密码？
                                </div>
                                <div class="logon" @click="submit">
                                    登录
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="快速登录">
                            <div class="list">
                                <div class="item">
                                    <div class="acea-row row-between-wrapper">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-phone"></use>
                                        </svg>
                                        <input type="text" placeholder="输入手机号码" required="required" v-model="account">
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="align-left">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-code"></use>
                                        </svg>
                                        <input
                                                type="text"
                                                placeholder="填写验证码"
                                                class="codeInput"
                                                v-model="captcha"
                                        />
                                        <button
                                                class="code"
                                                :disabled="disabled"
                                                :class="disabled === true ? 'on' : ''"
                                                @click="code"
                                        >
                                            {{ text }}
                                        </button>
                                    </div>
                                </div>
                                <div class="logon">
                                    登录
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="tip">
                    没有账号?
                    <span @click="formItem = 2" class="font-color-red">立即注册</span>
                </div>
            </div>
            <div class="whiteBg" v-else>
                <div class="title">注册账号</div>
                <div class="list">
                    <div class="item">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-phone"></use>
                            </svg>
                            <input type="text" placeholder="输入手机号码" v-model="account"/>
                        </div>
                    </div>
                    <div class="item">
                        <div class="align-left">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-code"></use>
                            </svg>
                            <input
                                    type="text"
                                    placeholder="填写验证码"
                                    class="codeIput"
                                    v-model="captcha"
                            />
                            <button
                                    class="code"
                                    :disabled="disabled"
                                    :class="disabled === true ? 'on' : ''"
                                    @click="code"
                            >
                                {{ text }}
                            </button>
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-code"></use>
                            </svg>
                            <input
                                    type="password"
                                    placeholder="填写您的登录密码"
                            />
                        </div>
                    </div>
                </div>
                <div class="logon">注册</div>
                <div class="tip">
                    已有账号?
                    <span @click="formItem = 1" class="font-color-red">立即登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let last_router;
    let last_con
    import {loginService} from "../api/login/login";
    import {cookie, isMPStrict} from "../assets/js/util";

    export default {
        name: "login",
        data() {
            return {
                active: 0,
                formItem: 1,
                captcha: '',
                disabled: false,
                text: "获取验证码",
                account: '',
                password: '',
            }
        },
        beforeRouteEnter(to, from, next) {
            last_con = from
            last_router = from.path
            console.log(last_con)
            next()
        },
        mounted() {
        },
        methods: {
            code() {
                let account = this.account;
                if (account === '') {
                    return this.$toast.fail('电话号码不能为空')
                }
                this.sendCode()
            },
            sendCode() {
                if (this.disabled) return;
                this.disabled = true;
                let n = 60
                this.text = "剩余 " + n + "s";
                const run = setInterval(() => {
                    n = n - 1;
                    if (n < 0) {
                        clearInterval(run);
                    }
                    this.text = "剩余 " + n + "s";
                    if (this.text < "剩余 " + 0 + "s") {
                        this.disabled = false;
                        this.text = "重新获取";
                    }
                }, 1000);
            },
            submit() {
                let phone = this.account;
                let password = this.password
                if (!isMPStrict(phone)) {
                    return this.$toast.fail('请输入正确的手机号码')
                }
                let data = {
                    'username': this.account,
                    'password': this.password
                }
                loginService.login(data).then(res => {
                    let Info = res.data.userInfo
                    if (Info.code === '400') {
                        return this.$toast.fail(Info.msg)
                    }
                    cookie.setCookie('token', Info.token, '365');
                    this.$toast.success('登录成功')
                    if (last_router === '/') {
                        this.$router.push("/home");
                    } else {
                        this.$router.push(last_con.fullPath);
                    }

                })
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style  lang="scss">
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border-width:0 !important; ;
    }
    #login {
        .register {
            background-image: linear-gradient(180deg, #eb5447 0, #ff8e3b);
            width: 100%;
            height: 100%;
            position: absolute;

            .shading {
                background: url(../assets/img/registerw.png) no-repeat 100% 100%;
                width: 100%;
                height: 2.86rem;
                padding-top: .7rem;

                .picture {
                    width: 1.72rem;
                    height: 1.72rem;
                    border-radius: 50%;
                    background-color: hsla(0, 0%, 100%, .8);
                    margin: 0 auto;

                    img {
                        width: 1.64rem;
                        height: 1.64rem;
                        border-radius: 50%;
                        display: block;
                    }
                }
            }

            .whiteBg {
                width: 6.2rem;
                border-radius: .16rem;
                background-color: #fff;
                margin: .3rem auto 0 auto;
                padding: .20rem .3rem 0 .3rem;

                .title {
                    font-size: .36rem !important;
                    color: #282828;
                    text-align: center;
                    font-weight: 700;
                }

                .list {
                    .item {
                        border-bottom: 1px solid #ededed;
                        padding: .47rem 0 .13rem 0;
                        position: relative;

                        .icon {
                            font-size: .35rem;
                            margin-right: .32rem;
                        }

                        .code {
                            position: absolute;
                            width: 1.5rem;
                            height: .5rem;
                            background-color: #f35446;
                            border-radius: .3rem;
                            color: #fff;
                            line-height: .5rem;
                            text-align: center;
                            bottom: .17rem;
                            right: 0;
                            font-size: .25rem;
                        }

                        input {
                            font-size: .33rem;
                            width: 4.9rem;

                            &::-webkit-input-placeholder {
                                color: #ccc
                            }
                        }
                    }

                    .forgetPwd {
                        text-align: right;
                        font-size: .28rem;
                        color: #ccc;
                        margin-top: .2rem;

                        i {
                            font-size: .3rem;
                            margin-right: .1rem;
                            vertical-align: middle;
                        }
                    }

                    .codeInput {
                        width: 2.5rem;
                    }
                }

                .logon {
                    font-size: .34rem;
                    color: #fff;
                    font-weight: 700;
                    height: .86rem;
                    border-radius: .43rem;
                    background: linear-gradient(90deg, #f35447 0, #ff8e3c);
                    text-align: center;
                    line-height: .86rem;
                    margin-top: .47rem;
                }

                .tip {
                    height: 1.1rem;
                    text-align: center;
                    line-height: 1.05rem;
                    font-size: .3rem;
                    color: #ccc;

                    .font-color-red {
                        color: #fc4141;
                    }
                }
            }
        }
    }
</style>