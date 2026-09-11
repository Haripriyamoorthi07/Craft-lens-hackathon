package com.craftlens.repository;

import com.craftlens.model.ComparableItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComparableItemRepository extends JpaRepository<ComparableItem, Long> {
    List<ComparableItem> findByCategoryContainingIgnoreCaseOrMaterialContainingIgnoreCase(String category, String material);
}
