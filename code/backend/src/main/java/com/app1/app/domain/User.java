package com.app1.app.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;


@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(Include.NON_DEFAULT)
@Table(name = "users")


public class User {

    //fields
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;

    private String name;
    @Column(unique = true)
    private String email;
    private String location;
    private String password;
    private String photoUrl;
    private String[] groups;

    //constructor

    //methods

    // method for login
    public boolean login(String email, String password) {
        return this.email.equals(email) && this.password.equals(password);
    }

    //getters and setters
    

    //toString
}
