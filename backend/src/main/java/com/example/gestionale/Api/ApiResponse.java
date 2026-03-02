package com.example.gestionale.Api;
import java.time.LocalDateTime;

public class ApiResponse<T> {

    private int status;           // Codice HTTP (es. 200, 201, 404)
    private String message;     
    private T data;        
    private LocalDateTime timestamp;

    // Costruttore completo
    public ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    // --- METODI STATICI DI UTILITÀ ---

    // Per le operazioni andate a buon fine
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(200, message, data);
    }

    // Per le creazioni andate a buon fine (201 Created)
    public static <T> ApiResponse<T> created(T data, String message) {
        return new ApiResponse<>(201, message, data);
    }

    // Per gli errori (es. 404 Not Found o 400 Bad Request)
    public static <T> ApiResponse<T> error(int status, String message) {
        return new ApiResponse<>(status, message, null);
    }

    // --- GETTER E SETTER ---

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

}
