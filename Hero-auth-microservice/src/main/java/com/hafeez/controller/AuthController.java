package com.hafeez.controller;

import org.slf4j.LoggerFactory;

//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.hafeez.exception.UserNameNumericException;
import com.hafeez.exception.UserNotFoundException;
import com.hafeez.model.UserCredentials;
import com.hafeez.service.UserDetailsServiceImpl;
import com.hafeez.util.JwtUtil;

import ch.qos.logback.classic.Logger;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;

/**
 * Class for Authorization Controller
 */
@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	private static Logger log=(Logger) LoggerFactory.getLogger(AuthController.class);
	
	@GetMapping("/health-check")
	@Operation(summary = "This end point will used to check the status of authorization microservice ")
	public ResponseEntity<String> healthCheck() {
		return new ResponseEntity<>("Ok", HttpStatus.OK);
	}
	@GetMapping("/hi")
	@Operation(summary = "This end point will used to check the status of authorization microservice ")
	public ResponseEntity<String> hi(@RequestHeader("Authorization") String token) {
		
		return new ResponseEntity<>("Hiiii  "+token, HttpStatus.OK);
	}
	
	/**
	 * Method to validate the token
	 * 
	 * @param token1 This is the token send for authentication
	 * @return This returns true/false based on token validity
	 */

	@GetMapping("/validate")
	@Operation(summary = "This end point will used to Validate the token ")
	public ResponseEntity<Boolean> validate(@RequestHeader(name = "Authorization") String token1) {
		String token = token1.substring(7);
//		String token = token1;
		log.debug("token : {}",token);
		try {
			UserDetails user = userDetailsService.loadUserByUsername(jwtUtil.extractUsername(token));
			
			if (jwtUtil.validateToken(token, user)) {
				System.out.println("=================Inside Validate==================");
				return new ResponseEntity<>(true, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
		}
	}

	/**
	 * Method to check whether login credentials are correct or not
	 * 
	 * @param userCredentials user credentials contain user name and password
	 * @return This returns token on successful login else throws exception
	 */
	@PostMapping("/login")
	@Operation(summary = "This end point will used to check user details and generate the Token ")
	public String login(@RequestBody UserCredentials userCredentials) {
		log.info("start login ");
		if (userCredentials.getUserName() == null || userCredentials.getPassword() == null
				|| userCredentials.getUserName().trim().isEmpty() || userCredentials.getPassword().trim().isEmpty()) {
			log.debug("Login unsuccessful --> User name or password is empty");
			throw new UserNotFoundException("User name or password cannot be Null or Empty");
		}

		else if (jwtUtil.isNumeric(userCredentials.getUserName())) {
			log.debug("Login unsuccessful --> User name is numeric");
			throw new UserNameNumericException("User name is numeric");
		}

		else {
			try {
				UserDetails user = userDetailsService.loadUserByUsername(userCredentials.getUserName());
				if (user.getPassword().equals(userCredentials.getPassword())) {
					String token = jwtUtil.generateToken(user.getUsername());
					log.info(token);
					log.debug("Login successful");
					return token;
				} else {
					log.debug("Login unsuccessful --> Invalid password");
					throw new UserNotFoundException("Password is wrong");
				}
			} catch (Exception e) {
				log.debug("Login unsuccessful --> Invalid Credential");
				throw new UserNotFoundException("Invalid Credential");
			}
		}
	}
}
