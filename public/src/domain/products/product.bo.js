const ProductBO = function ( API) {
  const ref = this;
  this.cacheAllProducts; // guarda ultima lista de produtos
  this.cacheAllCategories; // guarda ultima lista de categorias
  this.openModal;


  this.create=function (product ,toaster,sucesso,erro) {
    
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/products/modal.create.html',
        controller:'modalProductSaveCtrl',
        resolve:{
          config:function () {
            return {
              product:mapProduct({}),
              categories:ref.cacheAllCategories,
              title:'Criando produto',

              salvar:function (_products) {
                if(!_products){
                  return toaster.info("Há campos vazios")
                }
                ref.saveProduct(
                  _products,
                  function (response) {
                    modal.close();
                    _products.id=response.data.id;
                    toaster.success('Produto salva')

                    //ng-model não pegar input file
                    _products.pictures=document.querySelector("#imagefile");

                    if(_products.pictures){

                      ref.saveImage(
                        _products,
                        function (resp) {
                          toaster.success('Imagem foi salva.')
                          sucesso();
                        },
                        function functionName() {
                          toaster.error('Imagem não foi salva.')
                          erro();
                        }
                      );
                    }
                    else{
                      sucesso();
                    }
                  },
                  erro
                );
              } //salvar
            }; // resolve
          }
        }
      }
    )
  }

  /**
  * Edita produto
  */
  this.edit=function (product ,toaster,sucesso,erro) {
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/products/modal.create.html',
        controller:'modalProductSaveCtrl',
        resolve:{
          config:function () {
            return {
              product:product,
              edit:true,
              categories:ref.cacheAllCategories,
              title:'Editando produto',

              deletarImagem:function (_products) {
                if(_products)
                ref.deleteImage(
                  _products.pictures.picture_id,
                  function () {
                    toaster.success("Imagem deletada")
                    _products.pictures={};
                  }
                )
              },

              salvar:function (_products) {
                if(!_products){
                  return toaster.info("Há campos vazios")
                }
                ref.updateProduct(
                  _products,
                  function (response) {
                    modal.close();
                    _products.id=response.data.id;
                    toaster.success('Produto atualizado')

                    //ng-model não pegar input file
                    _products.pictures=document.querySelector("#imagefile");

                    if(_products.pictures){
                      ref.saveImage(
                        _products,
                        sucesso,
                        erro
                      );
                    }else {
                      sucesso()
                    }
                  },
                  erro
                );
              } //salvar
            }; // resolve
          }
        }
      }
    )
  }

  /**
  * Envia imagem de produto
  */
  this.saveImage = function (product,sucesso,erro) {
    var options={
        headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    var formData;
    for (var i = 0; i < product.pictures.files.length; i++) {
      formData = new FormData();
      formData.append("image", product.pictures.files[i]);
      API.uploadImage(product.id,formData,options).then(sucesso,erro)
    }
  }

  /**
  * Cria produto
  */
  this.saveProduct=function (product,sucesso,erro) {
    if(!product||!product.name ||!product.description ){
      return erro();
    }
    API.saveProduct(product).then(sucesso,erro)
  }

  /**
  * Atualiza produto
  */
  this.updateProduct=function (product,sucesso,erro) {
    if(!product||!product.name ||!product.description ){
      return erro();
    }
    API.updateProduct(product).then(sucesso,erro)
  }

  /**
  * Exibe produto
  */
  this.view=function (product ,s,e) {
    var _categories =ref.cacheAllCategories.reduce(function (acc,e) {
      if(product.categories.some(function (ee) {
        return ee === e.id;
      }) ) acc.push(e)
      return acc;
    },[] );
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/products/modal.product.html',
        controller:'modalProductCtrl',
        resolve:{
          product:function () {
            return product;
          },
          categories:function () {
            return _categories
          }
        }
      }
    )
  }

  /**
  * Exibe produto
  */
  this.delete=function (product,sucesso,erro) {
    var modalInstance = ref.openModal(
      {
        templateUrl:'src/domain/common/modal.delete.html',
        controller:'modalDeleteCtrl',
        size:"sm"
      }
    )

    modalInstance.result.then( ref.delProduct.bind({},product.id,sucesso,erro));
  }

  /**
  * Deleta um produto por id
  */
  this.delProduct = function (id,sucesso,erro) {
    if(!id){
      return error_delProduct(erro);
    }
    API.deleteProduct(id).then(
      success_delProduct.bind({},sucesso),
      error_delProduct.bind({},erro),
    )
  }

  /**
  * Tratamento de erro para 'delProduct'
  */
  function error_delProduct(callback,response) {
    callback(response)
  }

  /**
  * Tratamento de sucesso para 'delProduct'
  */
  function success_delProduct(callback,response) {
    callback(response)
  }

  /**
  * Realiza busca e aplica tratamentos.
  */
  this.searchProductCategoryName=function (name,sucesso,erro) {
    if(!name){
      return ref.getAllProducts(sucesso,erro);
    }

    API.searchProductCategoryName(name)
    .then(
      success_searchProductCategoryName.bind({},sucesso),
      error_searchProductCategoryName.bind({},erro),
    )
  }

  /**
  * tratamento de erro de searchProductCategoryName
  */
  function error_searchProductCategoryName(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de searchProductCategoryName
  */
  function success_searchProductCategoryName(callback,response) {
    response = response.data;
    callback(response);
  }

  /**
  * Realiza busca e aplica tratamentos.
  */
  this.searchProductName=function (name,sucesso,erro) {
    if(!name){
      return ref.getAllProducts(sucesso,erro);
    }

    API.searchProductName(name)
    .then(
      success_searchProductName.bind({},sucesso),
      error_searchProductName.bind({},erro),
    )
  }

  /**
  * tratamento de erro de searchProductName
  */
  function error_searchProductName(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de searchProductName
  */
  function success_searchProductName(callback,response) {
    response = response.data;
    callback(response);
  }

  /**
  * Realiza busca e aplica tratamentos em produtos .
  */
  this.getAllProducts=function (sucesso,erro) {
    API.getAllProducts()
    .then(
      success_getAllProducts.bind({},sucesso),
      error_getAllProducts.bind({},erro),
    )
  }

  /**
  * tratamento de erro de getAllProducts
  */
  function error_getAllProducts(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de getAllProducts
  */
  function success_getAllProducts(callback,response) {
    response = cacheAllProducts= response.data.map(mapProduct);
    callback(response);
  }

  /**
  * Formata array de produtos
  */
  function mapProduct(e ,i ,a) {
    return {
      name:e.name||'',
      id:e._id,
      description:e.description||'',
      categories:e.categories||[],
      // aplica origin do servidor local
      pictures:e.pictures&&e.pictures.map(function (ee) {
        ee.src=location.origin+ee.src;
        return ee;
      })
    }
  }
};
