import React from 'react'

const UserReview = ({username, textReview, date, deliciousness, experience, pricingScore, pricingValue, service}) => {
    return (
        <div>
            
            <div>
                {username}
            </div>

            <div>
                {textReview}
            </div>

            <div>
                {date}
            </div>

            <div>
                {deliciousness}
            </div>

            <div>
                {experience}
            </div>

            <div>
                {pricingScore}
            </div>

            <div>
                {service}
            </div>
            
            <div>
                {pricingValue}
            </div>

           
        </div>
    )
}

export default UserReview
