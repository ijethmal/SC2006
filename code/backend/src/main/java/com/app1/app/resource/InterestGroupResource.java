package com.app1.app.resource;

import java.net.URI;

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

    @GetMapping
    public ResponseEntity<Page<InterestGroup>> getInterestGroup(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(interestGroupService.getInterestGroups(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterestGroup> getInterestGroup(@PathVariable String id) {
        return ResponseEntity.ok().body(interestGroupService.getInterestGroup(id));
    }

    @PostMapping
    public ResponseEntity<InterestGroup> createFacility(@RequestBody InterestGroup interestGroup) {
        return ResponseEntity.created(URI.create("/interestgroups/" + interestGroupService.createInterestGroup(interestGroup).getId())).body(interestGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterestGroup> updateFacility(@PathVariable String id, @RequestBody InterestGroup interestGroup) {
        return ResponseEntity.ok().body(interestGroupService.updateInterestGroup(id, interestGroup));
    }

    @PutMapping("/{groupId}/members/{userId}")
    public ResponseEntity<String> addMember(@PathVariable String groupId, @PathVariable String userId) throws Exception {
        interestGroupService.addMember(groupId, userId);
        return ResponseEntity.ok().body("Added member");
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
        interestGroupService.removeMember(groupId, userId);
        return ResponseEntity.ok().body("Deleted member");
    }


}