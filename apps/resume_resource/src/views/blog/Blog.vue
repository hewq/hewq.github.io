<template>
    <div class="container">
        <Header :showBg="true"></Header>
        <div class="content">
            <div class="list">
                <Block :curCategory="curCategory" v-for="item in curList" :key="item.title" :fileName="item.fileName" :img="item.img" :title="item.title" :tag="item.tag" :date="item.date"></Block>
            </div>
            <Category @selectCategory="selectCategory"></Category>
        </div>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@components/header/Header.vue';
import Category from '@components/category/Category.vue';
import Block from '@components/block/Block.vue';
import Footer from '@components/footer/Footer.vue';

import { hasKey } from '@utils/utils.ts';
import { list } from '@data/data.ts';

declare interface Article {
    fileName: string;
    img: string;
    title: string;
    tag: string;
    date: string;
}

@Component({
    components: {
        Header,
        Category,
        Block,
        Footer
    }
})

export default class Blog extends Vue {
    private list = list;

    private curCategory = 'phaser';

    get curList (): Article[] | void {
        if (hasKey(this.list, this.curCategory)) {
            return this.list[this.curCategory];
        }
    }

    private selectCategory (value: string): void {
        this.curCategory = value;
    }
}

</script>

<style lang="scss" scoped>
@import '@styles/_function';

.container {
    .content {
        @include wh(1200px, auto);
        margin: 100px auto;
        display: flex;
        justify-content: space-between;
    }
}
</style>
