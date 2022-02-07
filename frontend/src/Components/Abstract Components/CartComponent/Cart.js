import React, { useEffect, useState } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import './Cart.css';
export default function Cart() {
    const [cart, setCart] = useState([]);
    let sum = 0;
    useEffect(async () => {
        const response = await axios.get('http://localhost:3001/cart');
        setCart(response.data);

    }, []);
    const handleCheckOut = async () => {
        const response = await axios.post(`http://localhost:3001/checkout/${sum}`);
        console.log('response ', response.data);
    }
    const handleDelete = async (id) => {
        console.log('id ', id);
        const response = await axios.post(`http://localhost:3001/cart/${id}`);
        console.log('response ', response.data);
        const response02 = await axios.get('http://localhost:3001/cart');
        setCart(response02.data);
    };
    const handleDecrement = async (id, quantity) => {
        console.log('quantity', quantity);
        if (quantity <= 1) {
            handleDelete(id);
        }
        else {
            const response = await axios.post(`http://localhost:3001/cart02/${id}`);
            const response02 = await axios.get('http://localhost:3001/cart');
            setCart(response02.data);
        }
    }
    const handleIncrement = async (id) => {
        const response = await axios.post(`http://localhost:3001/cart03/${id}`);
        const response02 = await axios.get('http://localhost:3001/cart');
        setCart(response02.data);
    }
    return <div>
        <div className='conatiner-fluid' >

            <ul>
                <div>{cart.map((item, index) => {
                    return <div key={index}>
                        <li className='list' >
                            <div><img src={`http://localhost:3001/public/images/${item.image}`} /></div>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div className='control'><button onClick={() => handleIncrement(item._id)} className='increment'>+</button><input  value={item.quantity} className='input02' /><button onClick={() => handleDecrement(item._id, item.quantity)} className='decrement'>-</button></div>
                            <div>{item.price * item.quantity}</div>
                            <button className='icon' onClick={() => handleDelete(item._id)} ><CloseCircleFilled /></button>
                        </li>
                    </div>
                })}</div>
                <div>
                    {cart.map((item) => {
                        sum = sum + item.price * item.quantity;
                    })}
                </div>
                <div className='conditional'>
                    <div>
                        {sum > 0 ? <div>Total: {sum}</div> : <div><img className='cartImg' src='https://cdn.dribbble.com/users/1010436/screenshots/11302442/empty_cart.jpg' /></div>}
                    </div>
                    <div>
                        {sum > 0 ? <button onClick={handleCheckOut} className='checkout'>Checkout</button> : null}
                    </div>
                </div>

            </ul>
        </div>
    </div>;
}
