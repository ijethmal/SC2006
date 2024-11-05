package com.app1.app.resource;

import com.app1.app.domain.User;
import com.app1.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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
        return ResponseEntity.created(URI.create("/users/" + userService.register(user).getId())).body(user);
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<String> showName(@PathVariable String id) {
        return ResponseEntity.ok().body(userService.getUser(id).getName());
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

   /* @PutMapping("/{id}/photo")
    public ResponseEntity<User> uploadPhoto(@PathVariable String id, @RequestParam("photo") String photo) {
        try {
            byte[] bytes = photo.getBytes();
            Files.write(Paths.get("uploads/" + id + ".jpg"), bytes);
            return userService.uploadPhoto(id, "uploads/" + id + ".jpg")
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    } */
}
