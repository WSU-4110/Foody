USE foody;

DROP TABLE IF EXISTS foody.restaurant;
CREATE TABLE foody.restaurant (
  restaurant_id int AUTO_INCREMENT PRIMARY KEY,
  restaurant_name varchar(200),
  restaurant_address varchar(200),
  restaurant_phone varchar(200),
  restaurant_website varchar(200),
  post_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
);


DROP TABLE IF EXISTS foody.restaurant_review;
CREATE TABLE foody.restaurant_review (
  review_id int AUTO_INCREMENT PRIMARY KEY,
  restaurant_id int NOT NULL,
  user_id int NOT NULL,
  review varchar(500) NOT NULL,
  deliciousness_score int,
  service_score int,
  experience_score int,
  pricing_score int,
  pricing_value float,
  post_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  update_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
)

DROP TABLE IF EXISTS foody.review_image;
CREATE TABLE foody.review_image (
  restaurant_id int NOT NULL,
  review_id int NOT NULL,
  image_id int AUTO_INCREMENT PRIMARY KEY,
  image_name varchar(200),
  image_size varchar(50),
  image_type varchar(50),
  image_encoded TEXT CHARACTER SET ascii COLLATE ascii_bin,
  post_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
);


-- select * from information_schema.tables where table_schema='foody' limit 5;

-- ------------------------------------------------------------

DROP PROCEDURE IF EXISTS foody.sp_validate_restaurant;
DELIMITER $$

CREATE PROCEDURE foody.sp_validate_restaurant (
  IN p_restaurant_name varchar(200),
  IN p_restaurant_address varchar(200),
  IN p_restaurant_phone varchar(200),
  IN p_restaurant_website varchar(200)
)
BEGIN
  -- SAMPLE RUN -> CALL foody.sp_validate_restaurant ('testRestaurant', '123 test dr', 'xxx-xxx-xxxx', 'http://test.com');
  INSERT INTO foody.restaurant (restaurant_name, restaurant_address, restaurant_phone, restaurant_website)
  SELECT restaurant_name, restaurant_address, restaurant_phone, restaurant_website 
  FROM (SELECT p_restaurant_name AS restaurant_name, p_restaurant_address AS restaurant_address, 
    p_restaurant_phone AS restaurant_phone, p_restaurant_website AS restaurant_website) AS tmp
  WHERE NOT EXISTS (SELECT 1 FROM foody.restaurant WHERE restaurant_name = p_restaurant_name AND
    restaurant_address = p_restaurant_address);

  SELECT restaurant_id from foody.restaurant WHERE restaurant_name = p_restaurant_name AND restaurant_address = p_restaurant_address;
END $$

DELIMITER ;

-- --------------------
DROP PROCEDURE IF EXISTS foody.sp_save_review;
DELIMITER $$

CREATE PROCEDURE foody.sp_save_review (
  IN p_restaurant_id int,
  IN p_user_id int,
  IN p_review varchar(500),
  IN p_deliciousness_score int,
  IN p_service_score int,
  IN p_experience_score int,
  IN p_pricing_score int,
  IN p_pricing_value float
)
BEGIN
  -- SAMPLE RUN -> CALL foody.sp_save_review (1, 2, 'test', 5, 5, 5, 5, 23.5);
  IF EXISTS (SELECT 1 FROM foody.restaurant_review WHERE restaurant_id = p_restaurant_id AND user_id = p_user_id)
  THEN BEGIN
    UPDATE foody.restaurant_review SET
      review = p_review,
      deliciousness_score = p_deliciousness_score,
      service_score = p_service_score,
      experience_score = p_experience_score,
      pricing_score = p_pricing_score,
      pricing_value = p_pricing_value,
      update_date = CURRENT_TIMESTAMP()
    WHERE restaurant_id = p_restaurant_id AND user_id = p_user_id;

    SELECT MAX(review_id) AS result FROM foody.restaurant_review WHERE restaurant_id = p_restaurant_id AND user_id = p_user_id;
  END;
  ELSE
  INSERT INTO foody.restaurant_review (
    restaurant_id,
    user_id,
    review,
    deliciousness_score,
    service_score,
    experience_score,
    pricing_score,
    pricing_value
  )
  VALUES (
    p_restaurant_id,
    p_user_id,
    p_review,
    p_deliciousness_score,
    p_service_score,
    p_experience_score,
    p_pricing_score,
    p_pricing_value
  );

  SELECT MAX(review_id) AS result FROM foody.restaurant_review WHERE restaurant_id = p_restaurant_id AND user_id = p_user_id;
  END IF;
END $$

DELIMITER ;

-- --------------------
DROP PROCEDURE IF EXISTS foody.calc_avg_score;
DELIMITER $$

CREATE PROCEDURE foody.calc_avg_score (
  IN p_restaurant_id int
)
BEGIN
  -- SAMPLE RUN -> CALL foody.calc_avg_score (0);
  SELECT CASE
    WHEN ROUND((
  (SUM(deliciousness_score) + 
  SUM(service_score) +
  SUM(experience_score) +
  SUM(pricing_score))/4), 2) = null
    THEN 0
  END as result
FROM foody.restaurant_review WHERE restaurant_id = p_restaurant_id;
END $$

DELIMITER ;

-- select * from restaurants;
-- select * from restaurantReviews;


-- --------------------