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

          
           

            <div>
                {textReview}
            </div>

         

            <div>
                Deliciousness: 
                <Star readOnly={true} defaultValue={deliciousness}/>
            </div>

            <div>
                Service: 
                <Star readOnly={true} defaultValue={service}/>
            </div>

            <div>
                Experience: 
                <Star readOnly={true} defaultValue={experience}/>
            </div>

            <div>
                Pricing: 
                <Star readOnly={true} defaultValue={pricingScore}/>
            </div>

            <div>
                Money Spent: 
                {pricingValue}
            </div>

           
        </div>
    )
}

export default UserReview
