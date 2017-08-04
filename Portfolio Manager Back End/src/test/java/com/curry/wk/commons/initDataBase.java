package com.curry.wk.commons;

import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;

/** 
* @author Curry
* @date Apr 2, 2017
* @version 0.1
*/
@SqlGroup({
	@Sql(scripts = { "classpath:/database/clean.sql","classpath:/database/setup.sql", "classpath:/database/init.sql" }, 
			executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
	@Sql(scripts = {"classpath:/database/clean.sql", "classpath:/database/setup.sql", "classpath:/database/init.sql"},
	executionPhase = ExecutionPhase.AFTER_TEST_METHOD), })
public @interface initDataBase {

}
