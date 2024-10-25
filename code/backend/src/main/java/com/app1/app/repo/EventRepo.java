package com.app1.app.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app1.app.domain.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, String> {
    Optional<Event> findById(String id);
}
