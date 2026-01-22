package com.example.demo.Controller;

import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.ReviewRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.*;
import com.example.demo.dto.newUser;
import com.example.demo.entity.Product;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.secrity.PasswordUtils;
import com.example.demo.service.RecommendationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // CORS pour React
public class Controller {

    private final UserRepository user;

    @Autowired
    public Controller(UserRepository user) {
        this.user = user;
    }

    // Endpoint POST /api/login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest prr) {
        Optional<User> optionalUser = user.findByEmail(prr.getEmail());

        if (optionalUser.isPresent()) {
            User u = optionalUser.get();
            if (PasswordUtils.matches(prr.getPassword(), u.getPassword())) {
                // login réussi
                return ResponseEntity.ok(Map.of("message", "Login réussi"));
            }
        }

        // Si non trouvé → 401 Unauthorized
        return ResponseEntity.status(401).body(Map.of("message", "Login incorrect"));
    }
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody newUser nu){
        User new_u = new User();
        System.out.println(nu.getUsername());
        System.out.println(nu.getPassword());
        System.out.println(nu.getEmail());
        new_u.setName(nu.getUsername());
        new_u.setEmail(nu.getEmail());
        new_u.setPassword(PasswordUtils.hash(nu.getPassword()));
        user.save(new_u);
        return ResponseEntity.ok(Map.of("message","user enrigestré avec succée"));
    }
    @Autowired
    UserRepository userService;
    @Autowired
    RecommendationServiceImpl recommendationService;
    @Autowired
    ProductRepository product;
    @GetMapping("/dashboard")
    public ResponseEntity<List<Product>> dashboard(@RequestParam String email) {
        email = email.substring(1, email.length() - 1);
        Optional<User> c_u = userService.findByEmail(email);
        System.out.println(email);
        if(c_u.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        String username = c_u.get().getName();

        if (username == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User currentUser = userService.findByName(username).orElse(null);

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<Product> result = new ArrayList<>();

        List<RecommendationResponseDTO> recommendedProducts =
                recommendationService.getRecommendations(currentUser.getId(), 10);

        for(RecommendationResponseDTO x : recommendedProducts){
            List<Product> p = product.findByName(x.getProductName());
            result.add(p.get(0));
        }
        return ResponseEntity.ok(result);
    }
    @Autowired
    ReviewRepository reviewRepository;
    @GetMapping("/my-reviews")
    public ResponseEntity<List<Review>> my_reviews(@RequestParam String email){
        email = email.substring(1, email.length() - 1);
        Optional<User> c_u = userService.findByEmail(email);
        System.out.println(email);
        if(c_u.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Long userId = c_u.get().getId();
        return ResponseEntity.ok(reviewRepository.findByUserId(userId));
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> Poducts(){
        return ResponseEntity.ok(product.findAll());
    }
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {

        Optional<Product> prod = product.findByid(id);
        if (prod.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Product not found");
        }

        List<Review> reviews = reviewRepository.getReviewByProductId(id);

        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(r -> new ReviewDTO(
                        r.getId(),
                        r.getUser().getId(),
                        r.getUser().getName(),   // ✅ ICI
                        r.getProduct().getId(),
                        r.getProduct().getImageUrl(),
                        r.getComment(),
                        r.getRating(),
                        r.getSentimentScore(),
                        r.getSentimentConfidence(),
                        r.getCreatedAt()
                ))
                .toList();

        Product p = prod.get();

        ProductDto productDto = new ProductDto(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getImageUrl(),
                p.getCategory(),
                p.getAverageRating(),
                reviewDTOs
        );

        return ResponseEntity.ok(productDto);
    }
    @Autowired
    UserRepository userRepository;
    @PostMapping("/add-review")
    public ResponseEntity<Map<String, String>> addReview(@RequestBody Add_Rev_Dto rev){
        System.out.println(rev.getUserEmail());
        rev.setUserEmail(rev.getUserEmail().substring(1,rev.getUserEmail().length()-1));
        System.out.println(rev.getUserEmail());
        User user_a = userRepository.findByEmail(rev.getUserEmail()).get();
        System.out.println(user_a.getName());
        Product pr = product.findById(rev.getProductId()).get();
        System.out.println(rev.getRating());
        Review newReview = new Review();
        newReview.setProduct(pr);
        newReview.setUser(user_a);
        newReview.setComment(rev.getComment());
        newReview.setRating(rev.getRating());
        reviewRepository.save(newReview);
        System.out.println("mo7");
        return ResponseEntity.ok(Map.of("ok","succé"));
    }
    @GetMapping("/get_name")
    public ResponseEntity<newUser> GetuserName(@RequestParam String mail){
        System.out.println(mail + "lina lina ");
        mail = mail.substring(1, mail.length() - 1);
        Optional<User> c_u = userService.findByEmail(mail);
        if(c_u.isEmpty())return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        newUser ret = new newUser();
        ret.setUsername(c_u.get().getName());
        System.out.println(ret.getUsername());
        return ResponseEntity.ok(ret);
    }
    @GetMapping("get_nbravis")
    public ResponseEntity<Long> Getnbravis(@RequestParam String mail){
        System.out.println(mail + "lina lina ");
        mail = mail.substring(1, mail.length() - 1);
        Optional<User> c_u = userService.findByEmail(mail);
        if(c_u.isEmpty())return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<Review> rr = reviewRepository.findByUserId(c_u.get().getId());
        int ret =rr.size();
        return ResponseEntity.ok((long) ret);
    }
}
