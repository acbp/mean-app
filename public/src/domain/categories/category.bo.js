const CategoryBO = function ( API ) {
  const ref = this;
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
  this.getAllCategories=function (sucesso,erro,cache) {
    if(cache){
      cache=JSON.parse(localStorage.getItem('getAllCategories'))
      if(cache){
        return success_getAllCategories(sucesso,cache,false)
      }
    }
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
  function success_getAllCategories(callback,response,cache) {
    if(!cache){
      localStorage.setItem('getAllCategories',JSON.stringify(response))
    }
    response = response.data;
    callback(response);
  }

}
