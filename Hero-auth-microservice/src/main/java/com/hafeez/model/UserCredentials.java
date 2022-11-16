package com.hafeez.model;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Model class for fetching user credentials while login
 */

public class UserCredentials {

	private String userName;

	@Pattern(regexp = "^[A-Za-z0-9]+$", message = "Password should contain alpha numeric values")
	private String password;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserCredentials(String userName,
			@Pattern(regexp = "^[A-Za-z0-9]+$", message = "Password should contain alpha numeric values") String password) {
		super();
		this.userName = userName;
		this.password = password;
	}

	public UserCredentials() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "UserCredentials [userName=" + userName + ", password=" + password + "]";
	}
	
}
