<template>
  <div>
    <loading :active.sync="isLoading" :zIndex="999"></loading>
    <div class="text-right">
      <button type="button" class="mb-3 btn btn-primary" data-toggle="modal" data-target="#productModal" @click="openModal('new',true)">新建產品</button>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col">價格</th>
          <th scope="col">是否上架</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in products" :key="key">
          <th scope="row">{{key}}</th>
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.price}}</td>
          <td>
            <div class="custom-control custom-switch">
              <input
                :id="item.id"
                v-model="item.enabled"
                type="checkbox"
                class="custom-control-input"
                @change="setProductPaid(item)"
              >
              <label
                class="custom-control-label"
                :for="item.id"
              >
                <strong
                  v-if="item.enabled"
                  class="text-success"
                >已上架</strong>
                <span
                  v-else
                  class="text-muted"
                >尚未上架</span>
              </label>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm mr-1" data-toggle="modal"  @click="openModal('edit', item)">編輯</button>
            <button type="button" class="btn btn-outline-danger btn-sm " data-toggle="modal"  @click="openModal('delete', item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @updatepage="getProduct"></Pagination>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modaltitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div
                  v-for="i in 5"
                  :key="i + 'img'"
                  class="form-group"
                >
                  <label :for="'img' + i">輸入圖片網址</label>
                  <input
                    :id="'img' + i"
                    v-model="tempProduct.imageUrl[i - 1]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      v-if="status.fileUploading"
                      class="fas fa-spinner fa-spin"
                    />
                  </label>
                  <input
                    id="customFile"
                    ref="file"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  >
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl[0]"
                  alt
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價"  v-model="tempProduct.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="optionsTitle">活動標題</label>
                  <input type="text" class="form-control" id="optionsTitle"
                    placeholder="請輸入內容" v-model="tempProduct.options.title">
                </div>
                <hr>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">產品描述</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.enabled"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataItem">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delData"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Pagination from '@/components/admin/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      status: {
        loadingItem: '',
      },
      tempProduct: {
        imageUrl: [],
        options: {
          title: '',
        }
      },
      fileUploading: false,
      isLoading: false,
      isNew: false,
      modaltitle: '',
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProduct(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.$http.get(api).then((res) => {
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      });
    },
    getDetails(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
      this.$http.get(api).then((response) => {
        this.tempProduct = response.data.data;
        this.tempProduct.options = response.data.data.options || {};
        $('#productModal').modal('show');
        this.isLoading = false;
      });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.modaltitle = '新增產品';
          this.tempProduct = {
            imageUrl: [],
            options: {
              title: '',
            }            
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.modaltitle = '編輯產品';
          this.isNew = false;
          this.getDetails(item.id);
          break;
        case 'delete':
          this.tempProduct = { ...item };
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    updataItem() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = 'post';
      let status = '新增產品成功';
      if (!this.isNew) {
        httpMethod = 'patch';
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        status = '更新產品成功';
      }
      this.$http[httpMethod](api, this.tempProduct).then((res) => {
        this.$bus.$emit('webmessage',
          status,
          'success');          
        this.getProduct();
      }).catch((error) => {
        this.$bus.$emit('webmessage',
          `更新出錯`,
          'danger');        
        this.isLoading = false;
        const errorData = error.response.data;
      });
      $('#productModal').modal('hide');
    },
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.status === 200) {
          this.$bus.$emit('webmessage',
          '檔案上傳成功',
          'success');            
          this.tempProduct.imageUrl.push(response.data.data.path);
        }
      }).catch(() => {
        this.$bus.$emit('webmessage',
          '檔案上傳失敗，請確認上傳不可超過 2 MB',
          'danger');        
        this.status.fileUploading = false;
      });
    },
    delData() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((res) => {
        this.$bus.$emit('webmessage',
        '刪除產品成功',
        'success');
        this.getProduct();
      });
      $('#delProductModal').modal('hide');
    },
    setProductPaid(item) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
      if (item.enabled) {
        item.enabled != item.enabled;
      }
      this.tempProduct = {
        category: item.category,
        content: item.content,
        enabled: item.enabled,
        imageUrl: item.imageUrl,
        origin_price: item.origin_price,
        price: item.price,
        title: item.title,
        unit: item.unit,
      };
      this.$http.patch(url, this.tempProduct).then(() => {
        this.getProduct();
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
