let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');

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
  firstName: {
    type:String,
    match:/^[A-Za-z]+$/g,
    required:false,
    unique:false,
    uniqueCaseInsensitive:true
  },
  lastName: {
    type:String,
    match:/^[A-Za-z]+$/g,
    required:false,
    unique:false,
    uniqueCaseInsensitive:true
  },
  name: {
    type:String,
    match:/^[A-Za-z]+$/g,
    required:false,
    unique:false,
    uniqueCaseInsensitive:true
  },
  profile: { type:String },
  contactNumber: {
    type:String,
    match:/^[0-9]+$/g,
    required:false,
    unique:false,
    uniqueCaseInsensitive:true
  },
  email: {
    type:String,
    required:true,
    unique:false,
    lowercase:false,
    trim:false,
    uniqueCaseInsensitive:true
  },
  isActive: {
    type:Boolean,
    default:true
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
  isDeleted: { type:Boolean },
  userId: {
    ref:'user',
    type:Schema.Types.ObjectId
  }
}
,{ 
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
}
);
schema.index({ 'firstName':1 },{ 'name':'index_firstName' });
schema.index({ 'lastName':1 },{ 'name':'index_lastName' });
schema.pre('save',async function (next){
  // 'this' refers to the current document about to be saved
  const user = this;

  user.name = `${user.firstName}, ${user.lastName}`;
  
  next();
});
schema.post('save',async function (docs,next){
  // 'this' refers to the current document about to be saved
  const user = this;

  user.name = `${user.firstName}, ${user.lastName}`;
  
  next();
});
    
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
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

const customer = mongoose.model('customer',schema);
module.exports = customer;
