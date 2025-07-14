package com.naokko.todo.controllers;

import com.naokko.todo.models.MetricsResponse;
import com.naokko.todo.models.Task;
import com.naokko.todo.repositories.TaskRepository;
import com.naokko.todo.services.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/todos")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskRepository taskRepository;

    private final Map<String, Integer> priorityOrder = Map.of(
            "High", 1,
            "Medium", 2,
            "Low", 3
    );

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<Page<Task>> getAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Task> tasks = taskService.getTasks(page, size);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task) {
        Task saved = taskService.saveTask(task);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @GetMapping("/sortPriorityUp")
    public ResponseEntity<Map<String, Object>> sortByPriorityUp(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(taskService.getTasksSortedByPriority(true, page, size));
    }

    @GetMapping("/sortPriorityDown")
    public ResponseEntity<Map<String, Object>> sortByPriorityDown(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(taskService.getTasksSortedByPriority(false, page, size));
    }

    @GetMapping("/sortDueDateUp")
    public ResponseEntity<Map<String, Object>> sortByDueDateUp(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(taskService.getTasksSortedByDueDate(true, page, size));
    }

    @GetMapping("/sortDueDateDown")
    public ResponseEntity<Map<String, Object>> sortByDueDateDown(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(taskService.getTasksSortedByDueDate(false, page, size));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> updateTaskCompletion(
            @PathVariable int id,
            @RequestParam boolean completed
    ) {
        try{
            Task updated = taskService.updateTaskCompletion(id, completed);
            return ResponseEntity.ok(updated);
        }catch(NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        if(!taskRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchTasks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String state,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Task> pageTasks = taskRepository.searchTasks(title, priority, state, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", pageTasks.getContent());
        response.put("totalPages", pageTasks.getTotalPages());
        response.put("totalElements", pageTasks.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable int id,
            @RequestBody Task updatedTask
    ){
        if(updatedTask.getId() != id){
            return ResponseEntity.notFound().build();
        }
        Task savedTask = taskService.updateTask(updatedTask);
        return ResponseEntity.ok(savedTask);
    }
    @GetMapping("/metrics")
    public ResponseEntity<MetricsResponse> getMetrics() {
        return ResponseEntity.ok(taskService.calculateMetrics());
    }
}
