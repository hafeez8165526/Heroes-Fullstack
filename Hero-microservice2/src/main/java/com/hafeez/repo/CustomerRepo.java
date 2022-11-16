package com.hafeez.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hafeez.model.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer>{
	@Query(value="select * from customer where user_name=?1 ",nativeQuery = true)
	Customer findbyusername(String username);
}
