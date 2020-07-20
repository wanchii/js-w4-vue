
//取得所有商品路徑- GET api/{uuid}/admin/ec/products
//https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products

import modal from './productModal'; // 把元件匯入all.js
import delModal from './deleteModal.js'; 

Vue.component('modal',modal);//元件註冊
Vue.component('delModal',delModal);

new Vue({
    el: '#app',
    data: {
        products: [],
        pagination: {},
        tempData: {
            imageUrl: [],//因為是第二層所以先定義
        },
        user: {
            token: '',
            uuid: '326aaf6a-8ca5-4a46-b815-11a755b4a30c',
            path: 'https://course-ec-api.hexschool.io/api/'
        }
    },
    created() { // 資料已建立階段
        // 從cookies取得token
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // console.log('token', this.user.token);
        // 若無法取得 token 則返回 Login 頁面
        if (this.user.token === '') {
            window.location = 'login.html';
        }

        this.getProducts();
    },
    methods: {
        getProducts(page = 1) {
            // console.log(page);
            const api = `${this.user.path}${this.user.uuid}/admin/ec/products?page=${page}`;
            //將token加入到header
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            //用axios-get取得資料
            axios.get(api).then((response) => {
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
                // console.log(response);
                // console.log(this.products);
                // console.log(this.pagination);
                if(this.tempData.id){
                    this.tempData={
                        imageUrl: [],
                    }
                    $("#productModal").modal("hide");
                }

            });
        },
        openModal(action, item) {
            switch (action) {
                case 'new'://新增
                    this.tempData = { // 給新的參考路徑，並定義第二層物件的屬性
                        imageUrl: [],
                    };
                    $('#productModal').modal('show');
                    break;
                case 'edit': //編輯
                
                    const url = `${this.user.path}${this.user.uuid}/admin/ec/product/${item.id}`;
                    axios.get(url)
                        .then((res) =>{
                            this.tempData=res.data.data;
                            console.log(this.tempData);
                            $('#productModal').modal('show');
                        });
                    this.tempData = JSON.parse(JSON.stringify(item)); //物件深拷貝
                    break;
                case 'delete'://刪除
                    this.tempData = JSON.parse(JSON.stringify(item)); //物件深拷貝
                    $('#deleteModal').modal('show');
                    break;
                default:
                    break;
            }
        },
    
    },
});