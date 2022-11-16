
package com.hafeez.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Entity
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	@NotNull
	private int id;

	private String userName;

	@Pattern(regexp = "^[A-Za-z0-9]+$", message = "Password should contain alpha numeric values")
	private String password;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@OneToOne(cascade = CascadeType.ALL,targetEntity = Cart.class)
//	@JoinColumn(referencedColumnName = "id",name="cart_id")
	private Cart cart;

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Customer(String userName,
			@Pattern(regexp = "^[A-Za-z0-9]+$", message = "Password should contain alpha numeric values") String password) {
		super();
		this.userName = userName;
		this.password = password;
	}

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

//	@Override
//	public String toString() {
//		return "UserCredentials [userName=" + username + ", password=" + password + "]";
//	}
	
}
