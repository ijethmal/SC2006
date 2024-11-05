package com.app1.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app1.app.domain.User;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    //the id one is just an example. optional means may or may not exist
    Optional<User> findById(String id);

    Optional<User> findByEmail(String email);

    Optional<User> findByVerificationToken(String verificationToken);

    // add query methods here
    
    //method for login
    
}
