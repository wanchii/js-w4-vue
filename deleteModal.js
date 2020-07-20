export default {
    template: `<div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-danger">
                            <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            是否刪除 {{ tempData.title }} 商品(刪除後將無法恢復)。
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-danger" @click="deleteItem">確認刪除</button>
                        </div>
                    </div>
                </div> `,
    data() {
        return {}
    },
    props: ['tempData', 'user'],
    methods: {
        deleteItem() {

            const url = `${this.user.path}${this.user.uuid}/admin/ec/product/${this.tempData.id}`;
            //將token加入到header
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.delete(url).then(() => {
                this.$emit('update');
                $('#deleteModal').modal('hide');
            });

        }
    }
}