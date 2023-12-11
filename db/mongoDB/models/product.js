let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const autoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');
const productConstantsEnum = require('../../../constants/productConstants');

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
  name: {
    type:String,
    minLength:1,
    required:true,
    unique:true,
    lowercase:false,
    trim:false,
    uniqueCaseInsensitive:true
  },
  description: { type:String },
  price: {
    type:Number,
    min:0,
    unique:false,
    required:true
  },
  inventoryCount: {
    type:Number,
    min:0,
    default:0,
    unique:false,
    required:false
  },
  productType: { type:String },
  isDeleted: { type:Boolean },
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
  }
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

schema.plugin(uniqueValidator);

const product = mongoose.model('product',schema);
module.exports = product;
