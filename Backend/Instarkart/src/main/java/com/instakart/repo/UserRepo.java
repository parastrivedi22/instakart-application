package com.instakart.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.instakart.entities.UserDetails;


public interface UserRepo extends JpaRepository<UserDetails, Integer> {

	public  UserDetails  findByUserEmailAndUserPasswordAndUserType(String userEmail, String userPassword, String userType);
}
