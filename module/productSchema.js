const mongoose=require('mongoose');

const schema=mongoose.Schema;


let productSchema= new schema(
{
    productId:{
        type:String,
        unique:true
    },
    productName:{
        type:String,
        default:''
    },
    productPrice:{
        type:Number,
        default:0
    },
    productReviews:[],

    productRatings:{
        type:Number,
        default:0
    },
    productFeatures:[],

    extraDiscount:{
        type:String,
        default:''
    },
    productDimentions:{
        type:String,
        default:''
    },
    productServices:[],

    productBrand:{
        type:String,
        default:''
    },
    offers:[],

    productColors:[],

    productDescription:{
        type:String,
        default:''
    },
    productWarranty:{
        type:String,
        default:''
    },
    addToCart:{
        type:Number,
        default:0
    },
    productHighlights:[],
     
    addedTime:{
        type:Date,
        default:Date.now
    }
})



mongoose.model('productSchema',productSchema)