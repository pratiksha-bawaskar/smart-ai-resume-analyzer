package com.pratiksha.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pratiksha.user_service.dto.LoginRequest;
import com.pratiksha.user_service.dto.LoginResponse;
import com.pratiksha.user_service.entity.User;
import com.pratiksha.user_service.jwt.JwtService;
import com.pratiksha.user_service.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        User user = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(
                user.getEmail()
        );

        LoginResponse response =
                new LoginResponse(
                        token,
                        "Login successful"
                );

        return ResponseEntity.ok(response);
    }
}