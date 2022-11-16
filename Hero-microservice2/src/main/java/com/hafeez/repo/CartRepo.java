package com.hafeez.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hafeez.model.Cart;
import com.hafeez.model.Customer;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer>{
	
}
