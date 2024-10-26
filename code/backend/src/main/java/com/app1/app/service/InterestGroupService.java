package com.app1.app.service;

import java.util.Optional;
import java.util.HashMap;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.app1.app.domain.InterestGroup;
import com.app1.app.domain.User;
import com.app1.app.repo.InterestGroupRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)

public class InterestGroupService {
    public final InterestGroupRepo interestGroupRepo;
    public final UserService userService;
    
    public Page<InterestGroup> getInterestGroups(int page, int size) {
        return interestGroupRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public InterestGroup getInterestGroup(String id) {
        return interestGroupRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find interest group"));
    }

    public InterestGroup createInterestGroup(InterestGroup interestGroup){
        return interestGroupRepo.save(interestGroup);
    }

    public InterestGroup deleteInterestGroup(InterestGroup interestGroup){
        interestGroupRepo.deleteById(interestGroup.getId());
        return interestGroup;
    }

    public void deleteAllInterestGroup(){
        interestGroupRepo.deleteAll();
    }

    public InterestGroup updateInterestGroup(String id, InterestGroup interestGroup) {
        InterestGroup oGroup = getInterestGroup(id);
        if (interestGroup.getName() != null) oGroup.setName(interestGroup.getName());
        if (interestGroup.getActivityType() != null) oGroup.setActivityType(interestGroup.getActivityType());
        if (interestGroup.getLocation() != null) oGroup.setLocation(interestGroup.getLocation());
        if (interestGroup.getCreatedBy() != null) oGroup.setCreatedBy(interestGroup.getCreatedBy());
        if (interestGroup.getMembers() != null) oGroup.setMembers(interestGroup.getMembers());
        if (interestGroup.getEvents() != null) oGroup.setMembers(interestGroup.getEvents());
        interestGroupRepo.save(oGroup);
        return oGroup;
    }

    public void addMember(String groupId, String userId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);
        User user = userService.getUser(userId);
        HashMap<String, Integer> members = interestGroup.getMembers();
        if (members.get(userId) != null) throw new Exception("User already in the group");
        else{
            members.put(userId, 1);
            interestGroup.setMembers(members);
            interestGroupRepo.save(interestGroup);
        }
    }

    public void removeMember(String groupId, String userId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);
        HashMap<String, Integer> members = interestGroup.getMembers();
        if (members.get(userId) != null) {
            members.remove(userId);
            interestGroup.setMembers(members);
            interestGroupRepo.save(interestGroup);
        }
        else throw new Exception("User not found");
    }
}