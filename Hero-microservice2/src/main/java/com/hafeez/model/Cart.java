package com.hafeez.model;

import java.util.List;

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
	private int id;
	
	@ManyToMany(cascade = CascadeType.ALL,targetEntity = Hero.class)
	@JoinTable(joinColumns = @JoinColumn(referencedColumnName = "id"),inverseJoinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Hero> Heros;
	

	public List<Hero> getHeros() {
		return Heros;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setHeros(List<Hero> heros) {
		Heros = heros;
	}

	public Cart(List<Hero> heros) {
		super();
		Heros = heros;
	}
	public Cart() {
		super();
	}

}
