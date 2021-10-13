import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import ResturantTab from './ResturantTab';
import Footer from './Footer';
import { BEARER_TOKEN } from './config/config';
import useUserCoordinates from './hooks/useUserCoordinates';

const HomePage = () => {
    const [restaurants, setRestaurants] = useState([])
    const [coordinates, setCoordinates] = useState([])
    const coord = useUserCoordinates();
    console.log(coord);

    const bingApiRequest = async () => {
        const res = await fetch(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=restaurant&key=${BEARER_TOKEN}`)
        const data = await res.json()
        console.log(data)
        setRestaurants(data.resourceSets[0].resources)
        console.log(restaurants)
    }

    useEffect(() => {

        try {
            bingApiRequest()
        } catch (e) {
            console.log(e)
        }
    }, [])


    // const getResturauntCoordinates = () => {
    //     return restaurants.geocodePoints.
    //     resourceSets[0].resources[1].geocodePoints[0].coordinates
    // }

    // const getResturauntCoordinates = (arrayData) => {
    //     setCoordinates(arrayData)
    //     coordinates.map((coordinate) => )


    // }
    
    return (
        <div class="home-page">
            <Navigation />
     
            <div className="home-page-main-container">
            <h1>Resturants in your area!</h1>
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
