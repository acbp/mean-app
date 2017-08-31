const CategoryBO = function ( API ) {
  const ref = this;

  this.create=function (category ,toaster,sucesso,erro) {
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/categories/modal.create.html',
        controller:'modalCategorySaveCtrl',
        resolve:{
          config:function () {
            return {
              category:category,
              title:'Criando categoria',

              salvar:function (_categories) {
                ref.saveCategory(
                  _categories,
                  function (response) {
                    modal.close();
                    _categories.id=response.data.id;
                    toaster.success('Categoria salva')

                    //ng-model não pegar input file
                    _categories.pictures=document.querySelector("#imagefile");
                    modal.close();
                    if(_categories.pictures)
                    ref.saveImage(
                      _categories,
                      function (resp) {
                        toaster.success('Imagem foi salva.')
                        sucesso();
                      },
                      function functionName() {
                        toaster.error('Imagem não foi salva.')
                        erro();
                      }
                    );
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
  * Exibe produto
  */
  this.edit=function (category ,toaster,sucesso,erro) {
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/categories/modal.create.html',
        controller:'modalCategorySaveCtrl',
        resolve:{
          config:function () {
            return {
              category:category,
              edit:true,
              title:'Editando categoria',

              deletarImagem:function (_categories) {
                ref.deleteImage(
                  _categories.pictures.picture_id,
                  function () {
                    toaster.success("Imagem deletada")
                    _categories.pictures={};
                  }
                )
              },

              salvar:function (_categories) {
                ref.updateCategory(
                  _categories,
                  function (response) {
                    _categories.id=response.data.id;
                    toaster.success('Categoria atualizada')

                    //ng-model não pegar input file
                    _categories.pictures=document.querySelector("#imagefile");

                    if(_categories.pictures)
                    ref.saveImage(
                      _categories,
                      sucesso,
                      erro
                    );
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

  this.saveImage = function (category,sucesso,erro) {
    var options={
        headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    var formData = new FormData();
    formData.append("image", category.pictures.files[0]);
    API.uploadImage(category.id,formData,options).then(sucesso,erro)
  }

  this.saveCategory=function (category,sucesso,erro) {
    if(!category||!category.name ||!category.description ){
      return erro();
    }
    API.saveCategory(category).then(sucesso,erro)
  }
  this.updateCategory=function (category,sucesso,erro) {
    if(!category||!category.name ||!category.description ){
      return erro();
    }
    API.updateCategory(category).then(sucesso,erro)
  }

  /**
  * Deleta imagem de um categoria
  */
  this.deleteImage = function (id,sucesso,erro) {
    if(!id){
      return error_deleteImage(erro)
    }
    API.deleteImage(id)
    .then(
      success_deleteImage.bind({},sucesso),
      error_deleteImage.bind({},erro),
    )
  }

  /**
  * Tratamento de sucesso para 'deleteImage'
  */
  function success_deleteImage(callback,response) {
    callback(response)
  }

  /**
  * Tratamento de error para 'deleteImage'
  */
  function error_deleteImage(callback,response) {
    callback(response)
  }

  /**
  * Exibe produto
  */
  this.view=function (category ,s,e) {
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/categories/modal.category.html',
        controller:'modalCategoryCtrl',
        resolve:{
          category:function () {
            return category;
          }
        }
      }
    )
  }

  /**
  * Exibe produto
  */
  this.delete=function (category,sucesso,erro) {
    var modalInstance = ref.openModal(
      {
        templateUrl:'src/domain/common/modal.delete.html',
        controller:'modalDeleteCtrl',
        size:"sm"
      }
    )

    modalInstance.result.then( ref.del.bind({},category.id,sucesso,erro) );
  }

  /**
  * Deleta um produto por id
  */
  this.del = function (id,sucesso,erro) {
    if(!id){
      return error_del(erro);
    }
    API.deleteCategory(id).then(
      success_del.bind({},sucesso),
      error_del.bind({},erro),
    )
  }

  /**
  * Tratamento de erro para 'del'
  */
  function error_del(callback,response) {
    callback(response)
  }

  /**
  * Tratamento de sucesso para 'del'
  */
  function success_del(callback,response) {
    callback(response)
  }

  /**
  * Realiza busca e aplica tratamentos.
  */
  this.searchCategoryName = function (name,sucesso,erro) {
    if(!name){
      return ref.getAllCategories(sucesso,erro);
    }

    API.searchCategoryName(name)
    .then(
      success_searchCategoryName.bind({},sucesso),
      error_searchCategoryName.bind({},erro),
    )
  }

  /**
  * tratamento de erro de searchCategoryName
  */
  function error_searchCategoryName(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de searchCategoryName
  */
  function success_searchCategoryName(callback,response) {
    response = response.data;
    callback(response);
  }

  /**
  * Realiza busca e aplica tratamentos em categorias.
  */
  this.getAllCategories=function (sucesso,erro) {
    API.getAllCategories()
    .then(
      success_getAllCategories.bind({},sucesso),
      error_getAllCategories.bind({},erro),
    )
  }

  /**
  * tratamento de erro de getAllCategories
  */
  function error_getAllCategories(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de getAllCategories
  */
  function success_getAllCategories(callback,response) {
    response = response.data.map(mapCategories);
    callback(response);
  }

  function mapCategories(e) {
    return{
      id:e._id,
      name:e.name,
      description:e.description,
      pictures:e.pictures
    }
  }

}
