import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import ResturantTab from './ResturantTab';
import Footer from './Footer';
import { BEARER_TOKEN } from './config/config';
import useUserCoordinates from './hooks/useUserCoordinates';
import Map from './Map';

const HomePage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const coord = useUserCoordinates();
    const position = [coord.coordinates.latitude, coord.coordinates.longitude];
    const [queryParameter, setQueryParamter] = useState("restaurants");

    const bingApiRequest = async () => {
        const res = await fetch(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${queryParameter}&key=${BEARER_TOKEN}`);
        const data = await res.json();
        setRestaurants(data.resourceSets[0].resources);
    }

    useEffect(() => {
        try {
            bingApiRequest();
        } catch (e) {
            console.log(e);
        }
    }, [])

    const searchForRestaurants = (e) => {
        e.preventDefault();
        bingApiRequest();
    }

    
    return (
        <div class="home-page">
            <Navigation />

            <Map center={position} restaurants={restaurants}/>
            <div className="home-page-main-container">
                
            <form className="search-resturant-form" onSubmit={searchForRestaurants}>
                    <input className="search-resturant-input" type="text" placeholder="Search for a resturant!" value={queryParameter} onChange={((e) => setQueryParamter(e.target.value))}></input>
                    <button className="search-button"><i class='bx bx-search-alt search-icon'></i></button>
            </form>

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
