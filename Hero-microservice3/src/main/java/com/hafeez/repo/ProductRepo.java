package com.hafeez.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hafeez.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, String>{
	@Query(value = " select * from product where title like %:category%",nativeQuery = true)
	public List<Product> findByCategory(@Param("category") String  category);

}
