package com.app1.app.resource;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;

import com.app1.app.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.app1.app.domain.InterestGroup;
import com.app1.app.service.InterestGroupService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/interestgroups")
@RequiredArgsConstructor

public class InterestGroupResource {
    private final InterestGroupService interestGroupService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Page<InterestGroup>> getInterestGroup(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(interestGroupService.getInterestGroups(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterestGroup> getInterestGroup(@PathVariable String id) {
        return ResponseEntity.ok().body(interestGroupService.getInterestGroup(id));
    }

    @PostMapping
    public ResponseEntity<InterestGroup> createInterestGroup(@RequestBody InterestGroup interestGroup) {
        String creatorId = interestGroup.getCreatedBy();

        // Check if members is null before adding the creator
        if (interestGroup.getMembers() == null) {
            interestGroup.setMembers(new HashMap<>());
        }
        interestGroup.getMembers().put(creatorId, 1);


        // Check if admins is null before adding the creator
        if (interestGroup.getAdmins() == null) {
            interestGroup.setAdmins(new HashMap<>());
        }
        interestGroup.getAdmins().put(creatorId, 1);

        // Create the interest group with the updated members and admins
        InterestGroup createdGroup = interestGroupService.createInterestGroup(interestGroup);

        return ResponseEntity.created(URI.create("/interestgroups/" + createdGroup.getId())).body(createdGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterestGroup> updateInterestGroup(@PathVariable String id, @RequestBody InterestGroup interestGroup) {
        return ResponseEntity.ok().body(interestGroupService.updateInterestGroup(id, interestGroup));
    }

    @PutMapping("/{groupId}/members/{userId}")
    public ResponseEntity<String> addMember(@PathVariable String groupId, @PathVariable String userId) throws Exception {
        interestGroupService.addMember(groupId, userId);
        return ResponseEntity.ok().body("Added member");
    }

    @PutMapping("/{groupId}/events/{eventId}")
    public ResponseEntity<String> addEvent(@PathVariable String groupId, @PathVariable String eventId) throws Exception {
        interestGroupService.addEvent(groupId, eventId);
        return ResponseEntity.ok().body("Added event");
    }

    @PutMapping("/{groupId}/promote/{userId}")
    public ResponseEntity<String> promoteToAdmin(@PathVariable String groupId, @PathVariable String userId) {
        try {
            interestGroupService.promoteToAdmin(groupId, userId);
            return ResponseEntity.ok("User promoted to admin");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{groupId}/demote/{userId}")
    public ResponseEntity<String> demoteFromAdmin(@PathVariable String groupId, @PathVariable String userId) {
        try {
            interestGroupService.demoteFromAdmin(groupId, userId);
            return ResponseEntity.ok("User demoted from admin");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFacility(@PathVariable String id){
        interestGroupService.deleteInterestGroup(interestGroupService.getInterestGroup(id));
        return ResponseEntity.ok("Deleted group");
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteAllFacility(){
        interestGroupService.deleteAllInterestGroup();
        return ResponseEntity.ok("Deleted all groups");
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<String> deleteMember(@PathVariable String groupId, @PathVariable String userId) throws Exception {
        try {
            InterestGroup interestGroup = interestGroupService.getInterestGroup(groupId);

            if (interestGroup.getAdmins().containsKey(userId)) {
                throw new Exception("Cannot delete admin");
            }

            interestGroupService.removeMember(groupId, userId);
            return ResponseEntity.ok().body("Deleted member");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{groupId}/events/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable String groupId, @PathVariable String eventId) throws Exception {
        try {
            interestGroupService.removeEvent(groupId, eventId);
            return ResponseEntity.ok().body("Deleted event");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<ArrayList<InterestGroup>> getGroupsOfUsers(@PathVariable String userId, @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok().body(interestGroupService.getGroupsOfUser(userId, size));
    }
}