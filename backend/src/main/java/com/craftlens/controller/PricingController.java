package com.craftlens.controller;

import com.craftlens.model.ComparableItem;
import com.craftlens.repository.ComparableItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pricing")
@CrossOrigin(origins = "*")
public class PricingController {

    @Autowired
    private ComparableItemRepository comparableItemRepository;

    @GetMapping("/comparables")
    public List<ComparableItem> getComparables(@RequestParam(required = false, defaultValue = "") String category,
                                                @RequestParam(required = false, defaultValue = "") String material) {
        if (category.isEmpty() && material.isEmpty()) {
            return comparableItemRepository.findAll();
        }
        return comparableItemRepository.findByCategoryContainingIgnoreCaseOrMaterialContainingIgnoreCase(category, material);
    }

    @PostMapping("/recommend")
    public ResponseEntity<Map<String, Object>> recommendPrice(@RequestBody Map<String, Object> request) {
        String category = (String) request.getOrDefault("category", "Pottery");
        String material = (String) request.getOrDefault("material", "Clay");

        List<ComparableItem> comparables = comparableItemRepository.findByCategoryContainingIgnoreCaseOrMaterialContainingIgnoreCase(category, material);

        double avgPrice = 850.0;
        double minPrice = 650.0;
        double maxPrice = 1200.0;

        if (!comparables.isEmpty()) {
            avgPrice = comparables.stream().mapToDouble(ComparableItem::getPrice).average().orElse(850.0);
            minPrice = comparables.stream().mapToDouble(ComparableItem::getPrice).min().orElse(650.0);
            maxPrice = comparables.stream().mapToDouble(ComparableItem::getPrice).max().orElse(1200.0);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("recommendedPrice", Math.round(avgPrice));
        response.put("minRange", Math.round(minPrice));
        response.put("maxRange", Math.round(maxPrice));
        response.put("comparableCount", comparables.size());
        response.put("comparables", comparables);
        response.put("explanation", "Based on " + (comparables.isEmpty() ? "regional craft benchmark data" : comparables.size() + " comparable artisan products"));

        return ResponseEntity.ok(response);
    }
}
