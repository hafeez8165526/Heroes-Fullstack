package com.hafeez.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hafeez.model.Cart;
import com.hafeez.model.Customer;
import com.hafeez.model.Product;
import com.hafeez.proxy.AuthProxy;
import com.hafeez.repo.CartRepo;
import com.hafeez.repo.CustomerRepo;
import com.hafeez.repo.ProductRepo;

@RestController
@RequestMapping("products")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3000/cart" })
public class ProductController {
	@Autowired
	private ProductRepo repo;

	@Autowired
	private CustomerRepo crepo;

	@Autowired
	private CartRepo cart_repo;
	@Autowired
	private AuthProxy authProxy;

	@GetMapping("/all")
	public List<Product> getAll(@RequestHeader(name = "Authorization") String token, HttpServletRequest req,
			HttpServletResponse res) {
		token = "Bearer " + token.substring(8, token.length()-1);
		System.out.println(token);
		if (authProxy.validate(token).getBody())
			return repo.findAll();
		return new ArrayList<>();
	}
	
	@GetMapping("/all/{category}")
	public List<Product> getCategory(@RequestHeader(name = "Authorization") String token, @PathVariable("category") String category
			) {
		token = "Bearer " + token.substring(8, token.length()-1);
		System.out.println(token);
		if (authProxy.validate(token).getBody())
			return repo.findByCategory(category);
		return new ArrayList<>();
	}

	@GetMapping("/{id}")
	public Product getAll(@PathVariable String id, @RequestHeader(name = "Authorization") String token) {
		token = "Bearer " + token.substring(8, token.length()-1);
		System.out.println(token);
		if (authProxy.validate(token).getBody())
			return repo.findById(id).get();
		return null;
	}

	@PostMapping()
	public void createProduct(@RequestBody Product e, @RequestHeader(name = "Authorization") String token) {
		token = "Bearer " + token.substring(8, token.length()-1);
		if (authProxy.validate(token).getBody())
			repo.save(e);
	}

//	@GetMapping("/users/find/{username}")
//	public Customer ByUsername(@PathVariable("username") String username) {
//	    return crepo.findbyusername(username);
//	}

	@CrossOrigin
	@PostMapping("/cart/{username}/{productId}")
	public void addHeroToCart(@PathVariable("username") String username, @PathVariable("productId") String productId,
			@RequestHeader(name = "Authorization") String token) {
		token = "Bearer " + token.substring(8, token.length()-1 );
		if (authProxy.validate(token).getBody()) {
			Customer c = crepo.findbyusername(username);
			try {
				Cart cart = cart_repo.findById(c.getCart().getId()).get();
				Set<Product> list;
				if (cart == null) {
					cart = new Cart();
					list = new HashSet<>();
				} else {
					list = cart.getProducts();
				}
				list.add(repo.findById(productId).get());
				cart.setProducts(list);
				c.setCart(cart);
				cart_repo.save(cart);
				crepo.save(c);
			} catch (Exception e) {
				Cart cart = new Cart();
				Set<Product> list = new HashSet<>();
				list.add(repo.findById(productId).get());
				cart.setProducts(list);
				c.setCart(cart);
				cart_repo.save(cart);
				crepo.save(c);
			}

		}
		return;

	}

	@DeleteMapping("/{id}")
	public void deleteEmp(@PathVariable String id, @RequestHeader(name = "Authorization") String token) {
		token = "Bearer " + token.substring(8, token.length()-1);
		if (authProxy.validate(token).getBody())
			repo.deleteById(id);
	}
//
//	@PutMapping
//	public void updateEmp(@RequestBody Product e, @RequestHeader(name = "Authorization") String token) {
//		token = "Bearer " + token.substring(8, token.length() - 1);
//		if (authProxy.validate(token).getBody()) {
//			Product hero = repo.findById(e.getId()).get();
//			hero.setCombat(e.getCombat());
//			hero.setDurability(e.getDurability());
//			hero.setFullName(e.getFullName());
//			hero.setId(e.getId());
//			hero.setIntelligence(e.getIntelligence());
//			hero.setOccupation(e.getOccupation());
//			hero.setPower(e.getPower());
//			hero.setSlug(e.getSlug());
//			hero.setSpeed(e.getSpeed());
//			hero.setStrength(e.getStrength());
//			hero.setImage(e.getImage());
//			hero.setPrice(e.getPrice());
//			repo.save(hero);
//		}

//	}

}
