package com.retail.ecom.serviceimple;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.retail.ecom.entity.CartProduct;
import com.retail.ecom.entity.Customer;
import com.retail.ecom.entity.Product;
import com.retail.ecom.exception.UserNotFoundByUsernameException;
import com.retail.ecom.repository.CartProductRepo;
import com.retail.ecom.repository.ProductRepository;
import com.retail.ecom.repository.UserRepository;
import com.retail.ecom.response_dto.CartProductResponce;
import com.retail.ecom.response_dto.ProductResponse;
import com.retail.ecom.service.CartProductService;
import com.retail.ecom.utility.ResponseStructure;
import com.retail.ecom.utility.SimpleResponseStructure;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartProductServiceImpl implements CartProductService {
	private CartProductRepo cartProductRepo;
	private ProductRepository productRepository;
	private UserRepository userRepository;

	@Override
	public ResponseEntity<SimpleResponseStructure> addCartProduct(int productId,
			int selectedQuantity) {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		return userRepository.findByUsername(name).map(user -> {
			//return productRepository.findById(productId).map(product -> {
			Optional<Product> product=productRepository.findById(productId);
				CartProduct cartProduct = new CartProduct();
				cartProduct.setProduct(product.get());
				cartProduct.setSelectedQuantity(selectedQuantity);
				cartProduct.setCustomer((Customer)user);
				cartProductRepo.save(cartProduct);
				return ResponseEntity.ok(new SimpleResponseStructure()
						.setMessage("image added")
						.setStatus(HttpStatus.OK.value())); 
			//}).orElseThrow(() -> new ProductNotFoundByIdException("user not found by username"));

		}).orElseThrow(() -> new UserNotFoundByUsernameException("user not found by username"));
	}

	@Override
	public ResponseEntity<ResponseStructure<CartProductResponce>> getCartProduct() {
		return null;
	}

}
