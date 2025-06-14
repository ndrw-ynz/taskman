package com.taskman.backend.controller;

import com.taskman.backend.dto.CardCreationDTO;
import com.taskman.backend.dto.CardResponseDTO;
import com.taskman.backend.dto.CardUpdateDTO;
import com.taskman.backend.security.CustomUserDetails;
import com.taskman.backend.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for managing cards.
 * Exposes endpoints for fetching, retrieving, updating, and deleting cards.
 */
@RestController
@RequestMapping(path = "/taskman/api/cards")
public class CardController {

    private final CardService cardService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public CardController(CardService cardService, SimpMessagingTemplate messagingTemplate) {
        this.cardService = cardService;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Retrieves a card by its id.
     *
     * @param cardId The id of the card to retrieve.
     * @return The card if found.
     */
    @GetMapping("/{cardId}")
    public ResponseEntity<CardResponseDTO> getCard(@PathVariable Long cardId) {
        return ResponseEntity.ok(cardService.getCard(cardId));
    }

    /**
     * Retrieves the list of all cards associated
     * with the provided listId.
     *
     * @param listId The id of the list.
     * @return The list of all cards associated with the provided listId.
     */
    @GetMapping("/list/{listId}")
    public ResponseEntity<List<CardResponseDTO>> getAllCardsByListId(@PathVariable Long listId) {
        return ResponseEntity.ok(cardService.getAllCardsByList(listId));
    }

    /**
     * Creates a new card.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param cardCreationDTO The details of the new card.
     * @return The details of the newly created card.
     */
    @PostMapping
    public ResponseEntity<CardResponseDTO> createCard(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody CardCreationDTO cardCreationDTO) {
        Long ownerId = customUserDetails.getId();

        CardResponseDTO createdCard = cardService.createCard(cardCreationDTO);

        // WebSocket - Broadcast to subscribers after creation.
        Map<String, Object> asa = Map.of(
                "type", "CARD_CREATED",
                "payload", createdCard
        );
        messagingTemplate.convertAndSend("/topic/cards", Map.of(
                "type", "CARD_CREATED",
                "payload", createdCard
                ));
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCard);
    }

    /**
     * Updates the details of the card.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param cardUpdateDTO The updated details for the card.
     * @param cardId The id of the card to be updated.
     * @return The details of the updated card.
     */
    @PatchMapping("/{cardId}")
    public ResponseEntity<CardResponseDTO> updateCard(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody CardUpdateDTO cardUpdateDTO, @PathVariable Long cardId) {
        CardResponseDTO updatedCard = cardService.updateCard(cardUpdateDTO, cardId);
        // WebSocket - Broadcast to subscribers after update.
        messagingTemplate.convertAndSend("/topic/cards", Map.of(
                "type","CARD_UPDATED",
                "payload", updatedCard));
        return ResponseEntity.ok(updatedCard);
    }

    /**
     * Deletes a card by its id.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param cardId The id of the card to be deleted.
     * @return {@code 204 No Content} if deletion is successful.
     */
    @DeleteMapping("/{cardId}")
    public ResponseEntity<Void> deleteCard(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long cardId) {
        cardService.deleteCard(cardId);
        // WebSocket - Broadcast to subscribers after deletion.
        messagingTemplate.convertAndSend("/topic/cards", Map.of(
                "type", "CARD_DELETED",
                "deletedId", cardId));
        return ResponseEntity.noContent().build();
    }
}
