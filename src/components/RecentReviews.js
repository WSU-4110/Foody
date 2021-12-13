import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Star } from 'react-star';
import ModalImage from "react-modal-image";


const RecentReviews = ({ username, name, phone, address, website, coordinates, restaurant, restaurantImages,reviewId }) => {
    const [ratings, setRatings] = useState([]);
    const [reviewLikes, setReviewLikes] = useState(0);
    const [reviewImages, setReviewImages] = useState([]);

    const restaurantRequestInfo = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }


    const restaurantRatingsRequest = async () => {
        const res = await fetch(`http://localhost:80/api/index.php?action=userreview&username=${username}`, restaurantRequestInfo)
        const data = await res.json()

        console.log(data);
        setRatings(data.response);
        console.log(ratings);
    }

    useEffect(() => {
        restaurantRatingsRequest();
    }, [restaurant])

    const restaurantImagesGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }

    const restaurantImagesRequest = async () => {
        const res = await fetch(`http://localhost:80/api/index.php?action=getImages&reviewId=${reviewId}`, restaurantImagesRequest)
        const data = await res.json()

        console.log(data);
        setReviewImages(data.response);
        console.log(reviewImages);
    }

    useEffect(() => {
        restaurantImagesRequest();
    }, [restaurantImages])

    return (
        <div>

        {ratings.length > 0 ?
            <div>
                {ratings.map(info => {
                    return(
                        <div class="recent-review-container">
                        <h2>{info.restaurant_name} <i class='bx bx-restaurant'></i></h2>
                        <h3> - {info.restaurant_address} <i class='bx bxs-map'></i></h3>
                        <h4><a href={info.restaurant_website} >Website <i class='bx bxs-navigation' ></i></a></h4>
                        
                        <div class="star-ratings-container">

                        <div className="star-ratings-container">

                            <div>
                                <div className="rating-attribute-title">
                                    Deliciousness:
                                    <Star readOnly={true} defaultValue={info.deliciousness_score} />
                                </div>
                                <div className="rating-attribute-title">
                                    Service:
                                    <Star readOnly={true} defaultValue={info.service_score} />
                                </div>

                                <div className="rating-attribute-title">
                                    Experience:
                                    <Star readOnly={true} defaultValue={info.experience_score} />
                                </div>

                                <div className="rating-attribute-title">
                                    Pricing:
                                    <Star readOnly={true} defaultValue={info.pricing_score} />
                                </div>

                                <div className="rating-attribute-title">
                                    Money Spent: $
                                    {info.pricing_value}
                                </div>

                                <div class="text-review-container">
                                    <br></br>
                                    Review Text:
                                    <br></br>
                                    {info.review}
                                </div>
                            </div>
                        </div>

                    </div>
                    {reviewImages.length > 0 && (
                    <div className="image-preview-container">
                        {reviewImages.map((restaurantImages) =>
                        <ModalImage
                            small={restaurantImages.image_encoded}
                            large={restaurantImages.image_encoded}
                            alt={restaurantImages.image_name}
                            hideZoom={true}
                            showRotate={false}
                        />
                        )}
                    </div>
                    )}
                        </div>
                    )
                })}
            </div>

            : <div>You have no reviews! Go make some!</div>}
{/*
            {ratings.length > 0 ?
                < div class="recent-review-info">
                    <h2>{ratings[num].restaurant_name} <i class='bx bx-restaurant'></i></h2>
                    <h3> - {ratings[0].restaurant_address} <i class='bx bxs-map'></i></h3>
                    <h4><a href={ratings[0].restaurant_website} >Website <i class='bx bxs-navigation' ></i></a></h4>


                    <div class="star-ratings-container">

                        <div className="star-ratings-container">

                            <div className="rating-container">
                                <div className="rating-attribute-title">
                                    Deliciousness:
                                    <Star readOnly={true} defaultValue={ratings[0].deliciousness_score} />
                                </div>
                                <div className="rating-attribute-title">
                                    Service:
                                    <Star readOnly={true} defaultValue={ratings[0].service_score} />
                                </div>

                                <div className="rating-attribute-title">
                                    Experience:
                                    <Star readOnly={true} defaultValue={ratings[0].experience_score} />
                                </div>

                                <div className="rating-attribute-title">
                                    Pricing:
                                    <Star readOnly={true} defaultValue={ratings[0].pricing_score} />
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
                : <div>You have no reviews! Go make some!</div>}*/}
        </div >

    )
}

export default RecentReviews