package com.naokko.todo.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naokko.todo.models.MetricsResponse;
import com.naokko.todo.models.Task;
import com.naokko.todo.services.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Test
    void testGetAllTasks() throws Exception {
        Task task = new Task();
        task.setId(1);
        task.setTitle("Test");
        Page<Task> page = new PageImpl<>(List.of(task));

        Mockito.when(taskService.getTasks(0, 10)).thenReturn(page);

        mockMvc.perform(get("/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].title").value("Test"));
    }

    @Test
    void testAddTask() throws Exception {
        Task task = new Task();
        task.setTitle("Test");
        Mockito.when(taskService.saveTask(any(Task.class))).thenReturn(task);

        mockMvc.perform(post("/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(task)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test"));
    }

    @Test
    void testSortByPriorityUp() throws Exception {
        Map<String, Object> result = Map.of("content", List.of(), "totalPages", 1);
        Mockito.when(taskService.getTasksSortedByPriority(true, 0, 10)).thenReturn(result);

        mockMvc.perform(get("/todos/sortPriorityUp"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    void testUpdateTaskCompletionFound() throws Exception {
        Task task = new Task();
        task.setId(1);
        task.setCompleted(true);
        Mockito.when(taskService.updateTaskCompletion(1, true)).thenReturn(task);

        mockMvc.perform(patch("/todos/1/complete?completed=true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void testUpdateTaskCompletionNotFound() throws Exception {
        Mockito.when(taskService.updateTaskCompletion(1, true)).thenThrow(new NoSuchElementException());

        mockMvc.perform(patch("/todos/1/complete?completed=true"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetMetrics() throws Exception {
        MetricsResponse metrics = new MetricsResponse(10, 5, 7, 3);
        Mockito.when(taskService.calculateMetrics()).thenReturn(metrics);

        mockMvc.perform(get("/todos/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.averageTime").value(10));
    }
}
