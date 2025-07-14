package com.naokko.todo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetricsResponse {
    private long averageTime;
    private long lowPriorityTime;
    private long mediumPriorityTime;
    private long highPriorityTime;

    private String averageTimeFormatted;
    private String lowPriorityFormatted;
    private String mediumPriorityFormatted;
    private String highPriorityFormatted;

    public MetricsResponse(long avg, long low, long med, long hi) {
        this.averageTime = avg;
        this.lowPriorityTime = low;
        this.mediumPriorityTime = med;
        this.highPriorityTime = hi;

        this.averageTimeFormatted = formatTime(avg);
        this.lowPriorityFormatted = formatTime(low);
        this.mediumPriorityFormatted = formatTime(med);
        this.highPriorityFormatted = formatTime(hi);
    }
    private String formatTime(long seconds) {
        long totalMinutes = seconds / 60;
        long hours = totalMinutes / 60;
        long minutes = totalMinutes % 60;

        if(seconds == 0) return "";
        if (hours == 0 && minutes == 0) return "less than a minute";
        if (hours == 0) return minutes + " min";
        if (minutes == 0) return hours + "h";
        return hours + "h " + minutes + "min";
    }
}
