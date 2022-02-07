import React from 'react';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import LikeFilled from '@ant-design/icons/LikeFilled';
import './ProductCard.css';
export default function ProductCard(props) {
    const handleAddToCart = (name, image, price ,id) => {
        console.log('add to cart function called');
        props.addtoCart(name, image, price,id)
    }
    return <div>
        <div className="proCard">
            <div className='images'>
                <img className='image' src={`http://localhost:3001/public/images/${props.image}`} alt='a product image' />
            </div>
            <div className='info'>
                <span>Name :{props.name} </span><span>Price:  ${props.price}</span>
            </div>
            <div className='buttons'>
                <button style={{ fontSize: 24 }} onClick={() => handleAddToCart(props.name, props.image, props.price,props.id)} ><ShoppingCartOutlined /></button>
                <button style={{ fontSize: 24 }}><LikeFilled /></button>
            </div>
        </div>
    </div>;
}
