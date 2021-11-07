//TODO: add placeholder for error, probably in parent component rather than here

import { useState } from 'react';
import { Star } from 'react-star';

const RestaurantReview = ({ restaurantName, restaurantPhone, restaurantAddress, restaurantWebsite }) => {
    const [textReview, setTextReview] = useState('');
    const [deliciousnessScore, setDeliciousnessScore] = useState(0);
    const [serviceScore, setServiceScore] = useState(0);
    const [experienceScore, setExperienceScore] = useState(0);
    const [pricingScore, setPricingScore] = useState(0);
    const [pricingValue, setPricingValue] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();

        const restaurantReview = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                url: '/restaurant/review/save',
                restaurantName: restaurantName,
                restaurantPhone: restaurantPhone,
                restaurantAddress: restaurantAddress,
                restaurantWebsite: restaurantWebsite,
                review: textReview,
                deliciousnessScore: deliciousnessScore,
                serviceScore: serviceScore,
                experienceScore: experienceScore,
                pricingScore: pricingScore,
                pricingValue: pricingValue
            })
        }

        saveReview(restaurantReview);
    }

    const saveReview = async (restaurantReview) => {
        // console.log(restaurantReview.body);
        const res = await fetch('http://localhost:80/api/index.php', restaurantReview);

        const data = await res.json();
        alert(data['response']);
    }

    return (
        <form className='' onSubmit={onSubmit}>
            <div className='form-group'>
                <textarea name='review' maxLength='500'
                    onChange={(e) => setTextReview(e.target.value)}
                    rows='5' cols='40' placeholder='Add review (500 characters limit)' />
            </div>
            <div className='add-review-form'>
                <div className="item">
                    <p><sup>{textReview.length}/500</sup></p>
                </div>
                <div className='item'>
                    <label>Deliciousness</label>
                    <Star onChange={(value) => setDeliciousnessScore(value)} />
                </div>
                <div className='item'>
                    <label>Service</label>
                    <Star onChange={(value) => setServiceScore(value)} />
                </div>
                <div className='item'>
                    <label>Experience</label>
                    <Star onChange={(value) => setExperienceScore(value)} />
                </div>
                <div className='item'>
                    <label>Pricing</label>
                    <Star onChange={(value) => setPricingScore(value)} />
                </div>
                <div className='item'>
                    <label></label>
                    $<input name='pricingValue' type='number' width='20' min='1' step='0.01'
                        onChange={(e) => setPricingValue(e.target.value)} /> spent
                </div>
                <div className='item'>
                    <input type='submit' value='Submit'/>
                </div>
            </div>
        </form>
    )
}

export default RestaurantReview
