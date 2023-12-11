const response = require('../../../../utils/response'); 
const responseHandler = require('../../../../utils/response/responseHandler'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 

const addOrderItem = (addOrderItemUsecase) => async (req,res) => {
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
    let result = await addOrderItemUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkInsertOrderItem = (bulkInsertOrderItemUsecase)=> async (req,res) => {
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
    let result = await bulkInsertOrderItemUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const findAllOrderItem = (findAllOrderItemUsecase) => async (req,res) => {
  try {
    let query = { ...req.body.query || {} };
    let options = { ...req.body.options || {} };
    let result = await findAllOrderItemUsecase({
      query,
      options,
      isCountOnly:req.body.isCountOnly || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getOrderItem = (getOrderItemUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest());
    }
    let query = { _id: req.params.id };
    let options = {};
    let result = await getOrderItemUsecase({
      query,
      options
    },req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getOrderItemCount = (getOrderItemCountUsecase) => async (req,res) => {
  try {
    let where = { ...req.body.where || {} };
    let result = await getOrderItemCountUsecase({ where },req,res);  
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const updateOrderItem = (updateOrderItemUsecase) => async (req,res) =>{
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
    let result = await updateOrderItemUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkUpdateOrderItem = (bulkUpdateOrderItemUsecase) => async (req,res) => {
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
    let result = await bulkUpdateOrderItemUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const partialUpdateOrderItem = (partialUpdateOrderItemUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;
    let result = await partialUpdateOrderItemUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteOrderItem = (softDeleteOrderItemUsecase) => async (req,res)=>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteOrderItemUsecase({
      query,
      dataToUpdate
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteOrderItem = (deleteOrderItemUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let result = await deleteOrderItemUsecase(query,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteManyOrderItem = (deleteManyOrderItemUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    let result = await deleteManyOrderItemUsecase(query,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteManyOrderItem = (softDeleteManyOrderItemUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await softDeleteManyOrderItemUsecase({
      query,
      dataToUpdate
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

module.exports = {
  addOrderItem,
  bulkInsertOrderItem,
  findAllOrderItem,
  getOrderItem,
  getOrderItemCount,
  updateOrderItem,
  bulkUpdateOrderItem,
  partialUpdateOrderItem,
  softDeleteOrderItem,
  deleteOrderItem,
  deleteManyOrderItem,
  softDeleteManyOrderItem
};
