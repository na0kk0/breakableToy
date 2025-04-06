package com.naokko.todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {
    private int id;
    private String title;
    private String dueDate;
    private boolean completed;
    private String  doneDate;
    private String priority;
    private String createDate;
}
