<template>
    <div class="container">
        <div class="left-wrap">
            <div class="company">{{ company }}</div>
            <div class="date">{{ date }} <br> <i class="el-icon-location-outline"></i>{{ address }}</div>
        </div>
        <div class="job">{{ job }}</div>
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
    @include wh(100%, 144px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    @include hover-effect();

    .left-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .company {
            font-size: 30px;
            color: #ffefae;
            padding: 10px 0;
        }

        .date {
            font-size: 15px;
            color: #ffffff;
            padding: 10px 0;
            line-height: 1.5;
            font-weight: 300;
        }
    }

    .job {
        font-size: 16px;
        color: #ffefae;
        padding-right: 10px;
    }
}
</style>