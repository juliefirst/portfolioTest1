package com.rex.pm.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rex.pm.entities.User;
import com.rex.pm.repository.UserRepository;

/** 
* @author Curry
* @date Apr 2, 2017
* @version 0.1
*/
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public User login(String username, String password){
		return userRepository.findByUsernameAndPassword(username, password);
	}

	public User findOne(int id){
		return userRepository.findOne(id);
	}
	
	public User findOne(String name){
		return userRepository.findByName(name);
	}
	
	public List<User> find(){
		return userRepository.findAll();
	}
	
	public User add(User user){
		return userRepository.save(user);
	}
	
	public User update(User user){
		return userRepository.save(user);
	}
	
	public void delete(int id){
		userRepository.delete(id);
	}
}
