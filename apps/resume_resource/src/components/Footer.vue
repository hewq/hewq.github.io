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
    @include wh(100vw, 216px);
    box-sizing: border-box;
    background-color: #1d1d1d;
    padding: 30px 0 30px;

    .website {
        @include wh(284px, 80px);
        @include bg('~@images/thomas_website.gif');
        margin: 0 auto;
    }

    .copyright {
        border-top: 1px solid #454545;
        text-align: center;
        font-size: 16px;
        color: #a3a3a3;
        padding-top: 30px;
        width: 1200px;
        margin: 0 auto;
    }
}
</style>