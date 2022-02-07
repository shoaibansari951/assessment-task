import React, { useEffect, useState } from 'react';
import ProductCard from '../../Abstract Components/ProductCard/ProductCard';
import axios from 'axios';
import './Home.css'
export default function Home() {
  let [product, setProduct] = useState([]);
  const handleCart = (name, image, price,id) => {
    console.log('cart function called', name, image ,price,id);
    axios.post(`http://localhost:3001/cart/${name}/${image}/${price}`)
        .then(res=>{
            console.log("response",res.data)
            console.log("success");
            // setVisible(true)
        })
        .catch(err=>{
            console.log("error",err)
        }
        )
}
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/products');
    setProduct(response.data);
  }, [])
  return <div>
    <div className='container'>
      <div className='row arrange'>
        {product.map((item, index) =>
          <div className='col column' key={index}>
            <ProductCard key={index} name={item.name} addtoCart={(name, image,price,id) => handleCart(name, image, price,id)} price={item.price} quantity={item.quantity} image={item.image} id={item._id} />
          </div>
        )}
      </div>
    </div>
  </div>;
}
