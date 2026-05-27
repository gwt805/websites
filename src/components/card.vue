<template>
    <div class="card-container">
        <div class="card">
            <div class="itemlist" v-for="item in data">
                <h2 v-if="flag == '全部'"># {{ item.name }}</h2>
                <div class="card" :style="style">
                    <div class="card-item" v-for="itd in item.data" @click="npage(itd.link)">
                        <div class="div-img">
                            <img :src="itd.imgUrl" alt="icon" draggable="false">
                        </div>
                        <div class="div-mid">
                            <h3>{{ itd.name }}</h3>
                            <p>{{ itd.desc }}</p>
                        </div>
                        <div class="div-ico">
                            <RightOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-tooltip content="Github" :hide-after="0"><span><a onclick="window.open('https://github.com/gwt805')" target="_blank"><img src="../assets/img/github.svg"></a></span></el-tooltip>
            <el-tooltip content="GitCode" :hide-after="0"><span><a onclick="window.open('https://gitcode.com/gwt805')" target="_blank"><img src="../assets/img/gitcode.svg"></a></span></el-tooltip>
            <el-tooltip content="Gitee" :hide-after="0"><span><a onclick="window.open('https://gitee.com/gwt805')" target="_blank"><img src="../assets/img/gitee.svg"></a></span></el-tooltip>
            <el-tooltip content="<img src='./gzh.jpg' style='width:100px;' />" raw-content :hide-after="0"><span><img src="../assets/img/gzh.svg"></span></el-tooltip>
            <span>Copyright © gwt805</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RightOutlined } from "@antdv-next/icons";

const props = defineProps({
    flag: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})
const style= ref(props.flag !="全部"?{'margin-top': "11px"}:'')
const npage = (url: string) => { window.open(url) };
</script>

<style scoped lang="less">
.card-container {
    width: 100%;
    height: calc(100dvh - 41px);
    color: white;
    overflow: auto;
    margin-top: -10px;

    .card {
        height: calc(100% - 32px);
        overflow: auto;
        .itemlist {
            width: 100%;
            color: white;
            &:first-child {
                margin-top: 5px;
            }

            .card {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                grid-gap: 15px;

                @media screen and (max-width: 450px) {
                    grid-template-columns: 1fr;
                }

                .card-item {
                    height: 70px;
                    padding: 5px 15px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    backdrop-filter: blur(2px);
                    transition: all 0.3s ease;

                    .div-img {
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        background-color:  rgba(255, 255, 255, 0.2);
                        display: flex;
                        align-items: center;

                        img {
                            width: 30px;
                            height: 30px;
                            margin: auto 0;
                            padding-left: 10px;
                        }
                    }

                    .div-mid {
                        margin-left: 15px;
                        flex: 1;

                        h3 {
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        p {
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: rgba(255, 255, 255, 0.6);
                        }
                    }
                }

                .card-item:hover {
                    background-color: rgba(0, 0, 0, 0.5);
                    transform: translateY(-2px);
                }
            }
        }
    }
    .footer {
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #a0a4e5;
        font-weight: 700;
        // background-color: rgba(255, 255, 255, 0.2);
        img {
            vertical-align: middle;
        }
        span:not(:first-child) {
            margin-left: 10px;
        }
    }
}
</style>