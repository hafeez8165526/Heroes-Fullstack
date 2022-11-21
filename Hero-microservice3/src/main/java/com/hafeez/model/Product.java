package com.hafeez.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity(name = "product")
public class Product {
	

	@Id
	@Column(unique = true,name="Uniq_Id",length = 10000)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	private String Uniq_Id;
	@Column(length = 1000)
	private String		Title;
	@Column(length = 1000)
	private String		Url;
	@Column(length = 1000)
	private double Sku ;
	@Column(length = 1000)
	private double Price ;
	@Column(length = 1000)
	private String	Currency;
	@Column(length = 10000)
	private String Images;
	@Column(length = 1000)
	private String Scraped_at;
	
	public Product(@NotNull String uniq_Id, String title, String url, double sku, double price, String currency,
			String images, String scraped_at) {
		super();
		Uniq_Id = uniq_Id;
		Title = title;
		Url = url;
		Sku = sku;
		Price = price;
		Currency = currency;
		Images = images;
		Scraped_at = scraped_at;
	}

	public String getUniq_Id() {
		return Uniq_Id;
	}

	public void setUniq_Id(String uniq_Id) {
		Uniq_Id = uniq_Id;
	}

	public String getTitle() {
		return Title;
	}

	public void setTitle(String title) {
		Title = title;
	}

	public String getUrl() {
		return Url;
	}

	public void setUrl(String url) {
		Url = url;
	}

	public double getSku() {
		return Sku;
	}

	public void setSku(double sku) {
		Sku = sku;
	}

	public double getPrice() {
		return Price;
	}

	public void setPrice(double price) {
		Price = price;
	}

	public String getCurrency() {
		return Currency;
	}

	public void setCurrency(String currency) {
		Currency = currency;
	}

	public String getImages() {
		return Images;
	}

	public void setImages(String images) {
		Images = images;
	}

	public String getScraped_at() {
		return Scraped_at;
	}

	public void setScraped_at(String scraped_at) {
		Scraped_at = scraped_at;
	}

	public Product() {
		super();
	}
	
}
