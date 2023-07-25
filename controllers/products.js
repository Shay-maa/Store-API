const product = require('../models/products')

const getAllProductsStatic = async(req,res)=>{
   const products = await product.find({price: {$gt: 30}}).sort('price').select('name price')
   
   res.status(200).json({products, nbHits: product.length})
}

const getAllProducts = async(req,res)=>{
   const {featured , company , name, sort, fields, numericFilters} = req.query;
   const queryObject = {};
   if(featured){
      queryObject.featured = featured === 'true' ? true : false;
   }
   if(company){
      queryObject.company = company;
   }
   if(name){
      queryObject.name = { $regex: name, $options:'i'}
   }

   if(numericFilters){
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace (
         regEx,
         (match)=>`-${operatorMap[match]}-`
      );
      filters = filters.split(',').forEach(element => {
         const [field , operator, value] = element.split('-');
         if(options.includes(field)){
            queryObject[field] = { [operator]: Number(value)};
         }
      });

   }

   let result = product.find(queryObject);

   if(sort){
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList)
   }else{
      result = result.sort('createdAt');
   }
   if(fields){
      result = result.select(fields.split(',').join(' '))
   }
   
   const page  = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 10;
   const skip = (page -1) * limit;
   result = result.skip(skip).limit(limit);
   const products = await result
   res.status(200).json({ products , nbHits: products.length});

}
module.exports={
    getAllProductsStatic,
    getAllProducts
}