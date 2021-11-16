USE foody;

DROP TABLE IF EXISTS foody.restaurants;
CREATE TABLE foody.restaurants (
  restaurantId int AUTO_INCREMENT PRIMARY KEY,
  restaurantName varchar(200),
  restaurantAddress varchar(200),
  restaurantPhone varchar(200),
  restaurantWebsite varchar(200),
  postDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
);


DROP TABLE IF EXISTS foody.restaurantReviews;
CREATE TABLE foody.restaurantReviews (
  reviewId int AUTO_INCREMENT PRIMARY KEY,
  restaurantId int NOT NULL,
  userId int NOT NULL,
  review varchar(500) NOT NULL,
  deliciousnessScore int,
  serviceScore int,
  experienceScore int,
  pricingScore int,
  pricingValue float,
  postDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
)

DROP TABLE IF EXISTS foody.restaurantImages;
CREATE TABLE foody.restaurantImages (
  restaurantId int NOT NULL,
  reviewId int NOT NULL,
  imageId int AUTO_INCREMENT PRIMARY KEY,
  imageName varchar(200),
  imageSize varchar(50),
  imageType varchar(50),
  imageEncoded TEXT CHARACTER SET ascii COLLATE ascii_bin,
  postDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
);


-- select * from information_schema.tables where table_schema='foody' limit 5;

-- ------------------------------------------------------------

DROP PROCEDURE IF EXISTS foody.sp_validateRestaurant;
DELIMITER $$

CREATE PROCEDURE foody.sp_validateRestaurant (
  IN p_restaurantName varchar(200),
  IN p_restaurantAddress varchar(200),
  IN p_restaurantPhone varchar(200),
  IN p_restaurantWebsite varchar(200)
)
BEGIN
  -- SAMPLE RUN -> CALL foody.sp_validateRestaurant ('testRestaurant', '123 test dr', 'xxx-xxx-xxxx', 'http://test.com');
  INSERT INTO foody.restaurants (restaurantName, restaurantAddress, restaurantPhone, restaurantWebsite)
  SELECT restaurantName, restaurantAddress, restaurantPhone, restaurantWebsite 
  FROM (SELECT p_restaurantName, p_restaurantAddress, p_restaurantPhone, p_restaurantWebsite) AS tmp
  WHERE NOT EXISTS (SELECT 1 FROM foody.restaurants WHERE restaurantName = p_restaurantName AND
    restaurantAddress = p_restaurantAddress);

  SELECT restaurantId from foody.restaurants WHERE restaurantName = p_restaurantName AND restaurantAddress = p_restaurantAddress;
END $$

DELIMITER ;

-- --------------------
DROP PROCEDURE IF EXISTS foody.sp_saveReview;
DELIMITER $$

CREATE PROCEDURE foody.sp_saveReview (
  IN p_restaurantId int,
  IN p_userId int,
  IN p_review varchar(500),
  IN p_deliciousnessScore int,
  IN p_serviceScore int,
  IN p_experienceScore int,
  IN p_pricingScore int,
  IN p_pricingValue float
)
BEGIN
  -- SAMPLE RUN -> CALL foody.sp_saveReview (1, 2, 'test', 5, 5, 5, 5, 23.5);
  IF EXISTS (SELECT 1 FROM foody.restaurantReviews WHERE restaurantId = p_restaurantId AND userId = p_userId)
  THEN BEGIN
    UPDATE foody.restaurantReviews SET
      review = p_review,
      deliciousnessScore = p_deliciousnessScore,
      serviceScore = p_serviceScore,
      experienceScore = p_experienceScore,
      pricingScore = p_pricingScore,
      pricingValue = p_pricingValue,
      updateDate = CURRENT_TIMESTAMP()
    WHERE restaurantId = p_restaurantId AND userId = p_userId;

    SELECT MAX(ReviewId) AS result FROM foody.restaurantReviews WHERE restaurantId = p_restaurantId AND userId = p_userId;
  END;
  ELSE
  INSERT INTO foody.restaurantReviews (
    restaurantId,
    userId,
    review,
    deliciousnessScore,
    serviceScore,
    experienceScore,
    pricingScore,
    pricingValue
  )
  VALUES (
    p_restaurantId,
    p_userId,
    p_review,
    p_deliciousnessScore,
    p_serviceScore,
    p_experienceScore,
    p_pricingScore,
    p_pricingValue
  );

  SELECT MAX(ReviewId) AS result FROM foody.restaurantReviews WHERE restaurantId = p_restaurantId AND userId = p_userId;
  END IF;
END $$

DELIMITER ;

-- --------------------
DROP PROCEDURE IF EXISTS foody.calcRestaurantAvgScore;
DELIMITER $$

CREATE PROCEDURE foody.calcRestaurantAvgScore (
  IN p_restaurantId int
)
BEGIN
  -- SAMPLE RUN -> CALL foody.calcRestaurantAvgScore (0);
  SELECT CASE
    WHEN ROUND((
  (SUM(deliciousnessScore) + 
  SUM(serviceScore) +
  SUM(experienceScore) +
  SUM(pricingScore))/4), 2) = null
    THEN 0
  END as result
FROM foody.restaurantreviews WHERE restaurantId = p_restaurantId;
END $$

DELIMITER ;

-- select * from restaurants;
-- select * from restaurantReviews;


-- --------------------