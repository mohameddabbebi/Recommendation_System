package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import com.example.demo.Repository.ReviewRepository;
import com.example.demo.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.Repository.InteractionRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.dto.RecommendationResponseDTO;
import com.example.demo.entity.Interaction;
import com.example.demo.entity.Product;

@Service

public class RecommendationServiceImpl  {

    private final RestTemplate restTemplate;
    private final InteractionRepository interactionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ReviewRepository rev;
    @Autowired
    public RecommendationServiceImpl(RestTemplate restTemplate , InteractionRepository interactionRepository , ProductRepository productRepository , UserRepository userRepository , ReviewRepository revi){
        this.restTemplate=restTemplate;
        this.interactionRepository=interactionRepository;
        this.productRepository=productRepository;
        this.userRepository=userRepository;
        this.rev = revi;
    }
    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @Cacheable(value = "recommendations", key = "#userId + '_' + #limit")
    public List<RecommendationResponseDTO> getRecommendations(Long userId, Integer limit) {

        List<Interaction> interactions = interactionRepository.findByUserId(userId);

        Map<String, Object> requestData = new HashMap<>();
        requestData.put("user_id", userId);
        requestData.put("interactions",
            interactions.stream()
                .map(i -> Map.of(
                    "product_id", i.getProduct().getId(),
                    "type", i.getType().toString(),
                    "rating", i.getRating() != null ? i.getRating() : 0
                ))
                .collect(Collectors.toList())
        );
        requestData.put("limit", limit);
        List<Review> reviews;
        reviews = rev.findByUserId(userId);
        requestData.put("reviews" , reviews.stream().map(i -> Map.of(
                "product_id",i.getProduct().getId() ,
                "review_text",i.getComment(),
                "rating",i.getRating()
                ))
                .collect(Collectors.toList())
        );
        List<Product> prod = productRepository.findAll();
        requestData.put("all_products",prod.stream().map(i->Map.of(
                "product_id",i.getId(),
                "name",i.getName(),
                "category",i.getCategory(),
                "price",i.getPrice()
                ))
                .collect(Collectors.toList())
        );
        try {
            ResponseEntity<List<Map<String, Object>>> response =
                restTemplate.exchange(
                    aiServiceUrl + "/api/recommendations",
                    HttpMethod.POST,
                    new HttpEntity<>(requestData),
                    new ParameterizedTypeReference<>() {}
                );

            assert response.getBody() != null;
            return response.getBody().stream()
                .map(rec -> {
                    Long productId = ((Number) rec.get("product_id")).longValue();
                    Product product = productRepository.findById(productId).orElse(null);
                    if (product == null) return null;

                    RecommendationResponseDTO dto = new RecommendationResponseDTO();
                    dto.setProductId(product.getId());
                    dto.setProductName(product.getName());
                    dto.setDescription(product.getDescription());
                    dto.setPrice(product.getPrice());
                    dto.setImageUrl(product.getImageUrl());
                    dto.setScore(((Number) rec.get("score")).doubleValue());
                    dto.setAverageRating(product.getAverageRating());
                    dto.setReason((String) rec.get("reason"));
                    return dto;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        } catch (Exception e) {
            return null;
        }
    }
}
