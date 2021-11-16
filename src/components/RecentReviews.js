import React, { useState, useEffect } from 'react';

const RecentReviews = ({ name, city, website }) => {

    return (
        <div class="recent-review-container">

            

            <div class="recent-review-info">

                <h2>{name} <i class='bx bx-restaurant'></i></h2>
                <h3> - {city} <i class='bx bxs-map'></i></h3>
                <h4><a href={website} >Website <i class='bx bxs-navigation' ></i></a></h4>

                <div class="star-ratings-container">
                    <div class="rating">
                        <h5>Deliciousness</h5>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <div class="rating">
                        <h5>Service</h5>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <div class="rating">
                        <h5>Pricing</h5>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <div class="rating">
                        <h5>Experience</h5>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>

                </div>

                <div class="text-review-container">
                    <p>Hi this is the temporary review text for this restaurant!!!</p>
                </div>

            </div>

        </div>
    )
}

export default RecentReviews