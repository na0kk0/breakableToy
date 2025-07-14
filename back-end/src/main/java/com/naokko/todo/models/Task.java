package com.naokko.todo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "The tittle can't be empty")
    private String title;
    private String priority;
    private boolean completed;
    private LocalDateTime dueDate;
    private LocalDateTime  doneDate;
    @Column(updatable = false)
    private LocalDateTime createDate;
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }
}
