package com.app1.app.resource;

import com.app1.app.domain.User;
import com.app1.app.repo.UserRepo;
import com.app1.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserResource {
    private final UserService userService;

    /*@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        return userService.login(user.getEmail(), user.getPassword())
                ? ResponseEntity.ok("Login successful")
                : ResponseEntity.badRequest().body("Login failed");
    }*/
    @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody User user) {
            if (userService.login(user.getEmail(), user.getPassword())) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.badRequest().body("Login failed");
    }
}

    @GetMapping
    public ResponseEntity<Page<User>> getUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(userService.getUsers(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable(value="id") String id) {
        return ResponseEntity.ok().body(userService.getUser(id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.created(URI.create("/users/" + userService.createUser(user).getId())).body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok().body(userService.updateUser(id, user));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllUser() {
        userService.deleteAllUser();
        return ResponseEntity.ok("Deleted all users");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        userService.deleteUser(userService.getUser(id));
        return ResponseEntity.ok("Deleted User");
    }

    @PutMapping("/{id}/photo")
    public ResponseEntity<User> uploadPhoto(@PathVariable String id, @RequestParam("photo") MultipartFile photo) {
        try {
            Path path = Paths.get("uploads/" + id + "_" + photo.getOriginalFilename());
            Files.write(path, photo.getBytes());
            return userService.uploadPhoto(id, path.toString())
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return userService.createUser(user) != null
                ? ResponseEntity.ok("Registration successful. Please check your email to verify your account.")
                : ResponseEntity.badRequest().body("Registration failed.");
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        return userService.verifyUser(token)
                ? ResponseEntity.ok("Email verified successfully!")
                : ResponseEntity.badRequest().body("Invalid or expired verification token.");
    }

}
