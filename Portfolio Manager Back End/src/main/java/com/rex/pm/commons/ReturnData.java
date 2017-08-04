package com.rex.pm.commons;

import com.rex.pm.commons.Commons.ReturnCode;

/** 
* @author Curry
* @date Apr 8, 2017
* @version 0.1
*/
public class ReturnData {

	ReturnCode code;
	String message;
	Object data;
	
	public ReturnData(ReturnCode code, String message, Object data) {
		super();
		this.code = code;
		this.message = message;
		this.data = data;
	}
	
	public ReturnCode getCode() {
		return code;
	}
	public void setCode(ReturnCode code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}
