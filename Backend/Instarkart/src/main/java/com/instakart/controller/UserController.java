package com.instakart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.instakart.entities.UserDetails;
import com.instakart.model.Login;
import com.instakart.repo.UserRepo;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ObjectMapper mapper;

	public UserController() {
		super();
		// TODO Auto-generated constructor stub
	}

	@GetMapping("/login")
	public ResponseEntity<?> getLoginUser(@RequestParam("data") String data) throws JsonMappingException, JsonProcessingException {
		Login login = mapper.readValue(data, Login.class);
		UserDetails found = userRepo.findByUserEmailAndUserPasswordAndUserType(login.userEmail, login.userPassword, login.userType);
			if (found == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} 
			System.out.println(found);
			return ResponseEntity.status(HttpStatus.OK).body(found);
	
	}
	
	@PostMapping("")
	public ResponseEntity<?>  newUser(@RequestBody UserDetails newUser) {
		 UserDetails save = userRepo.save(newUser);
		 if(save == null) {
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		 }
		 return ResponseEntity.status(HttpStatus.OK).body(save);
	}

}
