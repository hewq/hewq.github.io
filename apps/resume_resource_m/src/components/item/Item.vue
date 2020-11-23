<template>
    <div class="container">
        <div class="left-wrap">
            <div class="company">{{ company }}</div>
            <div class="job">{{ job }}</div>
            <div class="date">{{ date }}</div>
        </div>
        <div class="right-wrap">
            <i class="el-icon-location-outline"></i>{{ address }}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  @Prop() private company!: string;
  @Prop() private date!: string;
  @Prop() private job!: string;
  @Prop() private address!: string;
}
</script>

<style lang="scss" scoped>
@import '~@styles/_function';

.container {
    @include wh(100%, p2r(144));
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: p2r(10);
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    @include hover-effect();
    margin: p2r(10) 0;

    .left-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .company {
            font-size: p2r(30);
            color: #ffefae;
            padding: p2r(20) 0;
        }

        .date {
            font-size: p2r(15);
            color: #ffffff;
            padding: p2r(10) 0;
            line-height: 1.5;
            font-weight: 300;
        }

        .job {
            font-size: p2r(16);
            color: #ffffff;
            padding-right: p2r(10);
        }
    }

    .right-wrap {
        font-size: p2r(15);
        color: #ffffff;
        padding: p2r(10);
        line-height: 1.5;
        font-weight: 300;
    }

}
</style>