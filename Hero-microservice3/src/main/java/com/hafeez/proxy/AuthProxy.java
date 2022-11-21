package com.hafeez.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.hafeez.payload.UserCredentials;

import io.swagger.v3.oas.annotations.Operation;

@FeignClient(name="Heroauth-service",url = "http://localhost:8081/auth")
public interface AuthProxy {
	
	@GetMapping("/health-check")
	@Operation(summary = "This end point will used to check the status of authorization microservice ")
	public ResponseEntity<String> healthCheck();
	
	@GetMapping("/hi")
	@Operation(summary = "This end point will used to check the status of authorization microservice ")
	public ResponseEntity<String> hi(@RequestHeader("Authorization") String token);
	
	
	/**
	 * Method to validate the token
	 * 
	 * @param token1 This is the token send for authentication
	 * @return This returns true/false based on token validity
	 */

	@GetMapping("/validate")
	@Operation(summary = "This end point will used to Validate the token ")
	public ResponseEntity<Boolean> validate(@RequestHeader(name = "Authorization") String token1);
		

	/**
	 * Method to check whether login credentials are correct or not
	 * 
	 * @param userCredentials user credentials contain user name and password
	 * @return This returns token on successful login else throws exception
	 */
	@PostMapping("/login")
	@Operation(summary = "This end point will used to check user details and generate the Token ")
	public String login(@RequestBody UserCredentials userCredentials);
}
