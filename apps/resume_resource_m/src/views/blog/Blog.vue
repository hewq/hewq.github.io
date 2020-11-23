<template>
    <div class="container">
        <Header :showBg="true" :page="'Blog'"></Header>
        <div class="content">
            <Category @selectCategory="selectCategory"></Category>
            <div class="list">
                <Block :curCategory="curCategory" v-for="item in curList" :key="item.title" :fileName="item.fileName" :img="item.img" :title="item.title" :tag="item.tag" :date="item.date"></Block>
            </div>
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
        @include wh(p2r(700), auto);
        margin: p2r(100) auto;
    }
}
</style>
