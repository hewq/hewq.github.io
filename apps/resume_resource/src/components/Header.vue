<template>
    <div class="container" :class="{bg: showBg}">
        <div class="content">
            <div class="title">Thomas' Website</div>
            <div class="nav">
                <router-link to="/home" class="nav-item">Home</router-link>
                <router-link to="/blog" class="nav-item">Blog</router-link>
                <router-link to="/github" class="nav-item">Github</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private showBg!: boolean;
}
</script>

<style lang="scss" scoped>
@import '@styles/_function';

$height: 206px;

.container {
    position: relative;
    @include wh(100vw, $height);

    .content {
        min-width: 810px;
        max-width: 1185px;
        height: $height;
        padding-top: 30px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        box-sizing: border-box;
    }

    .title {
        padding-left: 20px;
        color: #fff;
        font-weight: bold;
        font-size: 36px;
    }

    .nav {
        padding-right: 10px;

        .nav-item {
            color: #fff;
            font-size: 18px;
            margin: 0 10px;
            font-weight: bold;

            &:hover, &.router-link-exact-active {
                color:#35a22c;
            }

        }
    }

}

.bg {
    @include bg('~@images/banner.jpg', cover);
    background-image:linear-gradient(to right, rgba(42, 42, 42, 0.71), rgba(38, 40, 40, 0.78)), url('~@images/banner.jpg');
}

</style>