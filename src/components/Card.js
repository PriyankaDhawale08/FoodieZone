import React, { useEffect, useState, useRef } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let options = props.options;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let data = useCart();
    const priceRef = useRef();
    const priceOptions = Object.keys(props.options);
    
    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        console.log(data);
    };
    
    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px', border: '1px solid #ddd', borderRadius: '0.25rem' }}>
            <img src={props.foodItem.img} className="card-img-top" alt={props.foodItem.name} style={{ height: "160px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className="container w-100">
                    <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => (
                            <option key={data} value={data}>{data}</option>
                        ))}
                    </select>
                    <div className="d-inline h-100 fs-5">
                        ₹ {finalPrice}/-
                    </div>
                </div>
            </div>
            <hr />
            <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}
