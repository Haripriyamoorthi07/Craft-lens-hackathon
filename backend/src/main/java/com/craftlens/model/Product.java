package com.craftlens.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titleEnglish;
    private String titleTamil;

    @Column(columnDefinition = "TEXT")
    private String descriptionEnglish;

    @Column(columnDefinition = "TEXT")
    private String descriptionTamil;

    private String category;
    private String artisanVoiceNoteText;
    private String languageCode; // "ta" or "en" or "bilingual"

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    // Extracted factual attributes
    private String material;
    private String dimensions;
    private String craftsmanshipDetails;
    private String origin;

    // Pricing
    private Double recommendedPrice;
    private Double minPriceRange;
    private Double maxPriceRange;
    private Double artisanStatedPrice;

    // Sell Coach Score & Recommendations
    private Integer coachScore;

    @ElementCollection
    private List<String> improvementsList;

    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    public void onPrePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
