package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.*;
@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 2000)
    private String description;

    private String category;
    
    private Double price;
    @Column(name = "imageurl")
    private String imageUrl;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonBackReference
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL ,fetch=FetchType.LAZY)
	@JsonManagedReference
    private List<Interaction> interactions;
    
    private Double averageRating;
    

	@CreationTimestamp
    private LocalDateTime createdAt;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public Double getPrice() {
		return price;
	}


	public void setPrice(Double price) {
		this.price = price;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public List<Review> getReviews() {
		return reviews;
	}


	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}


	public List<Interaction> getInteractions() {
		return interactions;
	}


	public void setInteractions(List<Interaction> interactions) {
		this.interactions = interactions;
	}


	public Double getAverageRating() {
		return averageRating;
	}


	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	
}