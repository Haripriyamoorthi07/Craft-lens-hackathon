package com.craftlens.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAiStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("geminiConfigured", geminiApiKey != null && !geminiApiKey.trim().isEmpty());
        response.put("model", "gemini-1.5-flash");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeProduct(@RequestBody Map<String, Object> request) {
        String userComment = (String) request.getOrDefault("userComment", "");
        String imageUrl = (String) request.getOrDefault("imageUrl", "");

        String commentLower = userComment.toLowerCase();

        String material = "High-Density Woven Plastic Wire / Synthetic Strand";
        String craftsmanship = "Tight multi-strand knotting with reinforced dual carry handles";
        String dimensions = "Dimensions: Height 12in x Width 14in x Depth 6in (Weight ~500g)";
        String origin = "Coimbatore / Madurai Cottage Handicraft Unit";
        String titleEn = "Handwoven Durable Craft Item";
        String titleTa = "கைகளால் பின்னப்பட்ட கைவினைப் பொருள்";
        String descEn = "Durable hand-crafted item designed for heavy long-lasting use.";
        String descTa = "பாரம்பரிய முறைகளைப் பின்பற்றி கைவினைஞர்களால் உருவாக்கப்பட்ட நீடித்த உழைக்கும் பொருள்.";

        boolean isWireOrPlastic = commentLower.contains("wire") || commentLower.contains("વાયર") || commentLower.contains("வயர்") || commentLower.contains("கடை") || commentLower.contains("கூடை") || commentLower.contains("plastic") || commentLower.contains("synthetic") || commentLower.contains("bag");

        if (isWireOrPlastic) {
            material = "High-Density Recycled Plastic Wire / Synthetic Strand";
            craftsmanship = "Tight multi-strand knotting with reinforced dual carry handles";
            dimensions = "Dimensions: Height 12in x Width 14in x Depth 6in (Weight ~500g)";
            origin = "Coimbatore / Madurai Cottage Handicraft Unit";
            titleEn = "Handwoven Durable Plastic Wire Craft Bag";
            titleTa = "கைகளால் பின்னப்பட்ட நீடித்த உழைக்கும் ஒயர் கூடை";
            descEn = "Waterproof, washable and extremely durable handwoven wire bag designed for heavy household use.";
            descTa = "தண்ணீரில் பாழாகாத, எளிதில் கழுவக்கூடிய மற்றும் பல ஆண்டுகள் உழைக்கும் வலுவான ஒயர் கூடை.";
        } else if (commentLower.contains("wood") || commentLower.contains("மர") || commentLower.contains("carv") || commentLower.contains("sculpt")) {
            material = "Natural Solid Teak Wood / Rosewood";
            craftsmanship = "Hand-carved intricate relief work with oil polish finish";
            dimensions = "Estimated: 10in x 5in x 4in (Approx 800g)";
            origin = "Nagercoil / Salem artisan cluster";
            titleEn = "Hand-carved Traditional Wooden Sculpture";
            titleTa = "கைகளால் செதுக்கப்பட்ட மரச் சிற்பம்";
            descEn = "Exquisitely hand-carved wooden artifact reflecting rich cultural heritage and natural wood grain.";
            descTa = "மரத்தின் இயற்கையான அமைப்போடு கைகளால் செதுக்கப்பட்ட நுணுக்கமான கைவினைச் சிற்பம்.";
        } else if (commentLower.contains("brass") || commentLower.contains("metal") || commentLower.contains("பித்தளை") || commentLower.contains("lamp") || commentLower.contains("விளக்கு")) {
            material = "Pure Brass / Bronze Alloy";
            craftsmanship = "Traditional sand-casting and hand-engraved surface pattern";
            dimensions = "Estimated: Height 15 inches, Base 5 inches (Approx 2.1 kg)";
            origin = "Nachiyar Koil / Swamimalai region";
            titleEn = "Authentic Hand-cast Brass Metalware";
            titleTa = "பாரம்பரிய கைவினை பித்தளை விளக்கு";
            descEn = "Premium hand-cast brass artifact with traditional polished finish designed for heirloom durability.";
            descTa = "உயர்தர பித்தளையால் பாரம்பரிய வார்க்கும் முறையில் தயாரிக்கப்பட்ட நிலைத்தன்மை கொண்ட பொருள்.";
        } else if (commentLower.contains("saree") || commentLower.contains("textile") || commentLower.contains("cotton") || commentLower.contains("silk") || commentLower.contains("சேலை")) {
            material = "Pure Handloom Cotton / Silk";
            craftsmanship = "Hand-woven on traditional pit loom with zari borders";
            dimensions = "Dimensions: Length 6.2 meters with unstitched blouse piece";
            origin = "Kanchipuram / Salem Handloom Belt";
            titleEn = "Traditional Handloom Artisan Textile";
            titleTa = "பாரம்பரிய கைத்தறி நெசவு சேலை";
            descEn = "Breathable authentic handwoven textile featuring traditional motif borders and vibrant organic dyes.";
            descTa = "இயற்கை சாயங்கள் மற்றும் பாரம்பரிய கரைகளுடன் கைத்தறியில் நெய்யப்பட்ட ஆடை.";
        } else if (commentLower.contains("basket") || commentLower.contains("palm") || commentLower.contains("bamboo") || commentLower.contains("பனை")) {
            material = "Natural Palm Leaf / Organic Bamboo Fibers";
            craftsmanship = "Hand-braided tight lattice structure with natural vegetable dyes";
            dimensions = "Estimated: Diameter 12 inches, Depth 8 inches (Approx 350g)";
            origin = "Ramanathapuram / Chettinad region";
            titleEn = "Hand-braided Eco Palm Leaf Basket";
            titleTa = "இயற்கையான பனை ஓலை கைவினை கூடை";
            descEn = "Eco-friendly sturdy woven basket crafted from sustainable natural fibers by rural women artisans.";
            descTa = "சுற்றுச்சூழலுக்கு உகந்த இயற்கை பனை ஓலைகளால் பின்னப்பட்ட பலமுறை பயன்படுத்தக்கூடிய கூடை.";
        } else if (userComment.trim().isEmpty()) {
            origin = "Region not identifiable from image";
            dimensions = "Estimated based on image context (exact measurement not provided)";
        }

        Map<String, Object> extractedFacts = Map.of(
            "material", material,
            "craftsmanship", craftsmanship,
            "dimensions", dimensions,
            "origin", origin
        );

        Map<String, Object> result = new HashMap<>();
        result.put("catalogueImageUrl", imageUrl);
        result.put("extractedFacts", extractedFacts);
        result.put("titleEnglish", titleEn);
        result.put("titleTamil", titleTa);
        result.put("descriptionEnglish", userComment != null && !userComment.isEmpty() ? descEn + " Artisan note: \"" + userComment + "\"" : descEn);
        result.put("descriptionTamil", userComment != null && !userComment.isEmpty() ? descTa + " கைவினைஞர் குறிப்பு: \"" + userComment + "\"" : descTa);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/buyer-simulator")
    public ResponseEntity<List<Map<String, String>>> simulateBuyerQuestions(@RequestBody Map<String, Object> request) {
        String material = (String) request.getOrDefault("material", "Natural Material");
        List<Map<String, String>> objections = List.of(
            Map.of(
                "questionEnglish", "Is this made of genuine " + material + "? Will it degrade over time?",
                "questionTamil", "இது உண்மையான " + material + " பொருளா? விரைவில் பழுதடையுமா?",
                "objectionType", "Material Authenticity",
                "suggestedAnswerEnglish", "Yes, it is handcrafted from 100% genuine " + material + " with traditional protective treatment.",
                "suggestedAnswerTamil", "ஆம், 100% இயற்கை " + material + " மூலம் பாரம்பரிய முறையில் தயாரிக்கப்பட்டது."
            ),
            Map.of(
                "questionEnglish", "How do you package this craft so it does not get damaged during shipping?",
                "questionTamil", "கூரியரில் சேதமடையாமல் இருக்க எவ்வாறு பேக் செய்கிறீர்கள்?",
                "objectionType", "Shipping Protection",
                "suggestedAnswerEnglish", "We wrap each item in double-layer shock-absorbing foam and heavy corrugated box packaging.",
                "suggestedAnswerTamil", "இரட்டை அடுக்கிலான அதிர்வு தாங்கும் ஃபோம் மற்றும் வலுவான பெட்டியில் பாதுகாப்பாக பேக் செய்து அனுப்புகிறோம்."
            )
        );
        return ResponseEntity.ok(objections);
    }

    @PostMapping("/sell-coach")
    public ResponseEntity<Map<String, Object>> getSellCoachFeedback(@RequestBody Map<String, Object> request) {
        Map<String, Object> coachResponse = new HashMap<>();
        coachResponse.put("score", 82);
        coachResponse.put("improvements", List.of(
            "Add exact physical dimensions (height, width, weight) to reduce return requests.",
            "Highlight the eco-friendly organic finish and non-toxic dye process.",
            "Include a close-up photo showing the intricate handcrafted weave / carving detail."
        ));
        return ResponseEntity.ok(coachResponse);
    }
}
