package com.hafeez.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hafeez.model.Cart;
import com.hafeez.model.Customer;
import com.hafeez.model.Hero;
import com.hafeez.proxy.AuthProxy;
import com.hafeez.repo.CartRepo;
import com.hafeez.repo.CustomerRepo;
import com.hafeez.repo.HeroRepo;

@RestController
@RequestMapping("heroes")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3000/cart"})
public class HeroController {
	@Autowired
	private HeroRepo repo;
	
	@Autowired
	private CustomerRepo crepo;
	
	@Autowired
	private CartRepo cart_repo;
	@Autowired
	private AuthProxy authProxy;

	@GetMapping("/all")
	public List<Hero> getAll(@RequestHeader(name="Authorization") String token, HttpServletRequest req,HttpServletResponse res) {
		token="Bearer "+token.substring(8,token.length()-1);
		System.out.println(token);
		if(authProxy.validate(token).getBody()) return repo.findAll();
		return new ArrayList<>();
	}

	@GetMapping("/{id}")
	public Hero getAll(@PathVariable int id,@RequestHeader(name="Authorization") String token) {
		token="Bearer "+token.substring(8,token.length()-1);
		System.out.println(token);
		if(authProxy.validate(token).getBody()) return repo.findById(id).get();
		return  null;
	}

	@PostMapping()
	public void createEmp(@RequestBody Hero e) {
		repo.save(e);
	}
	
//	@GetMapping("/users/find/{username}")
//	public Customer ByUsername(@PathVariable("username") String username) {
//	    return crepo.findbyusername(username);
//	}
	
	@CrossOrigin
	@PostMapping("/cart/{username}/{heroId}")
	public void addHeroToCart(@PathVariable("username") String username,@PathVariable("heroId") Integer heroId) {
		Customer c=crepo.findbyusername(username);
//		System.out.println("=================+ "+c);
		try {
			Cart cart=cart_repo.findById(c.getCart().getId()).get();
			List<Hero> list;
			if(cart==null) { cart=new Cart();
			list=new ArrayList<>();
			}else {
				list=cart.getHeros();
			}
			list.add(repo.findById(heroId).get());
			cart.setHeros(list);
			c.setCart(cart);
			cart_repo.save(cart);
			crepo.save(c);
		}catch(Exception e) {
			Cart cart=new Cart();
			List<Hero> list=new ArrayList<>();
			list.add(repo.findById(heroId).get());
			cart.setHeros(list);
			c.setCart(cart);
			cart_repo.save(cart);
			crepo.save(c);
		}
		
	}

	@DeleteMapping("/{id}")
	public void deleteEmp(@PathVariable int id) {
		repo.deleteById(id);
	}

	@PutMapping
	public void updateEmp(@RequestBody Hero e) {
		Hero hero = repo.findById(e.getId()).get();

		hero.setCombat(e.getCombat());
		hero.setDurability(e.getDurability());
		hero.setFullName(e.getFullName());
		hero.setId(e.getId());
		hero.setIntelligence(e.getIntelligence());
		hero.setOccupation(e.getOccupation());
		hero.setPower(e.getPower());
		hero.setSlug(e.getSlug());
		hero.setSpeed(e.getSpeed());
		hero.setStrength(e.getStrength());
		hero.setImage(e.getImage());
		hero.setPrice(e.getPrice());
		repo.save(hero);

	}
	
	
}
