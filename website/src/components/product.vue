<template>
  <div>
    <h1>Lista de produtos</h1>
    <div class="container mt-5">

      <input type="text" v-model="query" @keypress.enter="getByName(query)" class="mb-4 mx-auto" placeholder="Pesquise um produto"/>
      <button type="button" class="btn btn-light" data-placement="top" title="Adicionar produto"  data-toggle="modal" data-target="#exampleModal">
        +
      </button>
      <div class="card-deck" v-if="products && products.length">
        <div class="card" v-for="prod in products">
          <img class="card-img-top" :src="'http://localhost:1337'+prod.pictures[0].src" alt="prod.pictures[0].filename" v-if="prod.pictures[0]">
          <div class="card-body">
            <h4 class="card-title">{{prod.name}}</h4>
            <p class="card-text">{{prod.description}}</p>
          </div>
        </div>
      </div>

      <div class="list-group" v-if="products && products.length">
          <a v-for="product in products" href="#" class="list-group-item list-group-item-action">
            {{product.name}}
          </a>
      </div>

      <div v-if="!products||products&&!products.length">
        {{noContent}}
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

          <div class="modal-body" >

            <form>
              <div class="form-group">
                <input type="email" class="form-control" id="productName" placeholder="Nome " v-model="newProduct.name">
              </div>

              <div class="form-group">
                <textarea class="form-control" id="productDescription" rows="3" placeholder="Descrição" v-model="newProduct.description"></textarea>
              </div>

              <div class="form-group">

                <button type="button" class="btn btn-info mb-2" aria-label="Adicionar mais fotos" @click="addImage()">
                  Adicionar fotos
                </button>

                <div class="input-group" v-for="(image, index) in images">
                    <input  class="form-control"
                            type="file"
                            :id="image.name='image'+index"
                            :disabled="image.disabled"
                            accept=".png, .jpeg, .gif, .bmp, .tif, .tiff|images/*"
                            name="foto"
                            alt="foto">

                    <span class="input-group-btn">
                      <button class="btn btn-secondary"
                              v-bind:class="image.cls"
                              disabled="true"
                              type="button"
                              @click="upload(image)">
                        {{image.text}}
                      </button>

                      <button class="btn btn-dark"
                              v-bind:class="image.cls"
                              :disabled="image.disabled"
                              type="button"
                              @click="remImage(index)">
                        X
                      </button>
                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <h6>Categorias</h6>

                  <label :for="category.name" class="btn btn-light" v-bind:class="{ 'btn-dark': category.selected }" v-for="category in categories">
                    {{category.name}}
                    <input type="checkbox" :id="category.name" class="badgebox"
                    :value="category.id"
                    @click="category.selected=!category.selected"
                    v-model="newProduct.categories">
                    <span class="badge">&check;</span>
                  </label>

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

const uploadImage = (data, success, error) => {
  axios.post('http://localhost:1337/api/products/picture/59a6cdca2319e027435743cb', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(error)
}

const imageFact = () => ({
  text: 'Enviar',
  cls: '',
  disabled: false,
  name: ''
})

const prodFact = () => ({
  name: '',
  description: '',
  categories: []
})

export default {
  data () {
    return {
      query: '',
      isLoading: true,
      images: [],
      products: [],
      categories: [],
      newProduct: prodFact()
    }
  },
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
      this.products = response.data.map((e) => ({
        name: e.name,
        id: e._id,
        pictures: e.pictures,
        categories: e.categories
      }))
      this.isLoading = false
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get(`http://localhost:1337/api/categories`)
    .then(response => {
      this.categories = response.data.map((e) => {
        return {
          name: e.name,
          selected: false,
          id: e._id
        }
      })
      this.isLoading = false
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  watch: {
    query: function () {
      this.isLoading = true
      if (this.query) {
        this.getByName(this.query)
      }
    }
  },
  methods: {
    getByName: _.debounce((query) => {
      let url = `http://localhost:1337/api/productsByName/${query}`
      axios.get(url)
      .then(response => {
        this.products = [response.data]
        this.isLoading = false
      })
      .catch(e => {})
    }, 1000
    ),
    // adiciona novo campo de imagem
    addImage () {
      this.images.push(imageFact())
    },
    addCategory (id) {
      this.newProduct.categories.push(id)
    },
    addProduct () {
      this.newProduct = prodFact()
    },
    remImage (i) {
      this.images.splice(i, 1)
    },
    uploadAllImages () {
      this.images.every((e) => {
        this.upload(e)
      })
    },
    // faz upload de cada imagem
    upload (elm) {
      if (this.newProduct.id) {
        return alert('produto ainda não foi salvo.')
      }
      let imagefile = document.querySelector('#' + elm.name)
      if (imagefile && imagefile.files && imagefile.files.length) {
        let formData
        for (let i = 0; i < imagefile.files.length; i++) {
          formData = new FormData()
          formData.append('image', imagefile.files[i])
          // muda estado do botão em sucesso ou erro
          uploadImage(formData,
          () => {
            elm.cls = 'btn-success'
            elm.disabled = true
            elm.text = 'Enviado.'
          },
          () => (elm.cls = 'btn-danger'))
        }
      }
    }
  }
}

</script>
<style scope>
.badgebox
{
    opacity: 0;
}

.badgebox + .badge
{
    text-indent: -999999px;
	width: 27px;
}

.badgebox:focus + .badge
{
    box-shadow: inset 0px 0px 5px;
}

.badgebox:checked + .badge
{
	text-indent: 0;
}
</style>
