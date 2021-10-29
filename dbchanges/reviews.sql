USE foody;


CREATE TABLE foody.reviews (
  id int AUTO_INCREMENT PRIMARY KEY,
  restaurantId int NOT NULL,
  userId int NOT NULL,
  review varchar(500),
  postDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- --------------------
DROP PROCEDURE IF EXISTS foody.sp_saveReview;
DELIMITER $$

CREATE PROCEDURE foody.sp_saveReview (
  IN restaurantId int,
  IN userId int,
  IN review varchar(500)
)
BEGIN
  -- SAMPLE RUN -> CALL foody.sp_saveReview (1, 2, 'test');
  INSERT INTO foody.reviews (
    restaurantId,
    userId,
    review
  )
  VALUES (
    restaurantId,
    userId,
    review
  );
END $$

DELIMITER ;