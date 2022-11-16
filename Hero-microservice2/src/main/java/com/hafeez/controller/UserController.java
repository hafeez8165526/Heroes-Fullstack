package com.hafeez.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hafeez.model.Customer;
import com.hafeez.repo.CustomerRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private CustomerRepo cr;
	
	@PostMapping("/save/{username}/{password}")
	public Customer saveUser(@PathVariable("username") String username,@PathVariable("password") String password) {
		return cr.save(new Customer(username,password));
	}

}
