export default {
    template: `<div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-secondary text-white">
                            <h5 class="modal-title">新增/編輯 產品</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-4">
                                    <div div class = "form-group">
                                        <label for="inputImgUrl">輸入圖片網址</label>
                                        <input type="text" class="form-control" id="inputImgUrl" placeholder="請輸入圖片網址"
                                            v-model="tempData.imageUrl[0]">

                                    </div>
                                    <img :src="tempData.imageUrl[0]" alt="" class="img-fluid">
                                </div>
                                <div class="col-8">
                                    <div class="form-group">
                                        <label for="inputTitle">標題</label>
                                        <input type="text" class="form-control" id="inputTitle" placeholder="請輸入標題"
                                            v-model="tempData.title">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputCategory">分類</label>
                                            <input type="text" class="form-control" id='inputCategory'
                                                placeholder="請輸入分類" v-model="tempData.category">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputUnit">單位</label>
                                            <input type="text" class="form-control" id="inputUnit" placeholder="請輸入單位"
                                                v-model="tempData.unit">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputOriginalPrice">原價</label>
                                            <input type="number" class="form-control" placeholder="請輸入原價"
                                                id="inputOriginalPrice" v-model="tempData.origin_price">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputPrice">售價</label>
                                            <input type="number" class="form-control" placeholder="請輸入售價"
                                                id="inputPrice" v-model="tempData.price">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <label for="inputContent">產品描述</label>
                                        <textarea class="form-control" id="inputContent" rows="3"
                                            v-model="tempData.content"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputDescription">說明內容</label>
                                        <textarea class="form-control" id="inputDescription" rows="3"
                                            v-model="tempData.description"></textarea>
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="checkEnabled"
                                            v-model="tempData.enabled">
                                        <label class="form-check-label" for="checkEnabled">是否啟用</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="updateItem">確認</button>
                        </div>
                    </div>
                </div>`,
    data() {
        return {}
    },
    props: ['tempData', 'user'],
    methods: {
        updateItem() {
        
            const url = `${this.user.path}${this.user.uuid}/admin/ec/product/${this.tempData.id}`;
            const addurl = `${this.user.path}${this.user.uuid}/admin/ec/product`;
             //將token加入到header
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            
            if (this.tempData.id) {//有id，就編輯更新產品資訊
                axios.patch(url, this.tempData)
                    .then((res) => {
                        console.log(res);
                        this.$emit('update');
                    });
            } else {//沒有id，就新增一筆到遠端
                axios.post(addurl, this.tempData)//要注意資料需要的欄位都要有才能順利傳送
                    .then((res) => {
                        console.log(res);
                        this.$emit('update');
                        $('#productModal').modal('hide');
                    });
            
            }

        }
    }
}