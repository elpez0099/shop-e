import Product from "../data/models/product.js";
import Category from "../data/models/category.js";
import Confirm from "prompt-confirm";
import { dbConnection } from "./dbConnection.js";

const prompt = new Confirm(
  "Are you sure you want to continue?, this action will remove all existing products. Continue?"
);

// Fetching products from public API
const getProducts = async () => {
    try{
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json(); 
        return data.products;
    }catch(err){
        return null;
    }
}

/**Creating a unique name category catalog with necessary 
 * fields for the Category MongoDb collection*/
const getCategories = (productsFromApi) => {
    const categories = {};
    productsFromApi.forEach(item => {
        categories[item.category] = item.category;
    });

    const dbCategories = [];
    Object.keys(categories).forEach(categoryName=>{
        dbCategories.push({
            name: categoryName,
            description: `${categoryName} catalog`,
            tags: categoryName
        })
    });
    return dbCategories;
}

/** Per each image from the API response we create a custom object
 *  with necessary properties for the Product MongoDB Collection **/
const mapProductImages = (images) => {
    return images.map(image=> ({
        public_id: '',
        url: image,
        description: ''  
    }));
}

/**Mapping porducts from API to match our products MongoDb collection */
const mapProducts = (productsFromApi) => {
    const products = [];
    productsFromApi.forEach(item => {

        products.push({
            name: item.title,
            description: item.description,
            price: item.price,
            rating:{
                averageRate: item.rating,
                reviewCount: 1,
                reviews: []
            },
            images: mapProductImages(item.images),
            category: item.category,
            seller: item.brand,
            stock: item.stock
        })
    });

    return products;
}

/**This function takes an array of category compatible objects
 *  to be inserted into the categories MongoDB collection*/
const insertCategoriesIntoDB = async (dbCategories) => {
    const result = {};
    try{
        await Category.deleteMany();
        console.log("Existing categories were deleted!")
        const categoryData = await Category.insertMany(dbCategories);
        result.status = 'success';
        result.affected = categoryData.length;
        result.data = categoryData;
    }
    catch(err){
        result.status = 'failed',
        result.affected = 0;
        result.error = err;
    }
    return result;
}

/**This function takes an array of product compatible objects
 *  to be inserted into the products MongoDB collection*/
const insertProductsIntoDB = async (categories, products) => {
    const result = {};

    if(!categories || !products){
        console.error(`In order to insert products you must provide a list of categories and products. Got ${categories}, ${products}`);
        return;
    }
    try{
        products.forEach(product=> {
            const category = categories.find(x=>x.name === product.category);
            product.category = category._id;
        })

        await Product.deleteMany();
        console.log("Existing products were deleted!")
        const productData = await Product.insertMany(products);
        result.status = 'success';
        result.affected = productData.length;
        result.data = productData;
    }catch(err) {
        result.status = 'failed',
        result.affected = 0;
        result.error = err;
    }

    return result;
}

/**We've created a reusable function that takes two arguments, a result object and string type.
 *Depending on the result status property we log a success message with number of items added. 
 *In case there is an error we log it.**/
const handleResult = (result, type) => {
    if(!result || !type){
        console.error('No result was correctly provided!');
        return;
    }

    if(result.status === 'success'){
        console.log(
            `${result.affected} ${type} were added to the database successfully!`
          );
    }else{
        console.error(`An error has ocurred and the operation was interrupted. See details: ${result.error}`)
    }
}

/**
 * This is the main function that takes care of calling the other functions to process each data stage
 */
const seedProducts = async () => {
await dbConnection();
  prompt.ask(async (answer) => {
    if(answer){
        try {
            const productsFromApi = await getProducts();
            if (!productsFromApi){
                console.error('Error, could not retrieve products from remote service!')
                process.exit();
            }

            const products = mapProducts(productsFromApi);

            const dbCategories = getCategories(productsFromApi);
            const categoryResult = await insertCategoriesIntoDB(dbCategories);
            handleResult(categoryResult, 'categories');

            const productResult = await insertProductsIntoDB(categoryResult.data, products);
            handleResult(productResult, 'products');

            process.exit();
          } catch (err) {
            console.log(`Unable to seed products ${err}`);
            process.exit();
          }
    }else{
        process.exit();
    }
    
  });
};

// Running the script
seedProducts();
