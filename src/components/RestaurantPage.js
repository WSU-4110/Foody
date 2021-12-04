import React from 'react';
import { useLocation } from 'react-router';
import Navigation from './Navigation';
import MapForOneRestaurant from './MapForOneRestaurant';
import UserReviews from './UserReviews';
import { useState, useEffect } from 'react';

const RestaurantPage = () => {
    const location = useLocation();
    const restaurantInfo = location.state;
    const [restaurantReviews, setRestaurantReviews] = useState([]);



    // restaurantName: name,
    // restaurantPhone: phone,
    // restaurantAddress: address,
    // restaurantWebsite: website
    // body: JSON.stringify({
    //     url: '/restaurant/reviews',
    //     restaurantName: restaurantInfo.restaurantName,
    //     restaurantAddress: restaurantInfo.restaurantAddress
    //  })
    const restaurantRequestInfo = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }
    

    const restaurantReviewsRequest = async() => {
        const res = await fetch(`http://localhost:80/api/index.php?action=reviews&restaurantName=${restaurantInfo.restaurantName}&restaurantAddress=${restaurantInfo.restaurantAddress}`, restaurantRequestInfo)
        console.log(res);
        const data = await res.json()
        console.log(data);
    
        setRestaurantReviews(data);
        console.log(restaurantReviews);
    }

    console.log(restaurantReviews);
    useEffect(() => {
        try {
            restaurantReviewsRequest();
        } catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <div className="">
            <Navigation />

            <MapForOneRestaurant restaurantCoords={restaurantInfo.restaurantCoords} restaurantName={restaurantInfo.restaurantName}/>
            
            <div className="restaurant-page-container">
                <div className="resturaunt-page-tab-container">
                    <div className="resturaunt-info">
                        <h2>{restaurantInfo.restaurantName} <i class='bx bx-restaurant'></i></h2>
                        <h4>{restaurantInfo.restaurantPhone} <i class='bx bxs-phone-call' ></i></h4>
                        <h4>{restaurantInfo.restaurantAddress} <i class='bx bxs-map'></i></h4>
                        <h4><a href={restaurantInfo.restaurantWebsite} >Website <i class='bx bxs-navigation' ></i></a></h4>
                    </div>
                </div>

                <div>
                    <h1 className="reviews-title">Reviews</h1>
                 </div>
                

            </div>

            


        </div>
    )
}

export default RestaurantPage
