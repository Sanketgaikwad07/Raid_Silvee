package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.AssignPermissionsRequest;
import com.silvee925.erp.dto.request.CreateEmployeeAccountRequest;
import com.silvee925.erp.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    /** ADMIN-only: creates an Employee Master record plus a linked SALES login account. */
    UserResponse createEmployeeAccount(CreateEmployeeAccountRequest request);

    UserResponse assignPermissions(Long userId, AssignPermissionsRequest request);

    List<UserResponse> listUsers();

    UserResponse getUser(Long userId);

    UserResponse setActive(Long userId, boolean active);
}
