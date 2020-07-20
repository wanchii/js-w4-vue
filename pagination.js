Vue.component('pagination', {

    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{disabled:pages.current_page===1}">
            <a class="page-link" href="#" @click.prevent="clickPage(pages.current_page-1)">Prev</a>
            </li>
        <li class="page-item" v-for="(item,index) in pages.total_pages" :key="index" :class="{active:item===pages.current_page}">
            <a class="page-link" href="#" @click.prevent="clickPage(item)">{{ item }}</a>
        </li>
    
        <li class="page-item" :class="{disabled:pages.current_page===pages.total_pages}">
            <a class="page-link" href="#" @click.prevent="clickPage(pages.current_page+1)">Next</a>
        </li>
    </ul>
</nav>`,
    data() {
        return {

        }
    },
    props: { //由外傳內的資訊
        pages: {},
    },
    methods: {
        clickPage(i) { //點擊頁碼產生的號碼
            this.$emit('update', i);
        
        }

    },
    
});