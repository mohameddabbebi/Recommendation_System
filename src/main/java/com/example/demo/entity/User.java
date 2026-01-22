package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.*;

@Entity
@Table(name="users")

@NoArgsConstructor
@AllArgsConstructor

public class User {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true , nullable=false)
	private String name;
	@Column(unique = true , nullable =false)
	private String email;
	@Column(nullable = false)
	private String password;
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
	@JsonIgnore
	List<Interaction> interactions;
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<Review> reviews;
    @CreationTimestamp
    @Column(name="created_at")
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<Interaction> getInteractions() {
		return interactions;
	}
	public void setInteractions(List<Interaction> interactions) {
		this.interactions = interactions;
	}
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}
