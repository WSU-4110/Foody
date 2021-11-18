<?php

header('Content-Type: image/png');

include "php/Dbgateways/RestaurantDbGateway.php";

interface Image {
    public function save(array $images);
}

class FileSystemImage implements Image {
    private $restaurantId;
    private $reviewId;

    public function __construct (int $restaurantId, int $reviewId) {
        $this->restaurantId = $restaurantId;
        $this->reviewId = $reviewId;
    }

    public function save(array $images) {
        foreach ($images as $image) {
            $bin = base64_decode($image->base64);
            $im = imageCreateFromString($bin);
            if (!$im) {
                die('Base64 value is not a valid image');
            }
            $imageName = dirname(__FILE__)."../../../public/client_images/$image->name.png";
            imagepng($im, $imageName, 0);

            $this->restaurantDbGateway->addRestaurantImage($this->restaurantId, $this->reviewId, $image->name, 'image/png', '', '');
        }
    }
}

class DbImage implements Image {
    private $restaurantId;
    private $reviewId;

    public function __construct(int $restaurantId, int $reviewId) {
        $this->restaurantId = $restaurantId;
        $this->reviewId = $reviewId;
    }

    public function save(array $images) {
        foreach ($images as $image) {
            $this->restaurantDbGateway->addRestaurantImage($this->restaurantId, $this->reviewId, $image->name, $image->type, $image->size, $image->base64);
        }
    }
}
