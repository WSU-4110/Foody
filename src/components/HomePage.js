import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import ResturantTab from './ResturantTab';
import Footer from './Footer';
import { BEARER_TOKEN } from './config/config';
import useUserCoordinates from './hooks/useUserCoordinates';
import Map from './Map';

const HomePage = () => {
    const [restaurants, setRestaurants] = useState([])
    const coord = useUserCoordinates();
    const position = [coord.coordinates.latitude, coord.coordinates.longitude];

    const bingApiRequest = async () => {
        const res = await fetch(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=pizza&key=${BEARER_TOKEN}`)
        const data = await res.json()
        setRestaurants(data.resourceSets[0].resources)
    }

    useEffect(() => {
        try {
            bingApiRequest()
        } catch (e) {
            console.log(e)
        }
    }, [])

    
    return (
        <div class="home-page">
            <Navigation />

            <Map center={position} restaurants={restaurants}/>
            <div className="home-page-main-container">
                <h2 className="search-result-title">Top Search Results!</h2>
                {restaurants.map((restaurant) =>
                <ResturantTab 
                name={restaurant.name} 
                phone={restaurant.PhoneNumber} 
                address={restaurant.Address.formattedAddress} 
                website={restaurant.Website} 
                coordinates={restaurant.geocodePoints[0].coordinates}
                />)}
            </div>
           
            <div className="footer-homepage">
                 <Footer />
            </div>
        </div>
    )
}

export default HomePage
