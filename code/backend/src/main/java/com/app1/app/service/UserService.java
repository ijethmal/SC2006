package com.app1.app.service;

import com.app1.app.domain.User;
import com.app1.app.repo.UserRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
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
import java.util.UUID;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import java.util.function.BiFunction;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)
public class UserService {
    public final UserRepo userRepo;
    private final JavaMailSender mailSender;


    public Page<User> getUsers(int page, int size) {
        return userRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    //not sure whether this will work
    public User getUser(String id) {
        return userRepo.findById(id).orElseThrow();
    }

    /*//one for login
    public boolean login(String email, String password) {
        return user.login(email, password);
    }*/
    public boolean login(String email, String password) {
        Optional<User> user = userRepo.findByEmail(email);
        if (!user.isPresent()) {
            return false;
        }

        return user.get().getPassword().equals(password);

        //return user.map(value -> value.login(email, password)).orElse(false);
    }

    public String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }


    public boolean sendVerificationEmail(User user) {
        String verificationUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/users/verify")
                .queryParam("token", user.getVerificationToken())
                .toUriString();

        String subject = "Verify Your Email";
        String message = "Thank you for registering. Please verify your email by clicking the link below:\n" + verificationUrl;

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setFrom("noreply@trial-yzkq3405xo3gd796.mlsender.net");
            mailSender.send(mimeMessage);
            return true;  // Email sent successfully
        } catch (MessagingException e) {
            log.error("Failed to send verification email", e);
            return false;  // Email sending failed
        }
    }
    public boolean verifyUser(String token) {
        Optional<User> userOptional = userRepo.findByVerificationToken(token);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setVerified(true);
            user.setVerificationToken(null); // Clear the token once verified
            userRepo.save(user);
            return true;
        }
        return false;
    }


    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }
        user.setVerificationToken(generateVerificationToken());
        User savedUser = userRepo.save(user);
        sendVerificationEmail(savedUser);  // New function to send the email
        return savedUser;
    }

    public User updateUser(String id, User user) {
        User oUser = getUser(id);
        if (user.getName() != null) oUser.setName(user.getName());
        if (user.getPassword() != null) oUser.setPassword(user.getPassword());
        if (user.getLocation() != null) oUser.setLocation(user.getLocation());
        if (user.getPhotoUrl() != null) oUser.setPhotoUrl(user.getPhotoUrl());
        if (user.getBio() != null) oUser.setBio(user.getBio());
        if (user.getEmail() != null) oUser.setEmail(user.getEmail());
        if (user.getGroups() != null) oUser.setGroups(user.getGroups());
        userRepo.save(oUser);
        return oUser;
    }

    public void deleteAllUser() {
        userRepo.deleteAll();
    }

    public User deleteUser(User user){
        userRepo.deleteById(user.getId());
        return user;
    }

    // delete, update, and uploadPhoto methods go here
    public Optional<User> uploadPhoto(String id, String photoPath) {
        User user = getUser(id);
        user.setPhotoUrl(photoPath);
        userRepo.save(user);
        return Optional.of(user);
    }

}
