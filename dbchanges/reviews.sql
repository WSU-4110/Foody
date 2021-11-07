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
  postDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
)

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
  -- SAMPLE RUN -> CALL foody.sp_validateRestaurant ('testRestaurant', '123 test dr', 'xxx-xxx-xxxx', 'http://test.com', @restaurantId);
  INSERT INTO foody.restaurants (restaurantName, restaurantAddress, restaurantPhone, restaurantWebsite)
  SELECT * FROM (SELECT p_restaurantName, p_restaurantAddress, p_restaurantPhone, p_restaurantWebsite) AS tmp
  WHERE NOT EXISTS (SELECT 1 FROM foody.restaurants WHERE restaurantName = p_restaurantName AND
    restaurantAddress = p_restaurantAddress);

  SELECT restaurantId from foody.restaurants WHERE restaurantName = p_restaurantName AND p_restaurantAddress = p_restaurantAddress;
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
  IN p_pricingScore int
)
BEGIN
  -- SAMPLE RUN -> CALL foody.sp_saveReview (1, 2, 'test', 5, 5, 5, 5);
  -- add update if review exists
  IF EXISTS (SELECT 1 FROM foody.restaurantReviews WHERE restaurantId = p_restaurantId AND userId = p_userId)
  THEN BEGIN
    UPDATE foody.restaurantReviews SET
      review = p_review,
      deliciousnessScore = p_deliciousnessScore,
      serviceScore = p_serviceScore,
      experienceScore = p_experienceScore,
      pricingScore = p_pricingScore,
      updateDate = CURRENT_TIMESTAMP()
    WHERE restaurantId = p_restaurantId AND userId = p_userId;

    SELECT 'Review updated' AS result;
  END;
  ELSE
  INSERT INTO foody.restaurantReviews (
    restaurantId,
    userId,
    review,
    deliciousnessScore,
    serviceScore,
    experienceScore,
    pricingScore
  )
  VALUES (
    p_restaurantId,
    p_userId,
    p_review,
    p_deliciousnessScore,
    p_serviceScore,
    p_experienceScore,
    p_pricingScore
  );

  SELECT 'Review saved' AS result;
  END IF;
END $$

DELIMITER ;

-- select * from restaurants;
-- select * from restaurantReviews;