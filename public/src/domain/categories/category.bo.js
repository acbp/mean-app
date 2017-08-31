const CategoryBO = function ( API ) {
  const ref = this;

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
