package com.instakart.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.instakart.entities.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {
	public List<Product> findBySellerId(int sellerId);
	
	@Query("SELECT  p FROM Product p WHERE "+
			" p.productName LIKE CONCAT('%', :query, '%')"+
					" or p.productDescription LIKE CONCAT('%', :query, '%')"+
			"or p.productCategory LIKE CONCAT('%', :query, '%')")
	public List<Product> searchProduct(String query);
}

