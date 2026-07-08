package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.LoginRequest;
import com.silvee925.erp.dto.request.RegisterRequest;
import com.silvee925.erp.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(String refreshToken);

    void logout(String refreshToken);
}
