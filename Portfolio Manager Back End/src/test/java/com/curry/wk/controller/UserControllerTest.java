package com.curry.wk.controller;

//import static org.junit.Assert.*;
//
//import java.io.UnsupportedEncodingException;
//import java.util.List;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.context.jdbc.SqlGroup;
//import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import com.curry.wk.entities.User;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;

/** 
* @author Curry
* @date Apr 1, 2017
* @version 0.1
*/
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@AutoConfigureMockMvc
public class UserControllerTest {
//	
//	@Autowired
//	private MockMvc mockMvc;
//	
//	private static final ObjectMapper objectMapper = new ObjectMapper();

//	@Test
//	@SqlGroup({
//		@Sql(scripts = { "classpath:/database/clean.sql","classpath:/database/setup.sql", "classpath:/database/init.sql" }, 
//				executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
//		@Sql(scripts = {"classpath:/database/clean.sql", "classpath:/database/setup.sql", "classpath:/database/init.sql"},
//		executionPhase = ExecutionPhase.AFTER_TEST_METHOD), })
//	public void addOneTest() {
//			try {
//				String response = mockMvc.perform(MockMvcRequestBuilders.post("/users")
//						.param("name", "Tiger")
//						.param("username", "tiger")
//						.param("password", "123456")).andReturn().getResponse().getContentAsString();
//				User responseUser = objectMapper.readValue(response, User.class);
//				assertEquals("Tiger", responseUser.getName());
//			} catch (UnsupportedEncodingException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//	}
//	
//	@Test
//	@SqlGroup({
//		@Sql(scripts = { "classpath:/database/clean.sql","classpath:/database/setup.sql", "classpath:/database/init.sql" }, 
//				executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
//		@Sql(scripts = {"classpath:/database/clean.sql", "classpath:/database/setup.sql", "classpath:/database/init.sql"},
//		executionPhase = ExecutionPhase.AFTER_TEST_METHOD), })
//	public void findByIdTest() throws UnsupportedEncodingException, Exception{
//		String response = mockMvc.perform(MockMvcRequestBuilders.get("/users/2")).andReturn().getResponse().getContentAsString();
//		User responseUser = objectMapper.readValue(response, User.class);
//		assertEquals("Wind", responseUser.getName());
//	}
//	
//	@Test
//	@SqlGroup({
//		@Sql(scripts = { "classpath:/database/clean.sql","classpath:/database/setup.sql", "classpath:/database/init.sql" }, 
//				executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
//		@Sql(scripts = {"classpath:/database/clean.sql", "classpath:/database/setup.sql", "classpath:/database/init.sql"},
//		executionPhase = ExecutionPhase.AFTER_TEST_METHOD), })
//	public void findByNameTest() throws UnsupportedEncodingException, Exception{
//		String response = mockMvc.perform(MockMvcRequestBuilders.get("/users/search/Curry")).andReturn().getResponse().getContentAsString();
//		User responseUser = objectMapper.readValue(response, User.class);
//		assertEquals("Curry", responseUser.getName());
//	}
//	
//	@Test
//	@SqlGroup({
//		@Sql(scripts = { "classpath:/database/clean.sql","classpath:/database/setup.sql", "classpath:/database/init.sql" }, 
//				executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
//		@Sql(scripts = {"classpath:/database/clean.sql", "classpath:/database/setup.sql", "classpath:/database/init.sql"},
//		executionPhase = ExecutionPhase.AFTER_TEST_METHOD), })
//	public void findTest() throws UnsupportedEncodingException, Exception{
//		String response = mockMvc.perform(MockMvcRequestBuilders.get("/users")).andReturn().getResponse().getContentAsString();
//		List<User> responseList = objectMapper.readValue(response, new TypeReference<List<User>>(){});
//		assertEquals(7, responseList.size());
//	}
//	
//	@Test
//	@SqlGroup({
//		@Sql(scripts = { "classpath:/database/clean.sql","classpath:/database/setup.sql", "classpath:/database/init.sql" }, 
//				executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
//		@Sql(scripts = {"classpath:/database/clean.sql", "classpath:/database/setup.sql", "classpath:/database/init.sql"},
//		executionPhase = ExecutionPhase.AFTER_TEST_METHOD), })
//	public void loginTest() throws UnsupportedEncodingException, Exception{
//		String response = mockMvc.perform(MockMvcRequestBuilders.get("/login")
//				.param("username", "curry")
//				.param("password", "123456")).andReturn().getResponse().getContentAsString();
//		User responseUser = objectMapper.readValue(response, User.class);
//		assertEquals(1, responseUser.getId());
//	}
}
