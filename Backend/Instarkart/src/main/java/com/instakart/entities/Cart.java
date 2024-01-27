package com.instakart.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(length=10)
	private int productId ;
	@Column(length=10)
	private int sellerId;
	@Column(length=10)
	private int buyerId;
	@Column(length=100)
	private String productName;
	@Column(length=255)
	private String productCategory;
	@Column(length=255)
	private String productDescription;
	@Column(length=255)
	private String productImageUrl;
	@Column(length=55)
	private int productInStock;
	@Column(length=55)
	private double productPrice;
	@Column(length=55)
	private int productQuantity =1;
	public Cart(int sellerId, int buyerId, String productName, String productCategory, String productDescription,
			String productImageUrl, int productInStock, double productPrice, int productQuantity) {
		super();
		this.sellerId = sellerId;
		this.buyerId = buyerId;
		this.productName = productName;
		this.productCategory = productCategory;
		this.productDescription = productDescription;
		this.productImageUrl = productImageUrl;
		this.productInStock = productInStock;
		this.productPrice = productPrice;
		this.productQuantity = productQuantity;
	}
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSellerId() {
		return sellerId;
	}
	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}
	public int getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(int buyerId) {
		this.buyerId = buyerId;
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
	public int getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", productId=" + productId + ", sellerId=" + sellerId + ", buyerId=" + buyerId
				+ ", productName=" + productName + ", productCategory=" + productCategory + ", productDescription="
				+ productDescription + ", productImageUrl=" + productImageUrl + ", productInStock=" + productInStock
				+ ", productPrice=" + productPrice + ", productQuantity=" + productQuantity + "]";
	}
	
	
	
}
