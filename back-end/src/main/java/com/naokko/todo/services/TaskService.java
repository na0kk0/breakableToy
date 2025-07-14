package com.naokko.todo.services;

import com.naokko.todo.models.MetricsResponse;
import com.naokko.todo.models.Task;
import com.naokko.todo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private final Map<String, Integer> priorityOrder = Map.of(
            "High", 1,
            "Medium", 2,
            "Low", 3
    );

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public Page<Task> getTasks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return taskRepository.findAll(pageable);
    }

    public Task updateTaskCompletion(int id, boolean completed) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isEmpty()) {
            throw new NoSuchElementException("Task not found");
        }
        Task task = taskOptional.get();
        task.setCompleted(completed);
        task.setDoneDate(completed ? LocalDateTime.now() : null);
        return taskRepository.save(task);
    }

    public Task updateTask(Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(updatedTask.getId());
        if (optionalTask.isEmpty()) {
            throw new RuntimeException("Task not found with ID: "+updatedTask.getId());
        }
        Task existingTask = optionalTask.get();
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDueDate(updatedTask.getDueDate());
        existingTask.setCompleted(updatedTask.isCompleted());
        existingTask.setDoneDate(updatedTask.getDoneDate());
        existingTask.setPriority(updatedTask.getPriority());

        return taskRepository.save(existingTask);
    }

    public Map<String, Object> getTasksSortedByPriority(boolean ascending, int page, int size) {
        List<Task> sorted = taskRepository.findAll().stream()
                .sorted((a, b) -> {
                    int priorityA = priorityOrder.getOrDefault(a.getPriority(), Integer.MAX_VALUE);
                    int priorityB = priorityOrder.getOrDefault(b.getPriority(), Integer.MAX_VALUE);
                    return ascending ? Integer.compare(priorityA, priorityB) : Integer.compare(priorityB, priorityA);
                })
                .toList();

        return paginate(sorted, page, size);
    }

    public Map<String, Object> getTasksSortedByDueDate(boolean ascending, int page, int size) {
        Comparator<LocalDateTime> dateComparator = ascending ? Comparator.naturalOrder() : Comparator.reverseOrder();

        List<Task> sorted = taskRepository.findAll().stream()
                .sorted(Comparator.comparing(Task::getDueDate, Comparator.nullsLast(dateComparator)))
                .toList();

        return paginate(sorted, page, size);
    }

    private Map<String, Object> paginate(List<Task> sortedList, int page, int size) {
        int start = Math.min(page * size, sortedList.size());
        int end = Math.min(start + size, sortedList.size());
        List<Task> paged = sortedList.subList(start, end);

        Map<String, Object> response = new HashMap<>();
        response.put("content", paged);
        response.put("totalPages", (int) Math.ceil((double) sortedList.size() / size));
        return response;
    }

    public MetricsResponse calculateMetrics() {
        List<Task> completedTasks = taskRepository.findAll().stream()
                .filter(Task::isCompleted)
                .toList();

        long totalTime = 0;
        long lowTime = 0, medTime = 0, hiTime = 0;
        long lowCount = 0, medCount = 0, hiCount = 0;

        for(Task task : completedTasks) {
            if(task.getDoneDate() == null || task.getCreateDate() == null) continue;

            long seconds = java.time.Duration.between(task.getCreateDate(), LocalDateTime.now()).getSeconds();
            totalTime += seconds;

            switch(task.getPriority()) {
                case"Low"-> {
                    lowTime += seconds;
                    lowCount++;
                }
                case "Medium"->{
                    medTime += seconds;
                    medCount++;
                }
                case "High"->{
                    hiTime += seconds;
                    hiCount++;
                }
            }
        }

        return new MetricsResponse(
                completedTasks.isEmpty() ? 0 : totalTime / completedTasks.size(),
                lowCount > 0 ? lowTime / lowCount : 0,
                medTime > 0 ? medTime / medCount : 0,
                hiTime > 0 ? hiTime / hiCount : 0
        );
    }
}
