package com.pratiksha.user_service.dto;

public class LoginResponse {

    private String token;
    private String message;
    private Long id;
    private String name;

    public LoginResponse() {
    }

    public LoginResponse(String token, String message, Long id, String name) {
        this.token = token;
        this.message = message;
        this.id = id;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}