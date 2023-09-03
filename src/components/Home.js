import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";
import './styles.css';

const Home=()=>{
  const {
    state : {products},
    productState: {sort, byStock, byFastDelivary, byRating, searchQuery}
} = CartState()

const transfromProducts = () =>{
  let sortedProducts = products ;

  if(sort){
    sortedProducts = sortedProducts.sort((a,b) => 
      sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
    )
  }

  if(!byStock){
    sortedProducts = sortedProducts.filter((prod)=>prod.inStock)
  }

  if(byFastDelivary){
    sortedProducts = sortedProducts.filter((prod)=>prod.byFastDelivary)
  }

  if(byRating){
    sortedProducts = sortedProducts.filter((prod)=>prod.ratings >= byRating )
  }

  if(searchQuery){
    sortedProducts = sortedProducts.filter((prod)=> prod.name.toLowerCase().includes(searchQuery))
  }

  return sortedProducts ;
}

    return(
        <div className="home">
            <Filter/>
            <div className="productContainer">
                {transfromProducts().map((prod)=>{
                  return  <SingleProduct prod={prod}  key={prod.id}/>
                })}
            </div>
        </div>
    )
}
export default Home