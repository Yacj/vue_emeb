<template>
    <div id="category">
        <div class="header acea-row row-center-wrapper">
            <router-link to="search" class="search acea-row row-middle">
            <span class="icon">
                <van-icon name="search"/>
            </span>
                搜索商品
            </router-link>
        </div>
        <div class="tree-select">
            <van-tree-select
                    :items="items"
                    height="100%"
                    :active-id.sync="items.activeId"
                    :main-active-index.sync="items.activeId"
                    @click-nav="onNavClick">
                <template slot="content">
                    <div  v-if="itemsList.length <= 0">
                        <van-loading size="24px">加载中...</van-loading>
                    </div>
                    <div class="conter" v-if="itemsList.length > 0">
                        <div class="listw">
                            <div class="list acea-row">
                                <router-link class="item acea-row row-column row-middle"
                                             to="sec"
                                             v-for="(item,index) in itemsList" :key="index">
                                    <div class="picture">
                                        <img :src="item.pic" alt="">
                                    </div>
                                    <div class="name">
                                        {{item.cate_name}}
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>

                </template>
            </van-tree-select>


        </div>
        <Tabbar :active="1"></Tabbar>
    </div>
</template>

<script>
    import Tabbar from "../components/Tabbar/Tabbar";
    import {categoryService} from "../api/category/category";

    export default {
        name: "category",
        components: {Tabbar},
        data() {
            return {
                activeIndex: 0,
                items: [],
                itemsList: [],
                oneid: ''
            }
        },
        mounted() {
            this.getcategory()
            this.categoryList()
            console.log(this.itemsList.length)
        },
        methods: {
            async getcategory() {
                await categoryService.category().then(res => {
                    let data = res.data
                    this.oneid = data[0].id
                    data.forEach(res => {
                        let text = res.cate_name
                        let id = res.id
                        this.items.push({
                            activeId: id,
                            text: text
                        })
                    })
                })
            },
            categoryList(code) {
                let id;
                if (code === undefined) {
                    id = this.oneid
                } else {
                    id = code
                }
                id.toString()
                let data = {
                    id: id
                }
                categoryService.categoryList(data).then(res => {
                    let data = res.data
                    this.itemsList = data
                })
            },
            onNavClick(index) {
                let code = this.items[index].activeId
                this.categoryList(code)
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    .van-sidebar-item--select {
        color: red;
        background: #fff;
    }

    #category {
        position: absolute;
        width: 100%;
        height: 100%;
        .tree-select{
            height: 100%;
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
        .conter{
            padding: 0 .14rem;
            .listw {
                padding-top: .2rem;
                .list {
                    flex-wrap: wrap;
                    .item {
                       width: 50%;
                        margin-top: .26rem;
                        .picture {
                            width: 1.2rem;
                            height: 1.2rem;
                            border-radius: 50%;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .name {
                            font-size: .24rem;
                            color: #333;
                            height: .56rem;
                            line-height: .56rem;
                            width: 1.2rem;
                            text-align: center;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
</style>