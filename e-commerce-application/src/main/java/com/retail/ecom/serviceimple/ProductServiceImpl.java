package com.retail.ecom.serviceimple;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.retail.ecom.entity.Product;
import com.retail.ecom.entity.Seller;
import com.retail.ecom.enums.AvailabilityStatus;
import com.retail.ecom.enums.OrderBy;
import com.retail.ecom.exception.ProductNotFoundByIdException;
import com.retail.ecom.exception.UserNotFoundByUsernameException;
import com.retail.ecom.jwt.JwtService;
import com.retail.ecom.repository.ProductRepository;
import com.retail.ecom.repository.SellerRepository;
import com.retail.ecom.repository.UserRepository;
import com.retail.ecom.request_dto.ProductRequest;
import com.retail.ecom.request_dto.SearchFilters;
import com.retail.ecom.response_dto.ProductResponse;
import com.retail.ecom.service.ProductService;
import com.retail.ecom.utility.ProductSpecification;
import com.retail.ecom.utility.ResponseStructure;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
	private ProductRepository productRepository;
	private UserRepository userRepository;
	private SellerRepository sellerRepository;

	@Override
	public ResponseEntity<ResponseStructure<ProductResponse>> addProduct(ProductRequest productRequest) {

		String name = SecurityContextHolder.getContext().getAuthentication().getName();

		return userRepository.findByUsername(name).map(user -> {

			Product product = productRepository.save(mapToProduct(new Product(), productRequest));
			Seller seller = ((Seller) user);
			seller.getProducts().add(product);
			Seller save = sellerRepository.save(seller);
			return ResponseEntity.ok()
					.body(new ResponseStructure<ProductResponse>().setData(mapToProductResponse(product))
							.setMessage("product added").setStatusCode(HttpStatus.OK.value()));
		}).orElseThrow(() -> new UserNotFoundByUsernameException("user not found by username"));
	}

	@Override
	public ResponseEntity<ResponseStructure<ProductResponse>> updateProduct(ProductRequest productRequest,
			int productId) {

		return productRepository.findById(productId).map(product -> {
			Product product2 = productRepository.save(mapToProduct(product, productRequest));
			return ResponseEntity.ok()
					.body(new ResponseStructure<ProductResponse>().setData(mapToProductResponse(product2))
							.setMessage("product updated").setStatusCode(HttpStatus.OK.value()));

		}).get();

	}

	@Override
	public ResponseEntity<ResponseStructure<ProductResponse>> findProductById(int productId) {
		return productRepository.findById(productId).map(product -> {
			return ResponseEntity.ok()
					.body(new ResponseStructure<ProductResponse>().setData(mapToProductResponse(product))
							.setMessage("product updated").setStatusCode(HttpStatus.OK.value()));
		}).orElseThrow(() -> new ProductNotFoundByIdException("product with this id not present"));
	}

	private Product mapToProduct(Product product, ProductRequest productRequest) {

		product.setProductName(productRequest.getProductName());
		product.setProductCatagory(productRequest.getProductCatagory());
		product.setProductDescription(productRequest.getProductDescription());
		product.setProductPrice(productRequest.getProductPrice());
		product.setProductQuantity(productRequest.getProductQuantity());
		if (productRequest.getProductQuantity() >= 10)
			product.setAvailabilityStatus(AvailabilityStatus.AVAILABLE);
		else if (productRequest.getProductQuantity() < 10 && productRequest.getProductQuantity() > 0)
			product.setAvailabilityStatus(AvailabilityStatus.ONLYFEWLEFT);
		else
			product.setAvailabilityStatus(AvailabilityStatus.OUTOFSTOCK);

		return product;
	}

	private ProductResponse mapToProductResponse(Product product) {
		return ProductResponse.builder().productId(product.getProductId()).productName(product.getProductName())
				.productPrice(product.getProductPrice()).productQuantity(product.getProductQuantity())
				.productCatagory(product.getProductCatagory()).productDescription(product.getProductDescription())
				.availabilityStatus(product.getAvailabilityStatus()).build();
	}

	@Override
	public List<Product> findAll(SearchFilters searchFilter, int page, String order, String sortBy) {
		//Pageable pageable = null;
		//if (OrderBy.ASE.equals(order.toUpperCase())) {
		Pageable pageable = (Pageable) PageRequest.of(page, 5, Sort.by(Direction.DESC, sortBy));
		//}
//		if (OrderBy.DES.equals(order.toUpperCase())) {
//			pageable = (Pageable) PageRequest.of(page, 5, Sort.by(Direction.DESC, sortBy));
//		}
		Page<Product> pagelist = productRepository.findAll(new ProductSpecification(searchFilter).buildSpecification(),
				pageable);
		return pagelist.getContent();
	}

	@Override
	public List<ProductResponse> searchText(String search) {
		List<ProductResponse> products=	productRepository.findByProductNameIgnoreCaseContainingOrProductDescriptionIgnoreCaseContaining(search, search)
		.stream().map(this::mapToProductResponse).toList();
		return products;
//		return ResponseEntity.status(HttpStatus.FOUND)
//				.body(new ResponseStructure<ProductResponse>().setData( mapToProductResponselist(products))
//						.setMessage("product updated").setStatusCode(HttpStatus.OK.value()));

	}

}
