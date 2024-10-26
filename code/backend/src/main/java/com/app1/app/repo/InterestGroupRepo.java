package com.app1.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app1.app.domain.InterestGroup;
import java.util.Optional;

@Repository
public interface InterestGroupRepo extends JpaRepository<InterestGroup, String> {
    Optional<InterestGroup> findById(String id);
}