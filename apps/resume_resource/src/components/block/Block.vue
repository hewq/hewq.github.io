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
    @include wh(770px, auto);
    padding: 20px 0;

    .pic {
        @include wh(770px, 385px);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
        }
    }

    .title {
        padding: 30px 30px 10px;
        color: #2d2d2d;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            color: #03aaaa;
        }
    }

    .date {
        padding: 10px 30px 20px;
        color: #999999;
        font-size: 14px;
    }
}
</style>