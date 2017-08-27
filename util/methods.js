
//valida existencia de uma propriedade
exports.hasOwnProperty = (elm, param) => {
  return elm.hasOwnProperty(param);
}

//verifica existencia de um conjunto de propriedades
exports.hasOwnPropertyArr =(elm, params)=> {
  return params.some(Array.hasOwnProperty.bind(elm))
}

//valida nulidade
exports.validate = (e, param) =>{
  //FIXME - Não está validando nulidade corretamente. não
  return e.hasOwnProperty(param) && (e[param] || e[param] !== '' ||e[param] !== 0 || e[param] === false);
}

//valida nulidade de um conjunto
exports.validateArr = (e, params)=> {
  return !params.every(exports.validate.bind(e,e));
}

//Gera mensagens de erro
exports.exceptions =(name,res,error,status) =>{
  let msg =`exception[${name}]:${error}`;
  //TODO - tratamentos de mensagens de erro, para feedback.
  if(!isNaN(status) && status !==undefined) res.status(status)
  res.json({msg:msg})
}
