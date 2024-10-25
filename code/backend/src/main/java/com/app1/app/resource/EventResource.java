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
import com.app1.app.domain.Event;
import com.app1.app.service.EventService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor

public class EventResource {
    private final EventService eventService;

    @GetMapping
    public ResponseEntity<Page<Event>> getEvent(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(eventService.getEvents(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable String id) {
        return ResponseEntity.ok().body(eventService.getEvent(id));
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.created(URI.create("/events/" + eventService.createEvent(event).getId())).body(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event event) {
        return ResponseEntity.ok().body(eventService.updateEvent(id, event));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id){
        eventService.deleteEvent(eventService.getEvent(id));
        return ResponseEntity.ok("Deleted event");
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteAllEvent(){
        eventService.deleteAllEvent();
        return ResponseEntity.ok("Deleted all event");
    }
}
