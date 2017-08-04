package com.rex.pm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rex.pm.entities.User;

/** 
* @author Curry
* @date Apr 2, 2017
* @version 0.1
*/
public interface UserRepository extends JpaRepository<User, Integer>{

	User findByName(String name);
	
	User findByUsernameAndPassword(String username, String password);
}
