package com.instakart.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.instakart.entities.Cart;

public interface CartRepo extends JpaRepository<Cart, Integer> {
public List<Cart> findByBuyerId(int buyerId);
public void deleteByProductIdAndBuyerId(int productId, int buyerId);
}
