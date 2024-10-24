package com.app1.app.resource;

import com.app1.app.domain.InterestGroup;
import com.app1.app.service.InterestGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class InterestGroupResource {

    private final InterestGroupService interestGroupService;

    @PostMapping
    public ResponseEntity<InterestGroup> createGroup(@RequestBody InterestGroup group) {
        InterestGroup createdGroup = interestGroupService.createGroup(group);
        return ResponseEntity.created(URI.create("/groups/" + createdGroup.getId())).body(createdGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterestGroup> updateGroup(@PathVariable UUID id, @RequestBody InterestGroup group) {
        Optional<InterestGroup> updatedGroup = interestGroupService.updateGroup(id, group);
        return updatedGroup.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable UUID id) {
        interestGroupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<InterestGroup>> getAllGroups() {
        return ResponseEntity.ok(interestGroupService.getGroups());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterestGroup> getGroupById(@PathVariable UUID id) {
        Optional<InterestGroup> group = interestGroupService.getGroupById(id);
        return group.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{groupId}/members/{userId}")
    public ResponseEntity<InterestGroup> addMember(@PathVariable UUID groupId, @PathVariable String id) {
        Optional<InterestGroup> group = interestGroupService.addMember(groupId, id);
        return group.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<InterestGroup> removeMember(@PathVariable UUID groupId, @PathVariable String id) {
        Optional<InterestGroup> group = interestGroupService.removeMember(groupId, id);
        return group.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
