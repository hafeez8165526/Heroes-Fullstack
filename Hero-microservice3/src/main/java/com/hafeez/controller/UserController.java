package com.hafeez.controller;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.hafeez.model.Cart;
import com.hafeez.model.Customer;
import com.hafeez.model.Product;
import com.hafeez.proxy.AuthProxy;
import com.hafeez.repo.CartRepo;
import com.hafeez.repo.CustomerRepo;
import com.hafeez.repo.ProductRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private ProductRepo repo;

	@Autowired
	private CustomerRepo crepo;

	@Autowired
	private CartRepo cart_repo;
	@Autowired
	private AuthProxy authProxy;

	@PostMapping("/save/{username}/{password}")
	public Customer saveUser(@RequestHeader(name = "Authorization") String token,
			@PathVariable("username") String username, @PathVariable("password") String password) {
		token = "Bearer " + token.substring(8, token.length()-1 );
		if (authProxy.validate(token).getBody())
			return crepo.save(new Customer(username, password));
		return null;
	}

	@GetMapping("/cart/{username}/all")
	public Set<Product> getAll(@RequestHeader(name = "Authorization") String token,
			@PathVariable("username") String username) {
		token = "Bearer " + token.substring(8, token.length()-1);
		if (authProxy.validate(token).getBody()) {
			Customer customer = crepo.findbyusername(username);
			if (customer == null) {
				return new HashSet<>();
			}
			Cart cart = customer.getCart();
			if (cart == null) {
				return new HashSet<>();
			}
			return cart.getProducts();
		}
		return new HashSet<>();
	}

	@DeleteMapping("/cart/delete/{username}/{productId}")
	@CrossOrigin
	public Set<Product> deleteFromCart(@RequestHeader(name = "Authorization") String token,
			@PathVariable("username") String username, @PathVariable("productId") String productId) {
		token = "Bearer " + token.substring(8, token.length()-1);
		if (authProxy.validate(token).getBody()) {
			Customer customer = crepo.findbyusername(username);
			if (customer == null) {
				return new HashSet<>();
			}
			Cart cart = customer.getCart();
			if (cart == null) {
				return new HashSet<>();
			}
			cart.setProducts(cart.getProducts().stream().filter(hero->!hero.getUniq_Id().equals(productId)).collect(Collectors.toSet()));
			cart_repo.save(cart);
			return cart_repo.findById(cart.getId()).get().getProducts();
		}
		return new HashSet<>();
	}

}
