const mongoose=require('mongoose');
const product=require('./../module/productSchema');
const express=require('express');
const shortid=require('shortid');
const check=require('../libs/checkLib');
const logger=require('./../libs/loggerLibs')
const response=require('./../libs/responseLib')

const productSchema= mongoose.model('productSchema')


let createProduct=(req,res)=>{
    if (check.isEmpty(req.body.productName) || check.isEmpty(req.body.productDescription) || check.isEmpty(req.body.productPrice) ) {
        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
        res.send(apiResponse)
    }
    else{
    let today=Date.now()
    let productId=shortid.generate();
    let newProduct=new productSchema({
    productId:productId,
    productName:req.body.productName,
    productPrice:req.body.productPrice,
    productRatings:req.body.productRatings,
    extraDiscount:req.body.extraDiscount,
    productDimentions:req.body.productDimentions,
    productBrand:req.body.productBrand,
    productDescription:req.body.productDescription,
    productWarranty:req.body.productWarranty,
    addToCart:req.body.addToCart,
    addedTime:today
})
let productReviews=(req.body.productReviews!=undefined&& req.body.productReviews!=null&&req.body.productReviews!='')?req.body.productReviews.split(','):[]
newProduct.productReviews=productReviews;
let productFeatures=(req.body.productFeatures!=undefined&& req.body.productFeatures!=null&&req.body.productFeatures!='')?req.body.productFeatures.split(','):[]
newProduct.productFeatures=productFeatures;
let productServices=(req.body.productServices!=undefined&& req.body.productServices!=null&&req.body.productServices!='')?req.body.productServices.split(','):[]
newProduct.productServices=productServices;
let offers=(req.body.offers!=undefined&& req.body.offers!=null&& req.body.offers!='')?req.body.offers.split(','):[]
newProduct.offers=offers;
let productColors=(req.body.productColors!=undefined&& req.body.productColors!=null&&req.body.productColors!='')?req.body.productColors.split(','):[]
newProduct.productColors=productColors;
let productHighlights=(req.body.productHighlights!=undefined&& req.body.productHighlights!=null&&req.body.productHighlights!='')?req.body.productHighlights.split(','):[]
newProduct.productHighlights=productHighlights;

newProduct.save((err,result)=>{
   if(err){
       console.log('error occured');
       logger.error(`Error Occured:${err}`,'database',10);
       let apiResponse=response.generate(true,'error occured',500,null);
       res.send(apiResponse);
    }
    else
    console.log("product is created successfully");
    res.send(result);
})
}}
let viewByProductId=(req,res)=>{

    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {

    productSchema.findOne({'productId':req.params.productId},(err,result)=>{

        if(err){
            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)     
           }
           else if (check.isEmpty(result)) {
            console.log('product Not Found.')
            let apiResponse = response.generate(true, 'product Not Found', 404, null)
            res.send(apiResponse)
        }
        else{
        let apiResponse = response.generate(false, 'product Found Successfully.', 200, result)
        res.send(apiResponse)
        }
    })
}
}


let getAllProducts=(req,res)=>{
    productSchema.find().select('-__v -_id').lean().exec((err,result)=>{

        if(err){
            console.log("error");
            logger.error(err.message, 'product Controller: getAllProducts', 10)
            let apiResponse = response.generate(true, 'Failed To Find product Details', 500, null)
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No product Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All products Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}
let deleteByProductId=(req,res)=>{
    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } 
    else 
    {
    productSchema.remove({'productId':req.params.productId},(err,result)=>{

        if (err) {
            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            console.log('product Not Found.')
            let apiResponse = response.generate(true, 'product Not Found.', 404, null)
            res.send(apiResponse)
        } else {
            console.log('product Deletion Success')
            let apiResponse = response.generate(false, 'product Deleted Successfully', 200, result)
            res.send(apiResponse)
        }

    })

}}

let editByProductId=(req,res)=>{

    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {

let option=req.body;

productSchema.update({'productId':req.params.productId},option,{multi:true}).exec((err,result)=>{
    if (err) {

        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database', 10)
        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {

        console.log('product Not Found.')
        let apiResponse = response.generate(true, 'product Not Found', 404, null)
        res.send(apiResponse)
    } else {
        console.log('product Edited Successfully')
        let apiResponse = response.generate(false, 'product Edited Successfully.', 200, result)
        res.send(apiResponse)
    }
})
}}

let addTocartByProductId=(req,res)=>{

    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } 
    else{
    productSchema.findOne({'productId':req.params.productId},(err,result)=>{

        if (err) {

            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
    
            console.log('product Not Found.')
            let apiResponse = response.generate(true, 'product Not Found', 404, null)
            res.send(apiResponse)
        }
        else{
    
            result.addToCart=result.addToCart+1;
    
            result.save(function (err,result){
                if(err){
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured While saving product', 500, null)
                    res.send(apiResponse)                }
                else
                console.log('added to cart Successfully')
                let apiResponse = response.generate(false, 'added to cart Successfully.', 200, result)
                res.send(apiResponse)
            })
        }
    })
}}
let removeFromCart=(req,res)=>{
    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } 
    else{
    productSchema.findOne({'productId':req.params.productId},(err,result)=>{

        if (err) {

            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
    
            console.log('product Not Found.')
            let apiResponse = response.generate(true, 'product Not Found', 404, null)
            res.send(apiResponse)
        }
        else{
    
            result.addToCart=result.addToCart-1;
                if(result.addToCart<=-1){
                    let apiResponse = response.generate(true, 'cart is empty.', 500, null)
                    res.send(apiResponse)
                }
                else{
            result.save(function (err,result){
                if(err){
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured While saving product', 500, null)
                    res.send(apiResponse)                      }
                else
                console.log('product is removed successfully')
                let apiResponse = response.generate(false, 'product is removed successfully.', 200, result)
                res.send(apiResponse)
            })}
        }
    })
}}

module.exports={

    createProduct:createProduct,
    getAllProducts:getAllProducts,
    viewByProductId:viewByProductId,
    deleteByProductId:deleteByProductId,
    editByProductId:editByProductId,
    addTocartByProductId:addTocartByProductId,
    removeFromCart:removeFromCart

}
