const express=require('express');
const configure=require('./../appConfig/configure');
const controller=require('./../controllers/marketController');
const auth=require('./../middlewares/auth');


let routing=(app)=>{
    let baseUrl=configure.apiVersion+'/market';
	app.post(baseUrl+'/create',auth.isAuthenticated,controller.createProduct);
	 /**
	 * @api {post} /api/v1/market/create Create product
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productName productName of the product passed as a body parameter
	 * @apiParam {String} productDescription description of the product passed as a body parameter
	 * @apiParam {Number} productPrice price of the product passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product Created successfully",
	    "status": 200,
	    "data": [
					{
						"productName": "String",
            			"productPrice": "Number",
            			"productReviews":object(type=array),
            			"productRatings": "Number",
            			"productFeatures":object(type=array),
            			"extraDiscount": "Number",
            			"productDimentions": "String",
            			"productServices":object(type=array),
            			"productBrand": "String",
            			"offers":object(type=array),
            			"productColors":object(type=array),
            			"productDescription": "String",
            			"productWarranty": "String",
            			"addToCart": "Number",
            			"productHighlights":object(type=array),
            			"productId": "String",
            			"addedTime": "date"
						
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/all',auth.isAuthenticated,controller.getAllProducts);
    	/**
	 * @api {get} /api/v1/market/view/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All products Details Found",
	    "status": 200,
	    "data": [
					{
						"productName": "String",
            			"productPrice": "Number",
            			"productReviews":object(type=array),
            			"productRatings": "Number",
            			"productFeatures":object(type=array),
            			"extraDiscount": "Number",
            			"productDimentions": "String",
            			"productServices":object(type=array),
            			"productBrand": "String",
            			"offers":object(type=array),
            			"productColors":object(type=array),
            			"productDescription": "String",
            			"productWarranty": "String",
            			"addToCart": "Number",
            			"productHighlights":object(type=array),
            			"productId": "String",
            			"addedTime": "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find product Details",
	    "status": 500,
	    "data": null
	   }
	 */

	app.get(baseUrl+'/view/:productId',auth.isAuthenticated,controller.viewByProductId);
	/**
	 * @api {get} /api/v1/market/view/:productId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
					__v: "number",
					"productName": "String",
            		"productPrice": "Number",
            		"productReviews":object(type=array),
            		"productRatings": "Number",
        			"productFeatures":object(type=array),
        			"extraDiscount": "Number",
        			"productDimentions": "String",
            		"productServices":object(type=array),
            		"productBrand": "String",
        			"offers":object(type=array),
        			"productColors":object(type=array),
           			"productDescription": "String",
           			"productWarranty": "String",
           			"addToCart": "Number",
           			"productHighlights":object(type=array),
					"productId": "String",
           			"addedTime": "date"
					
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */
	app.post(baseUrl+'/delete/:productId',auth.isAuthenticated,controller.deleteByProductId);
	    /**
	 * @api {post} /api/v1/market/delete/:productId Delete product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
	app.put(baseUrl+'/edit/:productId',auth.isAuthenticated,controller.editByProductId);
	/**
	 * @api {put} /api/v1/market/edit/:productId Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						"productName": "String",
            			"productPrice": "Number",
            			"productReviews":object(type=array),
            			"productRatings": "Number",
            			"productFeatures":object(type=array),
            			"extraDiscount": "Number",
            			"productDimentions": "String",
            			"productServices":object(type=array),
            			"productBrand": "String",
            			"offers":object(type=array),
            			"productColors":object(type=array),
            			"productDescription": "String",
            			"productWarranty": "String",
            			"addToCart": "Number",
            			"productHighlights":object(type=array),
            			"productId": "String",
            			"addedTime": "date"
						
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
	app.get(baseUrl+'/addToCart/:productId',auth.isAuthenticated,controller.addTocartByProductId);
	
    /**
	 * @api {get} /api/v1/market/addToCart/:productId add product into cart
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						"productName": "String",
            			"productPrice": "Number",
            			"productReviews":object(type=array),
            			"productRatings": "Number",
            			"productFeatures":object(type=array),
            			"extraDiscount": "Number",
            			"productDimentions": "String",
            			"productServices":object(type=array),
            			"productBrand": "String",
            			"offers":object(type=array),
            			"productColors":object(type=array),
            			"productDescription": "String",
            			"productWarranty": "String",
            			"addToCart": "Number",
            			"productHighlights":object(type=array),
            			"productId": "String",
            			"addedTime": "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
	app.get(baseUrl+'/deleteFromCart/:productId',auth.isAuthenticated,controller.removeFromCart);
	 /**
	 * @api {get} /api/v1/market/deleteFromCart/:productId remove product from cart
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						"productName": "String",
            			"productPrice": "Number",
            			"productReviews":object(type=array),
            			"productRatings": "Number",
            			"productFeatures":object(type=array),
            			"extraDiscount": "Number",
            			"productDimentions": "String",
            			"productServices":object(type=array),
            			"productBrand": "String",
            			"offers":object(type=array),
            			"productColors":object(type=array),
            			"productDescription": "String",
            			"productWarranty": "String",
            			"addToCart": "Number",
            			"productHighlights":object(type=array),
            			"productId": "String",
            			"addedTime": "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
}
module.exports={
    setRouter:routing
}