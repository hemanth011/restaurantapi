const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
})();
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 - HW2" });
});


// Exercise 1: Get All Restaurants

// Objective: Fetch all restaurants from the database.

// Query Parameters: None

// Tasks: Implement a function to fetch all restaurants.

// Example Call:

// http://localhost:3000/restaurants

async function getdata() {
  
let qurey = "SELECT * FROM restaurants  "
let responce = await db.all(qurey)
return { restaurants:responce}

}

app.get('/restaurants',async(req,res)=>{
  try {
    let result = await getdata()

res.status(200).json(result)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }



})

// Exercise 2: Get Restaurant by ID

// Objective: Fetch a specific restaurant by its ID.

// Query Parameters:

// id (integer)

// Tasks: Implement a function to fetch a restaurant by its ID.

// Example Call:

// http://localhost:3000/restaurants/details/1
 
async function getrestaurantbyid(id){
  let qurey = "SELECT * FROM restaurants WHERE ID = ?"
  let responce = await db.all(qurey,[id])
  return { restaurants:responce }
}

app.get('/restaurants/details/:id',async(req,res)=>{
try{
let id= req.params.id
let result = await getrestaurantbyid(id)
 res.status(200).json(result)
} catch (error) {
  res.status(500).json({msg:error.message})
}

})


// Exercise 3: Get Restaurants by Cuisine

// Objective: Fetch restaurants based on their cuisine.

// Query Parameters:

// cuisine (string)

// Tasks: Implement a function to fetch restaurants by cuisine.

// Example Call:

// http://localhost:3000/restaurants/cuisine/Indian

async function getrestaurantbycuisine(cuisine){
  let qurey = "SELECT * FROM restaurants WHERE  cuisine = ?"
  let responce = await db.all(qurey,[cuisine])
  return{ restaurant:responce}
}

app.get('/restaurants/cuisine/:cuisine',async(req,res)=>{
try {
  let cuisine = req.params.cuisine

let result = await getrestaurantbycuisine(cuisine)

res.status(200).json(result)
} catch (error) {
  res.status(500).json({msg:error.message})
}



})

// Exercise 4: Get Restaurants by Filter

// Objective: Fetch restaurants based on filters such as veg/non-veg, outdoor seating, luxury, etc.

// Query Parameters:

// isVeg (string)

// hasOutdoorSeating (string)

// isLuxury (string)

// Tasks: Implement a function to fetch restaurants by these filters.

// Example Call:

// http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false

async function getrestaurantbyfilter(isveg,hasOutdoorSeating,isLuxury){
  let qurey = "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND  isLuxury = ?"
    let responce = await db.all(qurey,[isveg,hasOutdoorSeating,isLuxury])
    // console.log(responce);
    
    return {restaurant:responce}
}

app.get('/restaurants/filter',async(req,res)=>{
  try {
    let isveg = req.query.isVeg
    let hasOutdoorSeating = req.query.hasOutdoorSeating
    let isLuxury = req.query.isLuxury
    let result = await getrestaurantbyfilter(isveg,hasOutdoorSeating,isLuxury)
    res.status(200).json(result)
  } catch (error) {
    
    res.status(404).json({msg:error.message})
  }
 
})

// Exercise 5: Get Restaurants Sorted by Rating

// Objective: Fetch restaurants sorted by their rating ( highest to lowest ).

// Query Parameters: None

// Tasks: Implement a function to fetch restaurants sorted by rating.

// Example Call:

// http://localhost:3000/restaurants/sort-by-rating

async function getrestaurantbyrating(){
    let qurey = "SELECT * FROM restaurants ORDER BY rating  DESC "
    let responce = await db.all(qurey)
    return {restaurants:responce}

}

app.get("/restaurants/sort-by-rating",async(req,res)=>{
  try{
  let result = await getrestaurantbyrating()
  res.status(200).json(result)
} catch (error) {
    
  res.status(404).json({msg:error.message})
}
})


// Exercise 6: Get All Dishes

// Objective: Fetch all dishes from the database.

// Query Parameters: None

// Tasks: Implement a function to fetch all dishes.

// Example Call:

// http://localhost:3000/dishes

async function getdish(){
  let query = "SELECT * FROM dishes "
  let responce = await db.all(query)
  return{dishes:responce}
}

app.get('/dishes',async(req,res)=>{
 
  let result = await getdish()
  res.status(200).json(result)


})


// Exercise 7: Get Dish by ID

// Objective: Fetch a specific dish by its ID.

// Query Parameters:

// id (integer)

// Tasks: Implement a function to fetch a dish by its ID.

// Example Call:

// http://localhost:3000/dishes/details/1

async function getdishbyid(id) {
  let qurey = "SELECT * FROM dishes WHERE  ID = ? "
   let responce = await db.all(qurey,[id])
   return {dishes:responce}
}

app.get('/dishes/details/:id',async(req,res)=>{
  try {
    let id = req.params.id
  let result = await getdishbyid(id)
res.status(200).json(result)
  } catch (error) {
    res.status(404).json({msg:error.message})
  }

})

// Exercise 8: Get Dishes by Filter

// Objective: Fetch dishes based on filters such as veg/non-veg.

// Query Parameters:

// isVeg (boolean)

// Tasks: Implement a function to fetch dishes by these filters.

// Example Call:


// http://localhost:3000/dishes/filter?isVeg=true


async function getdishveg(isVeg) {
  let qurey = "SELECT *FROM dishes WHERE isVeg = ?"
  let responce= await db.all(qurey,[isVeg])
  return{dish:responce}
}


app.get('/dishes/filter',async(req,res)=>{
  try {
    let isVeg = req.query.isVeg
    let result = await getdishveg(isVeg)
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({msg:error.message})
  }
 
})


// Exercise 9: Get Dishes Sorted by Price

// Objective: Fetch dishes sorted by their price ( lowest to highest ).

// Query Parameters: None

// Tasks: Implement a function to fetch dishes sorted by price.

// Example Call:

// http://localhost:3000/dishes/sort-by-price

async function getdishprice(){
  let qurey = "SELECT * FROM dishes ORDER BY price"
  let responce = await db.all(qurey)
  return{dish:responce}
}

app.get('/dishes/sort-by-price',async(req,res)=>{
  try {
    let result = await getdishprice()
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({msg:error.message})
  }
 
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});