package com.hafeez.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity(name = "hero")
public class Hero {

	@Id
	@Column(unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	private int id;
	@Column(name = "name")
	private String name;
	@Column(name = "slug")
	private String slug;
	@Column(name = "intelligence")
	private int intelligence;
	@Column(name = "strength")
	private int strength;
	@Column(name = "speed")
	private int speed;
	@Column(name = "durability")
	private int durability;
	@Column(name = "power_")
	private int power_;
	@Column(name = "combat")
	private int combat;
	@Column(name = "occupation")
	private String occupation;
	@Column(name = "image")
	private String image;
	@Column(name = "price")
	private double price;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPower_() {
		return power_;
	}
	public void setPower_(int power_) {
		this.power_ = power_;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFullName() {
		return name;
	}
	public void setFullName(String fullName) {
		this.name = fullName;
	}
	public String getSlug() {
		return slug;
	}
	public void setSlug(String slug) {
		this.slug = slug;
	}
	
	public int getIntelligence() {
		return intelligence;
	}
	public void setIntelligence(int intelligence) {
		this.intelligence = intelligence;
	}
	public int getStrength() {
		return strength;
	}
	public void setStrength(int strength) {
		this.strength = strength;
	}
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public int getDurability() {
		return durability;
	}
	public void setDurability(int durability) {
		this.durability = durability;
	}
	public int getPower() {
		return power_;
	}
	public void setPower(int power) {
		this.power_ = power;
	}
	public int getCombat() {
		return combat;
	}
	public void setCombat(int combat) {
		this.combat = combat;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public Hero(int id, String fullName, String slug, int intelligence, int strength, int speed,
			int durability, int power, int combat, String occupation,String image,double price) {
		super();
		this.id = id;
		this.name = fullName;
		this.slug = slug;
		this.intelligence = intelligence;
		this.strength = strength;
		this.speed = speed;
		this.durability = durability;
		this.power_ = power;
		this.combat = combat;
		this.occupation = occupation;
		this.image=image;
		this.price=price;
	}
	public Hero() {
		super();
	}
	
}
