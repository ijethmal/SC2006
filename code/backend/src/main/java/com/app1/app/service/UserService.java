package com.app1.app.service;

import com.app1.app.domain.User;
import com.app1.app.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)
public class UserService {
    public final UserRepo userRepo;

    public Page<User> getUsers(int page, int size) {
        return userRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    //not sure whether this will work
    public Optional<User> getUser(String id) {
        if (userRepo.findById(id).isEmpty()) {
            return Optional.empty();
        } else {
            return userRepo.findById(id);
        }
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public Optional<User> updateUser(String id, User user) {
        return userRepo.findById(id)
                .map(existingUser -> {
                    existingUser.setName(user.getName());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setLocation(user.getLocation());
                    existingUser.setPassword(user.getPassword());
                    existingUser.setPhotoUrl(user.getPhotoUrl());
                    existingUser.setGroups(user.getGroups());
                    return existingUser;
                });
    }

    // delete, update, and uploadPhoto methods go here

    
}
