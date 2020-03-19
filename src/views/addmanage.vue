<template>
    <div id="addmanage">
        <template v-if="list.length > 0">
            <div class="line">
                <img src="../assets/img/line.jpg" alt="">
            </div>
        </template>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
        />
    </div>
</template>

<script>
    import {addressService} from "../api/address/address";

    export default {
        name: "addmanage",
        data() {
            return {
                chosenAddressId: '1',
                list: []
            }
        },
        mounted() {
            document.body.style.backgroundColor = "rgb(245, 245, 245)";
            this.getAddress()
        },
        methods: {
            getAddress(){
              addressService.addressList().then(res=>{
                  console.log(res)
                  this.list = res.data
                  console.log(this.list.length)
              })
            },
            onAdd() {
               this.$router.push({
                   path:'/user/addAddress'
               })
            },
            onEdit(item, index) {
                console.log('编辑地址:' + index);
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#addmanage{
    position: relative;
    width: 100%;
    height: 100%;
    .line{
        width: 100%;
        height: .03rem;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .noCommodity{
        padding-top: .75rem;
        .noPictrue{
            width: 4.14rem;
            height: 3.36rem;
            margin: 0 auto .3rem auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>