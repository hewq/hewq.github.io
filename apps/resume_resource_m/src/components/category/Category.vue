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

import { category } from '@data/data.ts';

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
    @include wh(p2r(700), p2r(500));
    box-sizing: border-box;
    padding: p2r(30);
    background-color: #fbf9ff;
    border-radius: p2r(10);
    .title {
        color: #2d2d2d;
        font-size: p2r(36);
        border-bottom: p2r(1) solid #f0e9ff;
        padding-bottom: p2r(10);
        margin-bottom: p2r(10);
        font-weight: 400;
    }

    .item {
        @include wh(100%, p2r(80));
        line-height: p2r(80);
        box-sizing: border-box;
        border-bottom: p2r(1) solid #f0e9ff;
        font-size: p2r(28);
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