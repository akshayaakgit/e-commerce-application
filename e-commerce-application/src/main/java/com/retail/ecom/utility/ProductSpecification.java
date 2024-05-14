package com.retail.ecom.utility;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;

import com.retail.ecom.entity.Product;
import com.retail.ecom.request_dto.SearchFilters;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ProductSpecification {
	private SearchFilters searchFilters;

	public Specification<Product> buildSpecification() {
		
		return (root,query,criteriaBuilder)->{
			List<Predicate> predicates=new ArrayList<>();
			
			if(searchFilters.getMinPrice()>0) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("productPrice"), searchFilters.getMinPrice()));			
			}
			if(searchFilters.getMaxPrice()>0) {
				predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("productPrice"), searchFilters.getMaxPrice()));
			}
			if(searchFilters.getCategory()!=null) {
				predicates.add(criteriaBuilder.equal(root.get("productCatagory"), searchFilters.getCategory()));
			}
			if(searchFilters.getDiscount()>0) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discount"), searchFilters.getDiscount()));
			}
			if(searchFilters.getRating()>0) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), searchFilters.getRating()));
			}
			return criteriaBuilder.and( predicates.toArray(new Predicate[0]));
		};
		//return null;
	}
}
