<template>
    <div class="container">
        <div class="title">分类</div>
        <ul class="category">
            <li v-for="(item, index) in category" :key="item.id" class="item" :class="{active: curIndex === index}" @click="selectCategory(index, item.catagory)">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { category } from '@data/data';

@Component
export default class Category extends Vue {
    @Prop() private showBg!: boolean;

    private category = category;
    private curIndex = 0;

    public github (): void {
        window.location.href = 'https://github.com/hewq';
    }

    private selectCategory (index: number, value: string): void {
        this.curIndex = index;
        this.$emit('selectCategory', value);
    }
}
</script>

<style lang="scss" scoped>
@import '@styles/_function';

.container {
    @include wh(370px, 300px);
    box-sizing: border-box;
    padding: 30px;
    background-color: #fbf9ff;
    border-radius: 10px;
    .title {
        color: #2d2d2d;
        font-size: 20px;
        border-bottom: 1px solid #f0e9ff;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: 400;
    }

    .item {
        @include wh(100%, 50px);
        line-height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid #f0e9ff;
        font-size: 16px;
        cursor: pointer;
        color: #888888;

        &:hover {
            color: #2d2d2d
        }

        &.active {
            color: #2d2d2d
        }
    }
}
</style>