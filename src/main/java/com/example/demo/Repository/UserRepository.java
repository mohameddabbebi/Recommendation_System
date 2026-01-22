package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.*;
@Repository
public interface UserRepository extends JpaRepository<User,Long>{
	Optional<User> findByName (String Username);
	Optional<User> findByEmail (String email);
	Optional<User> findByEmailAndPassword (String email , String password);
	boolean existsByName (String Username);
	boolean existsByEmail (String email);
}
