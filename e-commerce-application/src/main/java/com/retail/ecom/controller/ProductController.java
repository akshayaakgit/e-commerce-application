package com.retail.ecom.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.retail.ecom.entity.Product;
import com.retail.ecom.enums.ProductCatagory;
import com.retail.ecom.request_dto.ProductRequest;
import com.retail.ecom.request_dto.SearchFilters;
import com.retail.ecom.response_dto.ProductResponse;
import com.retail.ecom.service.ProductService;
import com.retail.ecom.utility.ResponseStructure;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
@AllArgsConstructor
public class ProductController {

	private ProductService productService;

	@PreAuthorize("hasAuthority('SELLER')")
	@PostMapping("/products")
	public ResponseEntity<ResponseStructure<ProductResponse>> addProduct(@RequestBody ProductRequest productRequest) {
		return productService.addProduct(productRequest);
	}

	@PreAuthorize("hasAuthority('SELLER')")
	@PutMapping("/products/{productId}")
	public ResponseEntity<ResponseStructure<ProductResponse>> updateProduct(@RequestBody ProductRequest productRequest,
			@PathVariable int productId) {
		System.out.println(productId);
		return productService.updateProduct(productRequest, productId);
	}

	@GetMapping("/products/{productId}")
	public ResponseEntity<ResponseStructure<ProductResponse>> findProductById(@PathVariable int productId) {
		return productService.findProductById(productId);
	}

	@GetMapping("/filter/products")
	public List<Product> findAll(SearchFilters searchFilter,int Page,String ase,String sortby) {
		return productService.findAll(searchFilter,Page,ase,sortby);
	}
	@GetMapping("/products/category")
	public List<ProductCatagory> findCategory(SearchFilters searchFilter) {
		return Arrays.asList(ProductCatagory.values());
	}
	@GetMapping("/products")
	public List<ProductResponse> searchText(String search) {
		return productService.searchText(search);
	}
	

}
