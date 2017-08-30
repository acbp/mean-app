<template>
  <div>
    <h1>Lista de produtos</h1>
    <div class="container mt-5">

      <input type="text" v-model="postBody" @keypress.enter="getByName(postBody)" class="mb-4 mx-auto" placeholder="Pesquise um produto"/>
      <button type="button" class="btn btn-light" data-placement="top" title="Adicionar produto"  data-toggle="modal" data-target="#exampleModal">
        +
      </button>
      <div class="list-group" v-if="products && products.length">
          <a v-for="product in products" href="#" class="list-group-item list-group-item-action">
            {{product.name}}
          </a>
      </div>

      <div v-if="!products||products&&!products.length">
        {{noContent}}
        {{isLoading}}
      </div>
    </div>


    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Novo produto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <input type="email" class="form-control" id="productName" placeholder="Nome do produto">
              </div>
              <div class="form-group">
                <textarea class="form-control" id="productDescription" rows="3" placeholder="Descrição do produto"></textarea>
              </div>

              <div class="form-group">
                <input type="file" id="productFileUpload" accept=".png, .jpeg, .gif, .bmp, .tif, .tiff|images/*" name="foto" alt="foto" multiple>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data: () => ({
    postBody: '',
    isLoading: true,
    products: [],
    errors: []
  }),
  computed: {
    noContent: () => {
      if (this.isLoading) {
        return 'Carregando'
      }
      return 'Sem conteúdo.'
    }
  },
  created () {
    this.isLoading = true
    axios.get(`http://localhost:1337/api/products`)
    .then(response => {
      this.products = response.data
      this.isLoading = false
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  watch: {
    postBody: function () {
      this.isLoading = true
      if (this.postBody) {
        this.getByName(this.postBody)
      }
    }
  },
  methods: {
    getByName: _.debounce((query) => {
      let url = `http://localhost:1337/api/productsByName/${query}`
      axios.get(url)
      .then(response => {
        this.products = (response.data)
        this.isLoading = false
      })
      .catch(e => {
        this.errors.push(e)
      })
    }, 1000
    ),
    addProduct: () => {

    }
  }

}
</script>
