package com.retail.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.retail.ecom.entity.CartProduct;

public interface CartProductRepo extends JpaRepository<CartProduct, Integer>{

}
