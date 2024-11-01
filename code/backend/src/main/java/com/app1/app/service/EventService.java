package com.app1.app.service;

import java.text.ParseException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import com.app1.app.domain.Event;
import com.app1.app.domain.User;
import java.util.HashMap;
import org.springframework.stereotype.Service;
import com.app1.app.repo.EventRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)

public class EventService {
    public final EventRepo eventRepo;
    public final UserService userService;

    public Page<Event> getEvents (int page, int size){
        return eventRepo.findAll(PageRequest.of(page, size, Sort.by("time")));
    }

    public Event getEvent(String id) {
        return eventRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find event"));
    }

    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    public Event deleteEvent(Event event){
        eventRepo.deleteById(event.getId());
        return event;
    }

    public void deleteAllEvent(){
        eventRepo.deleteAll();
    }

    public Event updateEvent(String id, Event event) {
        Event oEvent = getEvent(id);
        if (event.getTime() != 0) oEvent.setTime(event.getTime());
        if (event.getDetails() != null) oEvent.setDetails(event.getDetails());
        //if (event.getAttendees() != null) oEvent.setAttendees(event.getAttendees());
        if (event.getNumAttendees() != 0) oEvent.setNumAttendees(event.getNumAttendees());
        if (event.getFacility() != null) oEvent.setFacility(event.getFacility());
        eventRepo.save(oEvent);
        return oEvent;
    }

    public void addAttendee(String eventId, String userId) throws Exception{
        Event event = getEvent(eventId);
        User user = userService.getUser(userId);
        HashMap<String, Integer> attendees = event.getAttendees();
        if (attendees == null) attendees = new HashMap<>();
        if (attendees.get(userId) != null) throw new Exception("User is already a confirmed attendee");
        else {
            attendees.put(userId, 1);
            event.setAttendees(attendees);
            event.setNumAttendees(event.getNumAttendees() + 1);
            // userService.addEvent (to be implemented)
            eventRepo.save(event);
        }
    }

    public void removeAttendee(String eventId, String userId) throws Exception{
        Event event = getEvent(eventId);
        HashMap<String, Integer> attendees = event.getAttendees();
        if (attendees.get(userId) != null){
            attendees.remove(userId);
            event.setAttendees(attendees);
            event.setNumAttendees(event.getNumAttendees() - 1);
            // userService.removeEvent (to be implemented)
            eventRepo.save(event);
        } else throw new Exception("User not found");
    }

    public static String epochToString(long epoch){
        String date = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date (epoch*1000));
        return date;
    }

    public static long stringToEpoch(String date) throws ParseException{
        long epoch = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse(date).getTime() / 1000;
        return epoch;
    }
}
