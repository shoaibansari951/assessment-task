import React, { useState, useRef } from 'react';
import './AddProducts.css';
import axios from 'axios';

export default function AddProducts() {
    const [visible, setVisible] = useState(false);
    const ref = useRef();
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0);
    const [filename,setFilename]=useState();
    const [quantity,setQuantity]=useState(0);
    const handleName=(event)=>{
        event.preventDefault();
        setName(event.target.value);
    }
    const handlePrice=(event)=>{
        event.preventDefault();
        setPrice(event.target.value)
    }
    const hanldleImg=(event)=>{
        event.preventDefault();
        setFilename(event.target.files[0])
        console.log('filename',filename)
    }
    const handleQuantity=(event)=>{
        event.preventDefault();
        setQuantity(event.target.value);
    }
    const handleCancel=()=>{
        // event.preventDefault();
        setVisible(false);
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append('name',name);
        formData.append('price',price);
        formData.append('image',filename);
        formData.append('quantity',quantity);
        console.log('formData',formData)
        axios.post("http://localhost:3001/products",formData)
        .then(res=>{
            console.log("response",res.data)
            console.log("success");
            setVisible(true)
        })
        .catch(err=>{
            console.log("error",err)
        }
        )
        setName('');
        setPrice(0);
        setQuantity(0);
        ref.current.value = "";
    }
  return <div>
      <div className='container'>
          <div className='container-fluid'>
              <form onSubmit={handleSubmit} encType=" multipart/form-data ">
                  <div className='row'>
                      <div className='col'>
                      <div className='col message'>
                          {visible===true ?  <h5 className='messages'>Product Added Successfully <button type="button" className="btn-close cancel" onClick={handleCancel} aria-label="Close"></button></h5> : null}
                          {/*  */}
                      </div>
                          <input type='text' value={name} placeholder='Name' required className='form-control input' onChange={handleName} />
                          <input type='number' value={price} placeholder='Price' required className='form-control input' onChange={handlePrice} />
                          <input type='number' value={quantity} placeholder='Quantity' required className='form-control input' onChange={handleQuantity} />
                          <input type='file'  style={{margin:20}}  ref={ref} placeholder='Image' required filename="image" onChange={hanldleImg} /><br/>
                          <button type='submit' className='submit'>Add Product</button>
                      </div>
                  </div>
               </form>
           </div>
       </div>
  </div>;
}
