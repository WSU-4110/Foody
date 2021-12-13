import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Star } from 'react-star';


const RecentReviews = ({ username, name, phone, address, website, coordinates, restaurant }) => {
    const [ratings, setRatings] = useState([]);

    /*
    const restaurantRequestInfo = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }

    const restaurantRatingsRequest = async () => {
        const res = await fetch(`http://localhost:80/api/index.php?action=ratings&restaurantName=${name}&restaurantAddress=${address}`, restaurantRequestInfo)
        const data = await res.json()

        if (data.response !== 'No Reviews For This Restaurant!') {
            console.log(data);
            setRatings(data.response);
            console.log(ratings);
        }
    }


    useEffect(() => {
        restaurantRatingsRequest();
    }, [restaurant])

    const onRestaurantTabClicked = () => {
        history.push({
            pathname: "/components/RestaurantPage.js",
            state: {
                restaurantName: name,
                restaurantPhone: phone,
                restaurantAddress: address,
                restaurantWebsite: website,
                restaurantCoords: coordinates
            }
        });
    };
    */

    const restaurantRequestInfo = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }
    
  
    const restaurantRatingsRequest = async() => {
        const res = await fetch(`http://localhost:80/api/index.php?action=userreview&username=${username}`, restaurantRequestInfo)
        const data = await res.json()

        console.log(data);
        setRatings(data.response);
        console.log(ratings);
    }
  
   
      useEffect(() => {
        restaurantRatingsRequest();
      }, [restaurant])

    return (
            <div class="recent-review-container">

                {ratings.length > 0 ? 
                <div class="recent-review-info">
                    <h2>{ratings[0].restaurant_name} <i class='bx bx-restaurant'></i></h2>
                    <h3> - {ratings[0].restaurant_address} <i class='bx bxs-map'></i></h3>
                    <h4><a href={ratings[0].restaurant_website} >Website <i class='bx bxs-navigation' ></i></a></h4>

                    <div class="star-ratings-container">



                  <div className="star-ratings-container">
                      
                      <div className="rating-container">
                          <div className="rating-attribute-title">
                              Deliciousness: 
                              <Star readOnly={true} defaultValue={ratings[0].deliciousness_score}/>
                          </div>
                      <div className="rating-attribute-title">
                          Service: 
                          <Star readOnly={true} defaultValue={ratings[0].service_score}/>
                      </div>

                      <div className="rating-attribute-title">
                          Experience: 
                          <Star readOnly={true} defaultValue={ratings[0].experience_score}/>
                      </div>

                      <div className="rating-attribute-title">
                          Pricing: 
                          <Star readOnly={true} defaultValue={ratings[0].pricing_score}/>
                      </div>

                      <div className="rating-attribute-title">
                          Average Money Spent: $
                          {ratings[0].pricing_value}
                      </div>

                      <div class="text-review-container">
                          <br></br>
                          Review Text:
                          <br></br>
                        {ratings[0].review}
                    </div>
                    </div>
                  </div>
                
                 

                    </div>
                </div>
                : <div>You have no reviews! Go make some!</div>}
            </div>

    )
}

export default RecentReviews