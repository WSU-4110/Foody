<?php

include_once "php/config.php";


class ReviewDbGateway {

    private $dbConnection = null;

    public function __construct() {
        $this->dbConnection = new DbConnecter();
    }

    public function getReviewId (int $userId, int $restaurantId) {
        $sql = "SELECT
                    review_id
                FROM foody.restaurant_review
                WHERE user_id = $userId
                AND restaurant_id = $restaurantId;";

        $result = $this->dbConnection->returnQuery($sql);

        $reviewId = mysqli_fetch_assoc($result)["review_id"];

        return $reviewId;
    }

    public function getReview (int $userId, int $restaurantid) {
        $sql = "SELECT
                    review_id,
                    restaurant_id,
                    user_id,
                    review,
                    deliciousness_score,
                    service_score,
                    experience_score,
                    pricing_score,
                    pricing_value,
                    post_date,
                    update_date
                FROM foody.restaurant_review
                WHERE user_id = $userId
                AND restaurant_id = $restaurantId;";

        $this->dbConnection->returnQuery($sql);

        $review = mysqli_fetch_assoc($result);

        return $review;
    }

    public function updateReview (int $userId, int $restaurantId, string $review, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue) {
        $review = $this->dbConnection->cleanInput($review);

        $sql = "UPDATE foody.restaurant_review
                SET
                    review = '$review',
                    deliciousness_score = $deliciousnessScore,
                    service_score = $serviceScore,
                    experience_score = $experienceScore,
                    pricing_score = $pricingScore,
                    pricing_value = $pricingValue,
                    update_date = CURRENT_TIMESTAMP()
                WHERE
                    user_id = $userId AND
                    restaurant_id = $restaurantId;";

        $this->dbConnection->returnQuery($sql);
    }

    public function saveReview (int $userId, int $restaurantId, string $textReview, int $deliciousnessScore, int $serviceScore, int $experienceScore, int $pricingScore, float $pricingValue) {
        $textReview = $this->dbConnection->cleanInput($textReview);

        $sql = "INSERT INTO foody.restaurant_review (
                    user_id,
                    restaurant_id,
                    review,
                    deliciousness_score,
                    service_score,
                    experience_score,
                    pricing_score,
                    pricing_value
                )
                VALUES (
                    $userId,
                    $restaurantId,
                    '$textReview',
                    $deliciousnessScore,
                    $serviceScore,
                    $experienceScore,
                    $pricingScore,
                    $pricingValue
                );";

        $this->dbConnection->returnQuery($sql);
    }

    public function deleteReview (int $reviewId) {
        $sql = "DELETE FROM foody.restaurant_review 
                WHERE
                    review_id = $reviewId";
    }

    public function getUserReviews (int $userId) {
        $sql = "SELECT
                    r.restaurant_name,
                    r.restaurant_address,
                    r.restaurant_phone,
                    r.restaurant_website,
                    rr.review_id,
                    rr.restaurant_id,
                    rr.user_id,
                    rr.review,
                    rr.deliciousness_score,
                    rr.service_score,
                    rr.experience_score,
                    rr.pricing_score,
                    rr.pricing_value,
                    rr.post_date,
                    rr.update_date
        FROM foody.restaurant_review AS rr
        INNER JOIN foody.restaurant r
          ON r.restaurant_id = rr.restaurant_id
        WHERE
          rr.user_id = $userId";
    }

    public function saveReviewImage (int $reviewId, string $imageName, string $imageSize, string $imageType, string $image) {
        $sql = "INSERT INTO foody.restaurantImages (review_id, image_name, image_size, image_type, image_encoded)
            VALUES ('$reviewId', '$imageName', '$imageSize', '$imageType', '$image')";

        $this->dbConnection->returnQuery($sql);
    }
}