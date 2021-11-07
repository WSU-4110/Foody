import { useState } from 'react';
import { Star } from 'react-star';

const RestaurantReview = () => {
    const [textReview, setTextReview] = useState('');
    const [deliciousness, setDeliciousness] = useState(0);
    const [service, setService] = useState(0);
    const [experience, setExperience] = useState(0);
    const [pricing, setPricing] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();

        const restaurantReview = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                url: '/restaurant/review',
                review: textReview,
                deliciousness: deliciousness,
                service: service,
                experience: experience,
                pricing: pricing})
        }

        saveReview(restaurantReview);
    }

    const saveReview = async (restaurantReview) => {
        // const res = await fetch('http://localhost:80/api/restaurantReview.php', restaurantReview);
        console.log(restaurantReview.body);
    }

    return (
        <form className='' onSubmit={onSubmit}>
            <div className='form-group'>
                <textarea name='review' value={textReview}
                    onChange={(e) => setTextReview(e.target.value)}
                    rows='5' cols='40' placeholder='Add review (500 characters limit)' />
            </div>
            <div className='add-review-form'>
                <div className='item'>
                    <label>Deliciousness</label>
                    {/* <Star onChange={(value) => setDeliciousness(value)} /> */}
                    <Star onChange={(value) => setDeliciousness(value)} />
                </div>
                <div className='item'>
                    <label>Service</label>
                    <Star onChange={(value) => setService(value)} />
                </div>
                <div className='item'>
                    <label>Experience</label>
                    <Star onChange={(value) => setExperience(value)} />
                </div>
                <div className='item'>
                    <label>Pricing</label>
                    <Star defaultValue={pricing} onChange={(value) => setPricing(value)} />
                </div>
                {/* <div className='item'>
                    <label>Pricing</label>
                    <br/>
                    $<input name='review-pricing' type='number' width='20' min='1' step='any' />
                </div> */}
                <div className="item">
                    <input type='submit' value='Submit'/>
                </div>
            </div>
        </form>
    )
}

export default RestaurantReview