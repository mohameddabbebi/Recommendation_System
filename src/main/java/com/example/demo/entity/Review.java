package com.example.demo.entity;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")

@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false )
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
	@JsonManagedReference
    private Product product;

    @Column(name="rating")
    private Integer rating; // 1-5

	@Column(name = "comment", length = 5000)
	private String comment;

	@Column(name = "sentiment_score")
	private String sentimentScore;

	@Column(name = "sentiment_confidence")
	private Double sentimentConfidence;
    @Column(name="created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getSentimentScore() {
		return sentimentScore;
	}

	public void setSentimentScore(String sentimentScore) {
		this.sentimentScore = sentimentScore;
	}

	public Double getSentimentConfidence() {
		return sentimentConfidence;
	}

	public void setSentimentConfidence(Double sentimentConfidence) {
		this.sentimentConfidence = sentimentConfidence;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
	
}