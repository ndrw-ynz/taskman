package com.taskman.backend.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="lists")
public class ListEntity {

    @Id
    @SequenceGenerator(
            name="list_sequence",
            sequenceName="list_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="list_sequence")
    private Long id;

    private String title;
    private Integer position;

    @ManyToOne
    @JoinColumn(name="board_id", nullable = false)
    private Board board;

    @OneToMany(mappedBy = "list", cascade=CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
