import "./style.css";
import { useState, useEffect } from "react"

export default function LoadMore(){
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState();

    async function fetchProducts(){
        try{
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count=== 0 ? 0 : count *20 }`);
            const result = await response.json()
            console.log(result);  
            
            if (result && result.products && result.products.length){
                setProducts(prevData => [...prevData, ...result.products]);
                setLoading(false);
            }
        }
        catch(err){
            console.error("Failed to fetch products", err);
            setLoading(false);
        }
    }

    useEffect(() =>{
        fetchProducts()
       }, [count]
    );

    useEffect(() =>{
        if (products && products.length === 100){
            setDisable(true);
        }
    }, [products]);
    
    if (loading){
        return <div>Loading data ! Please wait</div>
    }

    return(
        <div className="container">
            <div className="product-container">
                {
                    products && products.length ? 
                    products.map(item => <div key={item} className="product">
                        <img src={item.thumbnail} alt={item.title}/>
                        <p>{item.title}</p>
                    </div>)
                    :null
                }
            </div>
            <div className="button-container">
                <button disabled={disable} onClick={() => setCount(count + 1)}>Load More Products</button>
                <button>
                    {
                        disable && <p>You have reached 100 products</p>
                    }
                </button>
            </div>
        </div>
    )
}
