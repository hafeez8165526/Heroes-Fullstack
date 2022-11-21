package com.hafeez.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	@NotNull
	private int cart_id;
	
	@ManyToMany(cascade = CascadeType.ALL,targetEntity = Product.class)
	@JoinTable(joinColumns = @JoinColumn(referencedColumnName = "cart_id"),inverseJoinColumns = @JoinColumn(referencedColumnName = "Uniq_Id"))
	private Set<Product> Product;
	

	public Set<Product> getProducts() {
		return Product;
	}

	public int getId() {
		return cart_id;
	}

	public void setId(int id) {
		this.cart_id = id;
	}

	public void setProducts(Set<Product> Products) {
		Product = Products;
	}


	public Cart(@NotNull int cart_id, Set<com.hafeez.model.Product> product) {
		super();
		this.cart_id = cart_id;
		Product = product;
	}

	public Cart() {
		super();
	}

}
