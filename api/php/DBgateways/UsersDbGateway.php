<?php

include "php/config.php";

class UsersDbGateway {


 private $dbConnection = null;

 private $servername = "localhost";
 private $username = "root";
 private $password = "foody";
 private $db = "foody";
 
 // Create connection
 private $conn = null;

    public function __construct()
    {
        $this->dbConnection = new DBConnecter();
    }


    public function registerNewUser($username, $email, $password) {
        $sql = "INSERT INTO 
                  foody.user (
                      email_address, 
                      username, 
                      password,
					  register_date
                )
                VALUES (
                    '$email', 
                    '$username',
                    '$password',
				     NOW()
                )";

                $result = $this->dbConnection->returnQuery($sql);
    }
	
	public function checkIfUsernameIsValid(string $username){
		// echo "check username function called";
		$sql = "SELECT 
				  username 
				FROM foody.user 
				WHERE username = '$username'";

        $result = $this->dbConnection->returnQuery($sql);
        $output = [];

           if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($output, $row["username"]);
            }
          } 

		return $output;
	}


    public function validateUserLoginInformation($username, $password) {
        $sql = "SELECT 
                  username,
                  password
                FROM foody.user
                WHERE username = '$username'
                AND password = '$password'
                ";


        $result = $this->dbConnection->returnQuery($sql);
        $output = [];

        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($output, $row["username"]);
                array_push($output, $row["password"]);
            }
        } 

        return $output;
    }
}