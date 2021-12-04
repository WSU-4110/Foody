<?php


include_once "php/Dbgateways/ReviewDbGateway.php";
include_once "php/services/RestaurantService.php";
include_once "php/services/UsersService.php";

class ReviewService {
    private $reviewDbGateway;
    private $restaurantService;
    private $usersService;

    public function __construct() {
        $this->reviewDbGateway = new ReviewDbGateway();
        $this->restaurantService = new RestaurantService();
        $this->usersService = new UsersService();
    }

    public function validateReview(int $userId, int $restaurantId) {
        $reviewId = $this->reviewDbGateway->getReviewId($userId, $restaurantId);
        if (empty($reviewId)) {
            return "Review not found";
        }
        else {
            return "Review found";
        }
    }

    public function processReview (array $restaurantData, array $reviewData, array $images) {
        $restaurantExists = $this->restaurantService->validateRestaurant($restaurantData['name'], $restaurantData['address']);
        if ($restaurantExists == "Restaurant not found") {
            $this->restaurantService->saveRestaurant($restaurantData['name'], $restaurantData['address'], $restaurantData['phone'], $restaurantData['website']);
        }
        $restaurantId = $this->restaurantService->getRestaurantId($restaurantData['name'], $restaurantData['address'])['restaurantId'];

        // $userId = $this->usersService->getUserId($_SESSION['username'])['userId'];
        $userId = 0;

        $checkReview = $this->validateReview($userId, $restaurantId);

        if ($checkReview == "Review not found") {
            $this->reviewDbGateway->saveReview($userId, $restaurantId, $reviewData['textReview'], $reviewData['deliciousnessScore'], $reviewData['serviceScore'], $reviewData['experienceScore'], $reviewData['pricingScore'], $reviewData['pricingValue']);
            return "Review saved";
        }
        else {
            $this->reviewDbGateway->updateReview($userId, $restaurantId, $reviewData['textReview'], $reviewData['deliciousnessScore'], $reviewData['serviceScore'], $reviewData['experienceScore'], $reviewData['pricingScore'], $reviewData['pricingValue']);
            return "Review updated";
        }

        // TODO: retrieve review id, save images (sprint 3)
    }

    public function getReviewId(int $userid, int $restaurantId) {
        $reviewId = $this->reviewDbGateway->getReviewId($userId, $restaurantId);
    }

    public function saveReviewImages (int $reviewId, array $images) {
        if (!empty($images)) {
            foreach ($images as $image) {
                $this->reviewDbGateway->saveReviewImage($reviewId, $image->name, $image->type, $image->size, $image->base64);
            }
        }
    }

    public function getRestaurantReviews($restaurantName, $restaurantAddress) {
        $restaurantId = $this->restaurantService->getRestaurantId($restaurantName, $restaurantAddress);

        // this should really check if restaurant is null or not
        #TODO: refactoring getRestaurantId method in restaurantService
        if(empty($restaurantId)) {
            return "No Reviews For This Restaurant!";
        }

        $reviews = $this->reviewDbGateway->getRestaurantReviews($restaurantId['restaurantId']);
        return $reviews;
    }
}