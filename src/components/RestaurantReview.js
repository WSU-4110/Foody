import { useState } from "react";
import { Star } from "react-star";
import FileBase64 from "react-file-base64";

const RestaurantReview = ({
  restaurantName,
  restaurantPhone,
  restaurantAddress,
  restaurantWebsite,
}) => {
  const [textReview, setTextReview] = useState("");
  const [deliciousnessScore, setDeliciousnessScore] = useState(0);
  const [serviceScore, setServiceScore] = useState(0);
  const [experienceScore, setExperienceScore] = useState(0);
  const [pricingScore, setPricingScore] = useState(0);
  const [pricingValue, setPricingValue] = useState(0);
  const [base64Img, setBase64Img] = useState();


  const onSubmit = (e) => {
    e.preventDefault();

    const restaurantReview = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url: "/restaurant/review/save",
        restaurantName: restaurantName,
        restaurantPhone: restaurantPhone,
        restaurantAddress: restaurantAddress,
        restaurantWebsite: restaurantWebsite,
        review: textReview,
        deliciousnessScore: deliciousnessScore,
        serviceScore: serviceScore,
        experienceScore: experienceScore,
        pricingScore: pricingScore,
        pricingValue: pricingValue,
        images: base64Img.length > 0 ? base64Img[1] : '' //TODO: add validation for empty array
      }),
    };

    saveReview(restaurantReview);
  };

  const saveReview = async (restaurantReview) => {
    // console.log(restaurantReview.body);
    // console.warn(base64Img[1][0].base64);
    const res = await fetch(
      "http://localhost:80/api/test.php",
      restaurantReview
    );


    // const data = res.json();
    // console.warn(data['response']);
    // alert(data['response']);
  };


  return (
    <form className="" onSubmit={onSubmit}>
      <div className="form-group">
        <textarea
          name="review"
          maxLength="500"
          onChange={(e) => setTextReview(e.target.value)}
          rows="5"
          cols="40"
          placeholder="Add review (500 characters limit)"
        />
      </div>
      <div className="add-review-form">
        <div className="item-one-row">
          <sup>{textReview.length}/500</sup>
        </div>
        <div className="item-two-row">
          <label>Deliciousness</label>
          <Star onChange={(value) => setDeliciousnessScore(value)} />
        </div>
        <div className="item-two-row">
          <label>Service</label>
          <Star onChange={(value) => setServiceScore(value)} />
        </div>
        <div className="item-two-row">
          <label>Experience</label>
          <Star onChange={(value) => setExperienceScore(value)} />
        </div>
        <div className="item-two-row">
          <label>Pricing</label>
          <Star onChange={(value) => setPricingScore(value)} />
        </div>
        <div className="item-one-row">
          <label></label>
          $
          <input
            name="pricingValue"
            type="number"
            min="1"
            step="0.01"
            onChange={(e) => setPricingValue(e.target.value)}
          />{" "}
          spent
        </div>
        <div className="item-one-row">
          <FileBase64
            type="file"
            multiple={true}
            onDone={
              (base64) => setBase64Img([base64Img, base64])}
          />
        </div>
        <div className="item-one-row">
          <input type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
};

export default RestaurantReview;
