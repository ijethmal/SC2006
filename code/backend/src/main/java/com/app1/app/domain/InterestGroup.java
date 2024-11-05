package com.app1.app.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.HashMap;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "interestgroups")

public class InterestGroup {
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    private String name;
    private String activityType;
    private String location;
    private String createdBy;                  // Reference to the User who created the group
    private HashMap<String, Integer> members;  // List of users who are members of the group
    private HashMap<String, Integer> admins;   // List of Admins
    private HashMap<String, Integer> events;   // List of events in the group
    private String imgUrl;

    public void addAdmin(String userId) {
        admins.put(userId, 1);
    }

    public void removeAdmin(String userId) {
        admins.remove(userId);
    }
}