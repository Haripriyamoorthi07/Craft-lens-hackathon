package com.craftlens.controller;

import com.craftlens.model.Product;
import com.craftlens.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updated) {
        return productRepository.findById(id).map(p -> {
            p.setTitleEnglish(updated.getTitleEnglish());
            p.setTitleTamil(updated.getTitleTamil());
            p.setDescriptionEnglish(updated.getDescriptionEnglish());
            p.setDescriptionTamil(updated.getDescriptionTamil());
            p.setRecommendedPrice(updated.getRecommendedPrice());
            p.setCoachScore(updated.getCoachScore());
            p.setImprovementsList(updated.getImprovementsList());
            return ResponseEntity.ok(productRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }
}
