package com.pratiksha.user_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pratiksha.user_service.entity.User;
import com.pratiksha.user_service.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Create User
    public User createUser(User user) {

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }
    
    //Login User
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }
    

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User By Id
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // Delete User
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    //Save Candidate
    public User saveCandidate(User user) {

        Optional<User> existing =
                userRepository.findByEmail(user.getEmail());

        if(existing.isPresent()) {
            return existing.get();
        }

        return userRepository.save(user);
    }
}