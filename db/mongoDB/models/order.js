let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const autoIncrement = require('mongoose-sequence')(mongoose);
const seriesService = require('../../../services/seriesService');
const orderConstantsEnum = require('../../../constants/orderConstants');

const modelCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: modelCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema({
  orderId: { type:String },
  userId: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  status: { type:String },
  orderBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  totalAmount: {
    min:1,
    unique:false,
    type:Number,
    required:true
  },
  note: { type:String },
  isActive: {
    type:Boolean,
    default:true
  },
  isDelete: {
    type:Boolean,
    default:false
  },
  createdAt: { type:Date },
  updatedAt: { type:Date },
  addedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  updatedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  isDeleted: { type:Boolean }
}
,{ 
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
}
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  this.orderId = await seriesService.getNextSequenceString('order','orderId');
  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
      element.orderId = await seriesService.getNextSequenceString('order','orderId');
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const order = mongoose.model('order',schema);
module.exports = order;
