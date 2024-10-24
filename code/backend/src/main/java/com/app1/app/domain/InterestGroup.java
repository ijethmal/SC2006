package com.app1.app.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "interest_groups")
public class InterestGroup {

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private UUID id;

    private String groupName;

    private String activityType;

    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;  // Reference to the User who created the group

    @ManyToMany
    @JoinTable(
            name = "group_members",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members;  // List of users who are members of the group
}
