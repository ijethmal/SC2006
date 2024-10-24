package com.app1.app.service;

import com.app1.app.domain.InterestGroup;
import com.app1.app.domain.User;
import com.app1.app.repo.InterestGroupRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class InterestGroupService {

    private final InterestGroupRepo interestGroupRepo;
    private final UserService userService;  // Reference to user service for member management

    public InterestGroup createGroup(InterestGroup group) {
        return interestGroupRepo.save(group);
    }

    public Optional<InterestGroup> updateGroup(UUID groupId, InterestGroup updatedGroup) {
        return interestGroupRepo.findById(groupId)
                .map(group -> {
                    group.setGroupName(updatedGroup.getGroupName());
                    group.setActivityType(updatedGroup.getActivityType());
                    group.setLocation(updatedGroup.getLocation());
                    group.setMembers(updatedGroup.getMembers());
                    return interestGroupRepo.save(group);
                });
    }

    public void deleteGroup(UUID groupId) {
        interestGroupRepo.deleteById(groupId);
    }

    public List<InterestGroup> getGroups() {
        return interestGroupRepo.findAll();
    }

    public Optional<InterestGroup> getGroupById(UUID groupId) {
        return interestGroupRepo.findById(groupId);
    }

    public Optional<InterestGroup> addMember(UUID groupId, String id) {
        Optional<User> user = userService.findUserById(id);
        return interestGroupRepo.findById(groupId)
                .map(group -> {
                    user.ifPresent(group.getMembers()::add);
                    return interestGroupRepo.save(group);
                });
    }

    public Optional<InterestGroup> removeMember(UUID groupId, String id) {
        Optional<User> user = userService.findUserById(id);
        return interestGroupRepo.findById(groupId)
                .map(group -> {
                    user.ifPresent(group.getMembers()::remove);
                    return interestGroupRepo.save(group);
                });
    }
}
