package com.craftlens.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comparable_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComparableItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String category;
    private String material;
    private Double price;
    private String sourcePlatform; // e.g. "Etsy", "Amazon Karigar", "Local Craft Fair"
    private String craftRegion;
}
