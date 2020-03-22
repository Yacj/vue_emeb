<template>
    <div id="search">
        <form action="/">
            <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
            />
        </form>
        <div class="search_hot">
            <div class="title">
                热门搜索
            </div>
            <div class="list acea-row">
                <div class="item">1</div>
                <div class="item">2</div>
            </div>
        </div>

        <div class="search_history">
            <div class="title">
                <p>历史记录</p>
                <van-icon name="delete" class="icon" @click="deleteHistory"/>
            </div>
            <ul class="search_list" >
                <li v-for="(item,index) in historyList" :key="index" class="van-hairline--bottom">
                    <span>
                        {{item}}
                    </span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {storage} from "../assets/js/util";

    export default {
        name: "search",
        data() {
            return {
                value: '',
                historyList:[]//搜索历史列表
            }
        },
        created() {
            this.getSearchWord()
        },
        watch:{
            value(val){
                if(typeof val === "string"){
                    if (val.trim().length !== 0) {
                        this.debounce(this.changeStr(val), 1000);
                    }
                }
            }
        },
        methods: {
            onSearch(val) {
                let searchData = val.trim()
                if(searchData !== ''){
                    let searchWord = storage.get('searchWord');
                    if(searchWord === null){
                        this.historyList.unshift(searchData);
                        storage.set('searchWord',JSON.stringify(this.historyList))
                    }else{
                        if(this.historyList.indexOf(searchData) !== -1){
                            this.historyList.splice(this.historyList.indexOf(searchData), 1);
                            this.historyList.unshift(searchData);
                        }else{
                            this.historyList.unshift(searchData);
                        }
                        if(this.historyList.length > 5){
                            this.historyList.pop();
                        }
                        storage.set('searchWord',JSON.stringify(this.historyList))
                    }
                }
            },
            onCancel() {
                console.log('取消');
            },
            debounce: function(fn, wait) {
                if (this.fun !== null) {
                    clearTimeout(this.fun);
                }
                this.fun = setTimeout(fn, wait);
            },
            changeStr(val){
                console.log(val)
            },
            getSearchWord(){
                let searchWord = storage.get('searchWord');
                if(searchWord !== null){
                    this.historyList = JSON.parse(searchWord);
                }
            },
            deleteHistory(){
                this.historyList.splice(0);
                storage.remove();
            }
        },
        component: {
            //someComponent
        },
    }
</script>
<style scoped lang="scss">
#search{
    .search_hot{
        .title{
            font-size: .28rem;
            color: #999;
            margin: .5rem .3rem .25rem .3rem;

        }
        .list{
            padding-left: .1rem;
            .item{
                font-size: .26rem;
                color: #454545;
                padding: 0 .21rem;
                height: .6rem;
                border-radius: .03rem;
                line-height: .6rem;
                border: 1px solid #aaa;
                margin: 0 0 .2rem .2rem;
            }
        }
    }
    .search_history{
        .title{
            font-size: .28rem;
            color: #999;
            justify-content: space-between;
            display: -webkit-box;

            p{
                margin: .5rem .3rem .25rem .3rem;
            }
            .icon{
                margin: .5rem .3rem .25rem .3rem;
                font-size: .38rem;
            }
        }
        .search_list{
            /*padding: 0 25px;*/
            font-size: .26rem;
            li{
                padding: .21rem 0;
                span{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>