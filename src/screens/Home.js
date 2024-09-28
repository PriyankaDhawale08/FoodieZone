import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import MyOrder from './MyOrder';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:4000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFoodItem(data[0] || []);
            setFoodCat(data[1] || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFoodItem([]);
            setFoodCat([]);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <div><Navbar /></div> 
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="/fruity.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://preppykitchen.com/wp-content/uploads/2022/03/Chocolate-Lava-Cake-Recipe.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="container my-3 flex-grow-1">
                    {foodCat.length > 0 ? (
                        foodCat.map(category => (
                            <div key={category._id} className="mb-5">
                                <h3 className="fs-3 m-3">{category.CategoryName}</h3>
                                <hr />
                                <div className="row">
                                    {foodItem.length > 0 ? (
                                        foodItem
                                            .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                            .map(filteredItem => (
                                                <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                                                    <Card 
                                                        foodItem={filteredItem}
                                                        options={filteredItem.options[0]}
                                                    />
                                                </div>
                                            ))
                                    ) : (
                                        <div className="col-12">No items found for this category</div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No categories found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
