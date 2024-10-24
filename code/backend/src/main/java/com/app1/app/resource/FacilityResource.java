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

import com.app1.app.domain.Facility;
import com.app1.app.service.FacilityService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/facilities")
@RequiredArgsConstructor

public class FacilityResource {
    private final FacilityService facilityService;

    @GetMapping
    public ResponseEntity<Page<Facility>> getFacility(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(facilityService.getFacilities(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacility(@PathVariable String id) {
        return ResponseEntity.ok().body(facilityService.getFacility(id));
    }

    @PostMapping
    public ResponseEntity<Facility> createFacility(@RequestBody Facility facility) {
        return ResponseEntity.created(URI.create("/facilities/" + facilityService.createFacility(facility).getId())).body(facility);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> updateFacility(@PathVariable String id, @RequestBody Facility facility) {
        return ResponseEntity.ok().body(facilityService.updateFacility(id, facility));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFacility(@PathVariable String id, @RequestBody Facility facility){
        facilityService.deleteFacility(facility);
        return ResponseEntity.ok("Deleted facility");
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteAllFacility(){
        facilityService.deleteAllFacility();
        return ResponseEntity.ok("Deleted all facility");
    }
}