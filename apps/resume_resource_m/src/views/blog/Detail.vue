<template>
    <div class="container">
        <Header :showBg="true" :page="'Blog'"></Header>
        <Card class="content markdown" v-html="content"></Card>
        <Footer :showBg="true"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@components/header/Header.vue';
import Footer from '@components/footer/Footer.vue';
import { Card } from 'element-ui';
import request from '@utils/request.ts';
import HyperDown from 'hyperdown';

@Component({
    components: {
        Header,
        Footer,
        Card
    }
})

export default class Detail extends Vue {
    private content = '';

    created (): void {
        const parser = new HyperDown();

        const query = this.$route.query;

        request
            .get(`/blog/${query.category}/${query.fileName}.md`)
            .then((res) => {
                this.content = parser.makeHtml(res.data);
            });
    }
}
</script>

<style lang="scss" scoped>
@import '~@styles/_function';

.container {
    .content {
        @include wh(p2r(620), auto);
        margin: p2r(100) auto;
        padding: p2r(30);
    }
}
</style>