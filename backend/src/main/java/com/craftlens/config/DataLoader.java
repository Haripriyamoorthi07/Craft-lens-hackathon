package com.craftlens.config;

import com.craftlens.model.ComparableItem;
import com.craftlens.repository.ComparableItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ComparableItemRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    new ComparableItem(null, "Handpainted Terracotta Vase", "Pottery", "Clay / Terracotta", 850.0, "Etsy India", "Madurai, Tamil Nadu"),
                    new ComparableItem(null, "Traditional Brass Lamp (Kuthuvilakku)", "Metalware", "Brass", 2450.0, "CraftsVilla", "Nachiyar Koil, Tamil Nadu"),
                    new ComparableItem(null, "Hand-woven Organic Cotton Saree", "Textiles", "Cotton", 3200.0, "Amazon Karigar", "Kanchipuram, Tamil Nadu"),
                    new ComparableItem(null, "Tanjore Painting Gold Foil Ganesha", "Art", "Wood & Gold Foil", 4500.0, "Craftsvilla", "Thanjavur, Tamil Nadu"),
                    new ComparableItem(null, "Carved Wooden Elephant Pair", "Woodcraft", "Teak Wood", 1250.0, "Local Artisan Fair", "Salem, Tamil Nadu"),
                    new ComparableItem(null, "Clay Handcrafted Tea Cups (Set of 6)", "Pottery", "Clay", 650.0, "Etsy India", "Coimbatore, Tamil Nadu")
                ));
                System.out.println("Initialized benchmark pricing data in DB.");
            }
        };
    }
}
