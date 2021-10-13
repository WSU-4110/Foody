<?php

include "php/DBgateways/UsersDbGateway.php";

class UsersService {
	
	private $usersDbGateway;
	
	
	public function __construct() {
		$this->usersDbGateway = new UsersDbGateway();
		// echo "service obj created";
	}
	
	public function validateNewUserData(string $username, string $email, string $password){
		$isUsernameValid = $this->usersDbGateway->checkIfUsernameIsValid($username);
		
		if(empty($isUsernameValid)){
			$this->usersDbGateway->registerNewUser($username, $email, $password);
			return "Valid username, account created";
		} else {
			return "Username is already in use with another account. Try a different username!";
		}
	}

	public function validateUserLoginRequest($username, $password) {
		$isLoginInformationValid = $this->usersDbGateway->validateUserLoginInformation($username, $password);

		if(!empty($isLoginInformationValid)){
			session_start();

			$_SESSION['username'] = $username;

			
			// echo $_SESSION['username'];
			return "User logged in";
		} else {
			return "Invalid username or password! Please try again.";
		}

	}
	
}