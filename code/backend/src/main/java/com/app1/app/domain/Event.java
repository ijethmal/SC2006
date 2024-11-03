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
@Table(name = "events")
public class Event {
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    private String name;
    private Long time;
    private String details;
    private HashMap<String, Integer> attendees = new HashMap<>();
    private Integer numAttendees = 0;
    private String group;
    private String facility;
    private Boolean isActiveSg = true;
    private String url;
    private String eventUrl;
    private String location;
    // private String bookingProofUrl
}
