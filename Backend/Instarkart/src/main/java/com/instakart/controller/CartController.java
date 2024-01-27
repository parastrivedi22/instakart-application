package com.instakart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.instakart.entities.Cart;
import com.instakart.repo.CartRepo;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:4200")
@EnableTransactionManagement
@Transactional
public class CartController {

	@Autowired
	CartRepo cartRepo;

	@PostMapping("/add")
	public ResponseEntity<?> addToCart(@RequestBody Cart data) {
		
		try {
			Cart saved = cartRepo.save(data);
			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	@GetMapping("/{buyerId}")
	public ResponseEntity<?> getCardProductList(@PathVariable Integer buyerId) {
		if (buyerId != null) {
			try {
				List<Cart> productList = cartRepo.findByBuyerId(buyerId);
				return ResponseEntity.ok(productList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> moveFromCart(
			@RequestParam("productId") int productId,
			@RequestParam("buyerId") int buyerId
			) {
		try {
			cartRepo.deleteByProductIdAndBuyerId(productId, buyerId );
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/updateQuantity")
	public ResponseEntity<?> updateQuantity(@RequestBody Cart product){
	try {
		Cart saved = cartRepo.save(product);
		if(saved != null) {
			return ResponseEntity.ok(saved);
		}
	}
	catch(Exception e) {
		e.printStackTrace();
	}
		System.out.println(product);
		
		return ResponseEntity.internalServerError().build();
	}
	
//	
//	@DeleteMapping("/delete")
//	public ResponseEntity<?> moveFromCart( @RequestParam("data") String data	) throws JsonMappingException, JsonProcessingException {
//		DeleteModel model = mapper.readValue(data, DeleteModel.class);
//		System.out.println(model);
//		try {
//			cartRepo.deleteByProductIdAndBuyerId(model.productId, model.buyerId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return ResponseEntity.internalServerError().build();
//		}
//		return ResponseEntity.ok().build();
//	}

}
