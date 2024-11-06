package com.app1.app.service;

import java.util.ArrayList;
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
            userService.addGroup(userId, groupId);
            interestGroupRepo.save(interestGroup);
        }
    }

    public void removeMember(String groupId, String userId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);
        HashMap<String, Integer> members = interestGroup.getMembers();
        if (members.get(userId) != null) {
            members.remove(userId);
            interestGroup.setMembers(members);
            userService.removeGroup(userId, groupId);
            interestGroupRepo.save(interestGroup);
        }
        else throw new Exception("User not found");
    }

    public void addEvent(String groupId, String eventId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);
        HashMap<String, Integer> events = interestGroup.getEvents();
        if (events == null) events = new HashMap<>();
        if (events.get(eventId) != null) throw new Exception("Event already added");
        else{
            events.put(eventId, 1);
            interestGroup.setEvents(events);
            interestGroupRepo.save(interestGroup);
        }
    }

    public void removeEvent(String groupId, String eventId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);
        HashMap<String, Integer> events = interestGroup.getEvents();
        if (events.get(eventId) != null) {
            events.remove(eventId);
            interestGroup.setEvents(events);
            interestGroupRepo.save(interestGroup);
        }
        else throw new Exception("Event not found");
    }

    public void promoteToAdmin(String groupId, String userId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);

        if (interestGroup.getAdmins().containsKey(userId)) {
            System.out.println("User is already an admin");
        } else if (!interestGroup.getMembers().containsKey(userId)) {
            throw new Exception("User not a member");
        } else {
            interestGroup.addAdmin(userId);
            interestGroupRepo.save(interestGroup);
        }
    }

    public void demoteFromAdmin(String groupId, String userId) throws Exception {
        InterestGroup interestGroup = getInterestGroup(groupId);

        if (!interestGroup.getMembers().containsKey(userId)) {
            throw new Exception("Wrong user");
        } else if (!interestGroup.getAdmins().containsKey(userId)) {
            throw new Exception("User not an admin");
        } else if (userId.equals(interestGroup.getCreatedBy())) {
            throw new Exception("Creator cannot be demoted");
        } else {
            interestGroup.removeAdmin(userId);
            interestGroupRepo.save(interestGroup);
        }
    }

    public ArrayList<InterestGroup> getGroupsOfUser(String userId, int size){
        User user = userService.getUser(userId);
        ArrayList<InterestGroup> output_grps = new ArrayList<>();
        HashMap<String, Integer> groups = user.getGroups();
        int cnt = 0;
        for (String key : groups.keySet()){
            InterestGroup group = getInterestGroup(key);
            output_grps.add(group);
            cnt ++;
            if (cnt == size) break;
        }
        return output_grps;
    }
}