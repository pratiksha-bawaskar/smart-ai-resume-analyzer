package com.pratiksha.user_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pratiksha.user_service.entity.User;
import com.pratiksha.user_service.repository.UserRepository;
import com.pratiksha.user_service.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

    // ✅ CREATE USER
	@PostMapping
	public User createUser(@RequestBody User user) {

	    System.out.println("Incoming User: " + user.getName());

	    return userService.createUser(user);
	}

    // ✅ GET ALL USERS
	@GetMapping
	public List<User> getUsers() {
	    return userService.getAllUsers();
	}
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable Long id) {
	    return userService.getUserById(id);
	}

	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Long id) {

	    userService.deleteUser(id);

	    return "User Deleted Successfully";
	}
	
}