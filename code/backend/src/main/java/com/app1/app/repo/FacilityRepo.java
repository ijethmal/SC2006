package com.app1.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app1.app.domain.Facility;
import java.util.Optional;

@Repository
public interface FacilityRepo extends JpaRepository<Facility, String> {
    Optional<Facility> findById(String id);
}