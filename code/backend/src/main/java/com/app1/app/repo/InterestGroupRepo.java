package com.app1.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app1.app.domain.InterestGroup;

import java.util.List;
import java.util.UUID;

@Repository
public interface InterestGroupRepo extends JpaRepository<InterestGroup, UUID> {
    List<InterestGroup> findByCreatedBy(UUID userId);
}
