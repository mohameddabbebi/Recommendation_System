package com.example.demo.Repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.*;

import javax.swing.text.html.Option;
import java.awt.print.Pageable;
import java.util.*;
@Repository
public interface ProductRepository extends JpaRepository <Product,Long>{
	List<Product> findByCategory(String Category);
	List<Product> findByName(String Keyboard);
	Optional<Product> findByid(Long id);
	@Query("SELECT p FROM Product p ORDER BY p.averageRating DESC")
	List<Product> findTopRatedProduct(PageRequest pageRequest);
	@Query("SELECT p FROM Product p LEFT JOIN FETCH p.interactions i LEFT JOIN FETCH i.user WHERE p.id = :id")
	Optional<Product> findByIdWithInteractionsAndUsers(@Param("id") Long id);

}
