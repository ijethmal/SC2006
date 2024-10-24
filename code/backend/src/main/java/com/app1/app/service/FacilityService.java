package com.app1.app.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.app1.app.domain.Facility;
import com.app1.app.repo.FacilityRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)

public class FacilityService {
    public final FacilityRepo facilityRepo;
    
    public Page<Facility> getFacilities(int page, int size) {
        return facilityRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Facility getFacility(String id) {
        return facilityRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find facility"));
    }

    public Facility createFacility(Facility facility){
        return facilityRepo.save(facility);
    }

    public Facility deleteFacility(Facility facility){
        facilityRepo.deleteById(facility.getId());
        return facility;
    }

    public void deleteAllFacility(){
        facilityRepo.deleteAll();
    }

    public Facility updateFacility(String id, Facility facility) {
        Facility oFacility = getFacility(id);
        oFacility.setName(facility.getName());
        oFacility.setCoordinates(facility.getCoordinates());
        oFacility.setAvailableFacilities(facility.getAvailableFacilities());
        facilityRepo.save(oFacility);
        return oFacility;
    }
}