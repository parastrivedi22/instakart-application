package com.instakart.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.instakart.entities.Product;
import com.instakart.helper.ImageHandler;
import com.instakart.repo.ProductRepo;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

	@Autowired
	ProductRepo productRepo;
	@Autowired
	ObjectMapper mapper;
	@Autowired
	ImageHandler imageHandler;

	@PostMapping("/new")
	public ResponseEntity<?> addNewProduct(@RequestParam("file") MultipartFile file,
			@RequestParam("product") String prd) throws JsonMappingException, JsonProcessingException {
		try {

			if (file.isEmpty() || prd.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something went wrong");
			}
			Product product = mapper.readValue(prd, Product.class);
			
			product.setProductImageUrl(imageHandler.saveImage(file));
			productRepo.save(product);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
		}
		return ResponseEntity.status(HttpStatus.OK).body("");
	}



	@GetMapping("")
	public List<Product> getProducts() {
		List<Product> products = (List<Product>) productRepo.findAll();
		return products;
	}

	@GetMapping("/{productId}")
	public Product getProductById(@PathVariable int productId) {
		Optional<Product> opp = productRepo.findById(productId);
		return opp.get()	;
	}

	@GetMapping("/s/{sellerId}")
	public List<Product> getProductBySellerId(@PathVariable int sellerId) {
		List<Product> products = productRepo.findBySellerId(sellerId);
		return products;
	}
	
  @GetMapping("/search")
  public ResponseEntity<?> searchProduct(@RequestParam String query){
	  try {
	  List<Product> searchProduct = productRepo.searchProduct(query);
	  if(searchProduct != null) {
		  return ResponseEntity.ok(searchProduct);
	  }
	  }catch(Exception e) {
		    e.printStackTrace();
	  }
	  return ResponseEntity.internalServerError().build();
  }

	@PutMapping("/update")
	public ResponseEntity<?> updateProduct(@RequestBody Product product) {
		Optional<Product> opp = productRepo.findById(product.getId());
		if (opp != null) {
			Product prd = opp.get();
			prd.setId(product.getId());
			prd.setSellerId(product.getSellerId());
			prd.setProductName(product.getProductName());
			prd.setProductCategory(product.getProductCategory());
			prd.setProductDescription(product.getProductDescription());
			prd.setProductImageUrl(product.getProductImageUrl());
			prd.setProductInStock(product.getProductInStock());
			prd.setProductPrice(product.getProductPrice());
			System.out.println( "update="+product);
			System.out.println(prd);
			Product saved = productRepo.save(prd);
			return ResponseEntity.ok(saved);
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/delete/{productId}")
	public void deleteProduct(@PathVariable int productId) {
		System.out.println(productId);
		productRepo.deleteById(productId);
	}

//	-----------
}
