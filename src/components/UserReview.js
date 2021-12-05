import React from 'react';
import { Star } from 'react-star';
import { useEffect, useState } from 'react';

const UserReview = ({username, textReview, date, deliciousness, experience, pricingScore, pricingValue, service, reviewId}) => {
    const [reviewLikes, setReviewLikes] = useState(0);

    const likeReviewInformation = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          url: '/review/like',
          reviewId: reviewId,
          username: localStorage.getItem('username')
        }),
    }

    console.log(localStorage.getItem('username'));

    const likeReviewRequest = async() => {
        const res = await fetch(`http://localhost:80/api/index.php`, likeReviewInformation)
        console.log(res);
        const data = await res.json()
        console.log(data);
        setReviewLikes(data.response[0].likes);
    }

    const reviewInformation = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
    }

    const getReviewLikes = async() => {
        const res = await fetch(`http://localhost:80/api/index.php?action=getLikes&reviewId=${reviewId}`, reviewInformation)
        console.log(res);
        const data = await res.json()
        console.log(data);

        setReviewLikes(data.response[0].likes);
    }

    useEffect(() => {
        try {
            getReviewLikes();
        } catch (e) {
            console.log(e);
        }
    }, []) 

    return (
        <div className="user-review-container">

            <div className="username-and-date">
                <div className="user-review-username">
                        {username}
                </div>

                <div className="review-date">
                        {date}
                </div>
            </div>

          
            <div className="text-review">
                {textReview}
            </div>

            <div>
                <div className="rating-container">
                    <div className="rating-attribute-title">
                        Deliciousness: 
                    </div>

                    <Star readOnly={true} defaultValue={deliciousness}/>
                </div>

                <div className="rating-attribute-title">
                    Service: 
                    <Star readOnly={true} defaultValue={service}/>
                </div>

                <div className="rating-attribute-title">
                    Experience: 
                    <Star readOnly={true} defaultValue={experience}/>
                </div>

                <div className="rating-attribute-title">
                    Pricing: 
                    <Star readOnly={true} defaultValue={pricingScore}/>
                </div>

                <div className="rating-attribute-title">
                    Money Spent: $
                    {pricingValue}
                </div>
            </div>


            <div className="like-dislike-buttons">
                {reviewLikes}
            <i className='bx bx-like like-button' onClick={() => likeReviewRequest()}></i>
            </div>
           
        </div>
    )
}

export default UserReview
