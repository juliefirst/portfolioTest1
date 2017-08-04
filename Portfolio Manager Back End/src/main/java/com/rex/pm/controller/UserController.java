package com.rex.pm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rex.pm.commons.Commons.ReturnCode;
import com.rex.pm.commons.ReturnData;
import com.rex.pm.entities.User;
import com.rex.pm.service.UserService;

/** 
* @author Curry
* @date Apr 1, 2017
* @version 0.1
*/
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	private Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	@GetMapping(value = "/test")
	public String Test(){
		return "test success!";
	}
	
	@PostMapping(value = "/login")
	public ReturnData login(String username, String password){
		User loginUser = userService.login(username, password);
		if (loginUser == null) {
			return new ReturnData(ReturnCode.FAIL, "User is not exist!", null);
		}
		logger.info("loginUser: " + loginUser);
		return new ReturnData(ReturnCode.SUCCESS, "Login success!", loginUser);
	}

	@GetMapping(value = "/users")
	public List<User> getAllUser(){
		return userService.find();
	}

	@PostMapping(value = "/users")
	public ReturnData add(User user){
		User newUser = userService.add(user);
		if (newUser == null){
			return new ReturnData(ReturnCode.FAIL, "update user fail!", null);
		}
		return new ReturnData(ReturnCode.SUCCESS, "update user success!", newUser);
	}

	@GetMapping(value = "/users/{id}")
	public ReturnData getById(@PathVariable Integer id){
		User queryUser = userService.findOne(id);
		if (queryUser == null){
			return new ReturnData(ReturnCode.FAIL, "update user fail!", null);
		}
		logger.info("User: " + queryUser);
		return new ReturnData(ReturnCode.SUCCESS, "update user success!", queryUser);
	}

	@PutMapping(value = "/users/{id}")
	public ReturnData update(User user) throws Exception{
		User updateUser = userService.update(user);
		if (updateUser == null){
			return new ReturnData(ReturnCode.FAIL, "update user fail!", null);
		}
		return new ReturnData(ReturnCode.SUCCESS, "update user success!", updateUser);
	}
	
	@DeleteMapping(value = "/users/{id}")
	public ReturnData delete(@PathVariable int id){
		userService.delete(id);
		return new ReturnData(ReturnCode.SUCCESS, "delete user success!", null);
	}
}
