import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const data = await response.json();
            setOrderData(data.orderData || []); // Ensure orderData is an array
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.map((order, orderIndex) => (
                        order.order_data.slice(0).reverse().map((item, itemIndex) => (
                            <div key={`order-${orderIndex}-item-${itemIndex}`} className='col-12 col-md-6 col-lg-3'>
                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                    {item.map((arrayData, arrayIndex) => (
                                        <React.Fragment key={`order-${orderIndex}-item-${itemIndex}-arrayData-${arrayIndex}`}>
                                            {arrayData.Order_date ? (
                                                <div className='m-auto mt-5'>
                                                    {arrayData.Order_date}
                                                    <hr />
                                                </div>
                                            ) : (
                                                <React.Fragment>
                                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{arrayData.qty}</span>
                                                            <span className='m-1'>{arrayData.size}</span>
                                                            <span className='m-1'>{arrayData.Order_date}</span>
                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))
                    )) : (
                        <div className='m-5 w-100 text-center fs-3'>No Orders Found!</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
