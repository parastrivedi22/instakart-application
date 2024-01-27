package com.instakart.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id; // seller-id or user-id
	@Column(length=25)
	private String userType ;
	@Column(length=55)
	private String fullName;
	@Column(length=55)
	private String userPassword;
	@Column(length=55)
	private String userEmail;
	public UserDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDetails(String fullName, String userPassword, String userEmail) {
		super();
		this.fullName = fullName;
		this.userPassword = userPassword;
		this.userEmail = userEmail;
	}
	
	
	
	
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	@Override
	public String toString() {
		return "UserDetails [id=" + id + ", userType=" + userType + ", fullName=" + fullName + ", userPassword="
				+ userPassword + ", userEmail=" + userEmail + "]";
	}
	
	
}
