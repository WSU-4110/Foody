import React from 'react';
import { Star } from 'react-star';

const UserReview = ({username, textReview, date, deliciousness, experience, pricingScore, pricingValue, service}) => {
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
            <i className='bx bx-like like-button' ></i>
            <i className='bx bx-dislike dislike-button' ></i>
            </div>
           
        </div>
    )
}

export default UserReview
