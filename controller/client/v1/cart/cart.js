const response = require('../../../../utils/response'); 
const responseHandler = require('../../../../utils/response/responseHandler'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 

const addCart = (addCartUsecase) => async (req,res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'createdAt':(Date.now()).toString(),
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToCreate
    };
    dataToCreate.addedBy = req.user.id;
    let result = await addCartUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkInsertCart = (bulkInsertCartUsecase)=> async (req,res) => {
  try {
    let dataToCreate = [...req.body.data];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'createdAt':(Date.now()).toString(),
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...dataToCreate[i],
        addedBy:req.user.id,
      };
    }
    let result = await bulkInsertCartUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const findAllCart = (findAllCartUsecase) => async (req,res) => {
  try {
    let query = { ...req.body.query || {} };
    let options = { ...req.body.options || {} };
    let result = await findAllCartUsecase({
      query,
      options,
      isCountOnly:req.body.isCountOnly || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getCart = (getCartUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest());
    }
    let query = { _id: req.params.id };
    let options = {};
    let result = await getCartUsecase({
      query,
      options
    },req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getCartCount = (getCartCountUsecase) => async (req,res) => {
  try {
    let where = { ...req.body.where || {} };
    let result = await getCartCountUsecase({ where },req,res);  
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const updateCart = (updateCartUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let dataToUpdate = { ...req.body || {} };
    let query = { _id: req.params.id };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    dataToUpdate = {
      ...{
        'updatedAt':(Date.now()).toString(),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToUpdate,
    };
    let result = await updateCartUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkUpdateCart = (bulkUpdateCartUsecase) => async (req,res) => {
  try {
    let dataToUpdate = { ...req.body.data || {} };
    let query = { ...req.body.filter || {} };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    dataToUpdate = {
      ...{
        'updatedAt':(Date.now()).toString(),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToUpdate,
    };
    let result = await bulkUpdateCartUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const partialUpdateCart = (partialUpdateCartUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;
    let result = await partialUpdateCartUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteCart = (softDeleteCartUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteCartUsecase({
      query,
      dataToUpdate,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteCart = (deleteCartUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let result = await deleteCartUsecase({
      query,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteManyCart = (deleteManyCartUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    let result = await deleteManyCartUsecase({
      query,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteManyCart = (softDeleteManyCartUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteManyCartUsecase({
      query,
      dataToUpdate,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

module.exports = {
  addCart,
  bulkInsertCart,
  findAllCart,
  getCart,
  getCartCount,
  updateCart,
  bulkUpdateCart,
  partialUpdateCart,
  softDeleteCart,
  deleteCart,
  deleteManyCart,
  softDeleteManyCart
};
