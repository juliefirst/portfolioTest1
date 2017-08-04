package com.rex.pm.commons;
/** 
* @author Curry
* @date Apr 22, 2017
* @version 0.1
*/
public class Commons {
	
	public enum ReturnCode{
		SUCCESS(1), FAIL(0), ERROR(-1);
		
		private int code;
		
		private ReturnCode(int code) { this.code = code; }
		public int getAbbreviation() { return code; }
	}
}

