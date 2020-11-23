<template>
    <div class="wrap-card">
        <Card :body-style="{ padding: '0px' }" class="card">
            <div class="pic">
                <img :src="img" alt="">
            </div>
            <router-link :to="{path: '/detail', query: {category: curCategory, fileName: fileName}}"><div class="title">{{ title }}</div></router-link>
            <div class="date">{{ tag }}, {{ date }}</div>
        </Card>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Card } from 'element-ui';

@Component({
    components: {
        Card
    }
})
export default class Block extends Vue {
    @Prop() private fileName!: string;
    @Prop() private img!: string;
    @Prop() private title!: string;
    @Prop() private tag!: string;
    @Prop() private date!: string;
    @Prop() private curCategory!: string;
}
</script>

<style lang="scss" scoped>
@import '~@styles/_function';

.wrap-card {
    @include wh(p2r(700), auto);
    padding: p2r(20) 0;

    .pic {
        @include wh(p2r(700), p2r(385));
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
        }
    }

    .title {
        padding: p2r(30) p2r(30) p2r(10);
        color: #2d2d2d;
        font-size: p2r(24);
        font-weight: bold;
        cursor: pointer;

        &:hover {
            color: #03aaaa;
        }
    }

    .date {
        padding: p2r(10) p2r(30) p2r(20);
        color: #999999;
        font-size: p2r(14);
    }
}
</style>