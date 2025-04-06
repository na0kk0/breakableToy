package com.naokko.todo.controllers;

import com.naokko.todo.models.Task;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:8080") //I used this line at the start, but at the end I added a WebConfig file so the api can be accessed from localhost and the port that we use in the React App, the 8080
public class TaskController {
    public LocalDateTime getDateParse(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy, h:mm:ss a");
        return LocalDateTime.parse(date, formatter);
    }
    public String getDateString(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy, h:mm:ss a");
        return date.format(formatter);
    }

    private final List<Task> tasks = new ArrayList<>();
    @GetMapping
    public List<Task> getTasks() {
        return tasks;
    }

    @PostMapping
    public List<Task> addTask(@RequestBody Task task) {
        if(!task.getTitle().isEmpty() && !task.getPriority().isEmpty()) {
            tasks.add(task);
        }
        return tasks;
    }

    @GetMapping("/sortPriorityUp")
    public List<Task> sortByPriorityUp(){
        Map<String, Integer> priorityOrder = new HashMap<>();
        priorityOrder.put("High", 1);
        priorityOrder.put("Medium", 2);
        priorityOrder.put("Low", 3);

        List<Task> auxtasks = new ArrayList<>(tasks);

        auxtasks.sort((a,b)->priorityOrder.get(a.getPriority()) - priorityOrder.get(b.getPriority()));

        return auxtasks;
    }

    @GetMapping("/sortPriorityDown")
    public List<Task> sortByPriorityDown(){
        Map<String, Integer> priorityOrder = new HashMap<>();
        priorityOrder.put("High", 3);
        priorityOrder.put("Medium", 2);
        priorityOrder.put("Low", 1);

        List<Task> auxtasks = new ArrayList<>(tasks);

        auxtasks.sort((a,b)->priorityOrder.get(a.getPriority()) - priorityOrder.get(b.getPriority()));

        return auxtasks;
    }

    @GetMapping("/sortDueDateUp")
    public List<Task> sortByDueDateUp(){
        List<Task> auxtasks = new ArrayList<>(tasks);

        auxtasks.sort((a,b)->{
            LocalDateTime datea = null;
            LocalDateTime dateb = null;
            if(a.getDueDate()!= "") //I think I should use isEmpty...
            {
                datea = getDateParse(a.getDueDate());
            }
            if(b.getDueDate()!= "")
            {
                dateb = getDateParse(b.getDueDate());
            }

            if(datea == null && dateb == null) return 0;
            if(datea == null) return 1;
            if(dateb == null) return -1;

            return datea.compareTo(dateb);
        });
        return auxtasks;
    }

    @GetMapping("/sortDueDateDown")
    public List<Task> sortByDueDateDown(){
        List<Task> auxtasks = new ArrayList<>(tasks);

        auxtasks.sort((a,b)->{
            LocalDateTime datea = null;
            LocalDateTime dateb = null;
            if(a.getDueDate()!= "")
            {
                datea = getDateParse(a.getDueDate());
            }
            if(b.getDueDate()!= "")
            {
                dateb = getDateParse(b.getDueDate());
            }

            if(datea == null && dateb == null) return 0;
            if(datea == null) return 1;
            if(dateb == null) return -1;

            return datea.isAfter(dateb) ? -1 : 1;
        });
        return auxtasks;
    }

    @PutMapping("/{id}")
    public List<Task> updateTask(@RequestBody Task task) {
        if(!task.getTitle().isEmpty() && !task.getPriority().isEmpty()) {
            for(Task t : tasks) {
                if(t.getId() == task.getId()) {
                    t.setTitle(task.getTitle());
                    t.setDueDate(task.getDueDate());
                    t.setPriority(task.getPriority());
                }
            }
        }
        return tasks;
    }

    @DeleteMapping("/delete/{id}")
    public List<Task> deleteTask(@PathVariable int id) {
        tasks.removeIf(task -> task.getId() == id);
        return tasks;
    }

    @GetMapping("/search")
    public List<Task> getTasksByTitle(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String state) {

        Stream<Task> stream = tasks.stream();

        if (title != null && !title.isEmpty()) {
            stream = stream.filter(task -> task.getTitle().toLowerCase().contains(title.toLowerCase()));
        }

        if (priority != null && !priority.isEmpty() && !priority.equalsIgnoreCase("All")) {
            stream = stream.filter(task -> task.getPriority().equalsIgnoreCase(priority));
        }

        if (state != null && !state.isEmpty() && !state.equalsIgnoreCase("All")) {
            boolean done = state.equalsIgnoreCase("Done");
            stream = stream.filter(task -> task.isCompleted() == done);
        }

        return stream.collect(Collectors.toList());
    }


    @PutMapping("/{id}/done")
    public List<Task> doneTask(@PathVariable int id) {
        for(Task t : tasks) {
            if(t.getId() == id) {
                t.setCompleted(true);
                t.setDoneDate(getDateString(LocalDateTime.now()));
            }
        }
        return tasks;
    }

    @PutMapping("/{id}/undone")
    public List<Task> undoneTask(@PathVariable int id) {
        for(Task t : tasks) {
            if(t.getId() == id) {
                t.setCompleted(false);
                t.setDoneDate("");
            }
        }
        return tasks;
    }

}
