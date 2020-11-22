<template>
    <div class="container">
        <Header :showBg="true"></Header>
        <Card class="content markdown" v-html="content">
        </Card>
        <Footer :showBg="true"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@components/header/Header.vue';
import Footer from '@components/footer/Footer.vue';
import { Card } from 'element-ui';
import request from '@utils/request';
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

        console.log(this.$route.query);

        const query = this.$route.query;

        request.get(`/blog/${query.category}/${query.fileName}.md`).then((res) => {
            console.log(res);
            this.content = parser.makeHtml(res.data);
        });
    }

    mounted (): void {
        console.log(this.$route.query);
    }
}
</script>

<style lang="scss" scoped>
@import '~@styles/_function';

.container {
    .content {
        @include wh(1200px, auto);
        margin: 100px auto;
        padding: 30px;

        h1 {
            margin: 10px 0;
        }

        table {
            border: 1px solid #000;
        }
    }
}
</style>