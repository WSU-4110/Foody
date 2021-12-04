import React from 'react';
import { useLocation } from 'react-router';
import Navigation from './Navigation';
import MapForOneRestaurant from './MapForOneRestaurant';

const RestaurantPage = () => {
    const location = useLocation();
    const restaurantInfo = location.state;

    // restaurantName: name,
    // restaurantPhone: phone,
    // restaurantAddress: address,
    // restaurantWebsite: website

    return (
        <div className="restaurant-page-container">
            <Navigation />

            <MapForOneRestaurant restaurantCoords={restaurantInfo.restaurantCoords} restaurantName={restaurantInfo.restaurantName}/>
            
            <div className="resturaunt-tab-container">
                <div className="resturaunt-info">
                    <h2>{restaurantInfo.restaurantName} <i class='bx bx-restaurant'></i></h2>
                    <h4>{restaurantInfo.restaurantPhone} <i class='bx bxs-phone-call' ></i></h4>
                    <h4>{restaurantInfo.restaurantAddress} <i class='bx bxs-map'></i></h4>
                    <h4><a href={restaurantInfo.restaurantWebsite} >Website <i class='bx bxs-navigation' ></i></a></h4>
                </div>
            </div>



        </div>
    )
}

export default RestaurantPage
