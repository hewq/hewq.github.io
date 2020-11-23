<template>
    <div class="container">
        <div class="website"></div>
        <div class="copyright">Copyright © 2020 Thomas' Website. All rights reserved</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@styles/_function';

.container {
    @include wh(100vw, p2r(216));
    box-sizing: border-box;
    background-color: #1d1d1d;
    padding: p2r(30) 0 p2r(30);

    .website {
        @include wh(p2r(284), p2r(80));
        @include bg('~@images/thomas_website.gif');
        margin: 0 auto;
    }

    .copyright {
        border-top: p2r(1) solid #454545;
        text-align: center;
        font-size: p2r(16);
        color: #a3a3a3;
        padding-top: p2r(30);
        width: p2r(700);
        margin: 0 auto;
    }
}
</style>