<template>
    <div class="card-container">
        <div class="itemlist" v-for="item in data">
            <h2 v-if="flag == '全部'"># {{ item.name }}</h2>
            <div class="card">
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
</template>

<script setup lang="ts">
import { RightOutlined } from "@antdv-next/icons";

defineProps({
    flag: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

const npage = (url: string) => { window.open(url) };
</script>

<style scoped lang="less">
.card-container {
    width: 100%;
    color: white;
    overflow: auto;
    margin-top: -10px;

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
</style>