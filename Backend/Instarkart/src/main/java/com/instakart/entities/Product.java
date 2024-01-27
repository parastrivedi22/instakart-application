package com.instakart.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(length=10)
	private int sellerId;
	@Column(length=100)
	private String productName;
	@Column(length=255)
	private String productCategory;
	@Column(length=100)
	private String productDescription;
	@Column(length=255)
	private String productImageUrl;
	@Column(length=55)
	private int productInStock;
	@Column(length=55)
	private double productPrice;

	
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Product( String productName, String productCategory, String productDescription,
			String productImageUrl, int productInStock,  double productPrice) {
		super();

		this.productName = productName;
		this.productCategory = productCategory;
		this.productDescription = productDescription;
		this.productImageUrl = productImageUrl;
		this.productInStock = productInStock;
	
		this.productPrice = productPrice;
	}

	

	public int getSellerId() {
		return sellerId;
	}


	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getProductName() {
		return productName;
	}


	public void setProductName(String productName) {
		this.productName = productName;
	}


	public String getProductCategory() {
		return productCategory;
	}


	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}


	public String getProductDescription() {
		return productDescription;
	}


	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}


	public String getProductImageUrl() {
		return productImageUrl;
	}


	public void setProductImageUrl(String productImageUrl) {
		this.productImageUrl = productImageUrl;
	}


	public int getProductInStock() {
		return productInStock;
	}


	public void setProductInStock(int productInStock) {
		this.productInStock = productInStock;
	}




	public double getProductPrice() {
		return productPrice;
	}


	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}


	@Override
	public String toString() {
		return "Product [id=" + id + ", productName=" + productName + ", productCategory=" + productCategory
				+ ", productDescription=" + productDescription + ", productImageUrl=" + productImageUrl
				+ ", productInStock=" + productInStock + ", productPrice="+ productPrice + "]";
	}
	
	
	 
}
