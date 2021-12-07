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
    const [categoryRestaurants, setCategoryRestaurants] = useState([]);
    const [restaurantOrder, setRestaurantOrder] = useState('ascending');

    const bingApiRequest = async () => {
        const res = await fetch(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${queryParameter}&type=EatDrink&maxResults=25&key=${BEARER_TOKEN}`);
        const data = await res.json();
        console.log(data);
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

    const searchCategoryRestaurantInfo = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }
    
  
    const restaurantsByCategoryAscendingRequest = async(category) => {
        const res = await fetch(`http://localhost:80/api/index.php?action=searchCategoryAsc&category=${category}`, searchCategoryRestaurantInfo)
        const data = await res.json()
     
  
        if(data.response !== 'No Reviews Currently!') {
            console.log(data);
            setCategoryRestaurants(data.response);
        }
    }

    const restaurantsByCategoryDescendingRequest = async(category) => {
        const res = await fetch(`http://localhost:80/api/index.php?action=searchCategoryDesc&category=${category}`, searchCategoryRestaurantInfo)
        const data = await res.json()
     
  
        if(data.response !== 'No Reviews Currently!') {
            console.log(data);
            setCategoryRestaurants(data.response);
        }
    }

    const getRestaurantsByCategory = (category) => {
        if(restaurantOrder === 'ascending') {
            restaurantsByCategoryAscendingRequest(category);
        } else if(restaurantOrder === 'descending') {
            restaurantsByCategoryDescendingRequest(category);
        }
    }

    const setSortOrderAscending = () => {
        setRestaurantOrder('ascending');
    }

    const setSortOrderDescending = () => {
        setRestaurantOrder('descending');
    }

    
    return (
        <div class="home-page">
            <Navigation />

            <Map center={position} restaurants={restaurants}/>
            <div className="home-page-main-container">
            
            <div className="search">
                <form className="search-resturant-form" onSubmit={searchForRestaurants}>
                        <input className="search-resturant-input" type="text" placeholder="Search for a resturant!" value={queryParameter} onChange={((e) => setQueryParamter(e.target.value))}></input>
                        <button className="search-button"><i class='bx bx-search-alt search-icon'></i></button>
                </form>

                <div className="sort-by-category">
                    <select className="category-options-dropdown" onChange={((e) => getRestaurantsByCategory(e.target.value))}>
                            <option value="0" selected disabled hidden>Choose here</option>
                            <option value="Deliciousness">Deliciousness</option>
                            <option value="Service">Service</option>
                            <option value="Experience">Experience</option>
                            <option value="Pricing">Pricing</option>
                    </select>

                    <div className="up-and-down-arrows">
                        {
                            restaurantOrder === 'ascending' ?  <i class='bx bx-up-arrow-alt up-arrow-sort-selected' onClick={() => setSortOrderAscending()}></i>
                            :  <i class='bx bx-up-arrow-alt up-arrow-sort' onClick={() => setSortOrderAscending()}></i>
                        }

                        {
                            restaurantOrder === 'descending' ? <i class='bx bx-down-arrow-alt down-arrow-sort-selected' onClick={() => setSortOrderDescending()}></i>
                            : <i class='bx bx-down-arrow-alt down-arrow-sort' onClick={() => setSortOrderDescending()}></i>
                        }
                       
                        
                    </div>
                </div>
            </div>


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
