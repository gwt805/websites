<template>
    <a-config-provider :theme="{ algorithm: theme.defaultAlgorithm }">
        <div class="container">
            <div class="header">
                <a-menu class="menu" mode="horizontal" :selected-keys="['websites']" :overflowedIndicator="vnode"
                    :items="[{ 'label': '首页', key: '/' }, { 'label': '导航网', key: 'websites' }, { 'label': '热搜榜', key: '/hotnet/' }]"
                    @click="onClick" />
                <div class="datetime">
                    <p class="time">{{ time }}</p>
                    <p class="date">{{ date }}</p>
                </div>
            </div>
            <div class="body">
                <a-tabs v-model:activeKey="activeKey" centered :items="items" :moreIcon="vnode" :indicator="{size: 0}" @change="onChange"/>
            </div>
            <div class="footer">
                <el-tooltip content="Github" :hide-after="0"><span><a onclick="window.open('https://github.com/gwt805')" target="_blank"><img src="./assets/img/github.svg"></a></span></el-tooltip>
                <el-tooltip content="GitCode" :hide-after="0"><span><a onclick="window.open('https://gitcode.com/gwt805')" target="_blank"><img src="./assets/img/gitcode.svg"></a></span></el-tooltip>
                <el-tooltip content="Gitee" :hide-after="0"><span><a onclick="window.open('https://gitee.com/gwt805')" target="_blank"><img src="./assets/img/gitee.svg"></a></span></el-tooltip>
                <el-tooltip content="<img src='./gzh.jpg' style='width:100px;' />" raw-content :hide-after="0"><span><img src="./assets/img/gzh.svg"></span></el-tooltip>
                <span>Copyright © gwt805</span>
            </div>
        </div>
    </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'antdv-next'
import { getdata } from "@/api/data";
import card from './components/card.vue';
import { MenuOutlined } from "@antdv-next/icons";
import { h, ref, onMounted, onUnmounted } from "vue";

const cron = ref();
const date = ref('');
const time = ref('');
const data: any = ref([]);

const lastTime = ref(performance.now());
const activeKey = ref("全部");
const vnode = h(MenuOutlined, { class: 'hover-icon' });
const items: any = ref([]);
const keys: any = ref([]);

const onClick = (data: any) => {
    if (data.key !== "websites") {
        window.location.href = `https://gwt805.github.io/${data.key=='/'?'':data.key}`;
    }
}
const onChange = (activeKey: string) => {
    window.localStorage.setItem("activeKey", activeKey)
}
const checkCache = () => {
    const cache: any = window.localStorage.getItem("activeKey");
    if (cache === undefined || cache === "" || keys.value.indexOf(cache) == -1) {
        activeKey.value = "全部";
        window.localStorage.setItem("activeKey", "全部");
    } else {
        activeKey.value = cache;
    }
}
const getCurrentDateTime = () => {
    const now_date = new Date();
    const year = now_date.getFullYear();
    const month = String(now_date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
    const day = String(now_date.getDate()).padStart(2, '0');
    const hours = String(now_date.getHours()).padStart(2, '0');
    const minutes = String(now_date.getMinutes()).padStart(2, '0');
    const seconds = String(now_date.getSeconds()).padStart(2, '0');
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const weekday = weekdays[now_date.getDay()]; // 获取星期几，注意星期天是0，星期一是1，依此类推
    date.value = `${year}年${month}月${day}日 星期${weekday}`;
    time.value = `${hours}:${minutes}:${seconds}`;
    const now_timestamp = performance.now();
    const dt = now_timestamp - lastTime.value;
    if (dt > 1000) {
        lastTime.value = now_timestamp;
    }
}

onMounted(() => {
    cron.value = setInterval(getCurrentDateTime);
    getdata().then((res: any) => {
        data.value = res;
        items.value.push({ key: '全部', label: '全部', content: h(card, { flag: '全部', data: res }) });
       
        res.forEach((item: any) => {
            keys.value.push(item.name)
            items.value.push({
                key: item.name,
                label: item.name,
                content: h(card, { flag: item.name, data: [item] }),
            })
        });
        checkCache();
    });
    
})
onUnmounted(() => clearInterval(cron.value))
</script>

<style scoped lang="less">
.container {
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;
    user-select: none;
    background-image: url("./assets/img/background.jpg"); //https://img.8845.top/good   https://img.8845.top/acg/loli2.php
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .header {
        height: 50px;
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 255, 255, 0.2);
        color: black;
        // box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);

        ::v-deep(.menu) {
            background-color: transparent;
            border-bottom: none;

            .hover-icon {
                color: black;
            }

            .ant-menu-item,
            .ant-menu-overflow-item {
                color: black;
                font-size: 16px;

                &::after,
                &::before {
                    border-bottom: none;
                }
                &:hover {
                    color: white;
                }
            }

            .ant-menu-item-selected,
            .ant-menu-submenu-selected {
                color: white;
                border-bottom: none;
            }
        }

        .datetime {
            display: flex;
            flex-direction: column;
            justify-content: center;
            word-break: keep-all;
            white-space: nowrap;
            text-align: center;
            margin-right: 15px;

            .time {
                font-size: 16px;
                font-weight: bold;
            }

            .date {
                font-size: 14px;
            }
        }
    }

    .body {
        height: calc(100dvh - 82px);
        padding: 0 15px;
        background-color: rgba(255, 255, 255, 0.2);
        // 标签栏固定，不收缩
        ::v-deep(.ant-tabs) {
            height: 100%;
            display: flex;
            flex-direction: column;
            .ant-tabs-nav {
                margin-bottom: 0;
                flex-shrink: 0;
                // 去掉tabs白色下划线
                // &::before {
                //     border: none;
                // }
            }
            // 内容区域填充剩余空间，可滚动
            .ant-tabs-content-holder {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .ant-tabs-content {
                height: 100%;
            }

            .ant-tabs-tabpane {
                height: 100%;
            }
            .ant-tabs-nav-more:hover {
                color: white;
            }
            .ant-tabs-nav-list .ant-tabs-tab .ant-tabs-tab-btn {
                font-size: 16px;
                &:hover {
                    color: white;
                }
            }
            
            .ant-tabs-nav-list .ant-tabs-tab-active .ant-tabs-tab-btn {
                color: white;
            }
            
            
        }
        ::v-deep(.ant-tabs .ant-tabs-tab-btn:focus:not(:focus-visible), .ant-tabs .ant-tabs-tab-remove:focus:not(:focus-visible), .ant-tabs .ant-tabs-tab-btn:active, .ant-tabs .ant-tabs-tab-remove:active) {
            color: white;
        }
    }

    .footer {
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #a0a4e5;
        background-color: rgba(255, 255, 255, 0.2);
        img {
            vertical-align: middle;
        }
        span:not(:first-child) {
            margin-left: 10px;
        }
    }
}
</style>