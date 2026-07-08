package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.LoginRequest;
import com.silvee925.erp.dto.request.RegisterRequest;
import com.silvee925.erp.dto.response.AuthResponse;
import com.silvee925.erp.entity.RefreshToken;
import com.silvee925.erp.entity.User;
import com.silvee925.erp.entity.enums.RoleType;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.UnauthorizedException;
import com.silvee925.erp.mapper.UserMapper;
import com.silvee925.erp.repository.RefreshTokenRepository;
import com.silvee925.erp.repository.UserPermissionRepository;
import com.silvee925.erp.repository.UserRepository;
import com.silvee925.erp.security.CustomUserPrincipal;
import com.silvee925.erp.security.JwtTokenProvider;
import com.silvee925.erp.security.SecureTokenGenerator;
import com.silvee925.erp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserPermissionRepository userPermissionRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final SecureTokenGenerator secureTokenGenerator;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByRole(RoleType.ADMIN)) {
            throw new BadRequestException(
                    "An ADMIN account already exists. Ask an existing ADMIN to create additional accounts.");
        }
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("An account with this email already exists");
        }

        User admin = new User();
        admin.setFullName(request.fullName());
        admin.setEmail(request.email());
        admin.setPassword(passwordEncoder.encode(request.password()));
        admin.setRole(RoleType.ADMIN);
        admin.setActive(true);
        userRepository.save(admin);

        log.info("New ADMIN account registered: {}", admin.getEmail());
        return buildAuthResponse(admin);
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new UnauthorizedException("User no longer exists"));

        if (!user.isActive()) {
            log.warn("Login rejected for deactivated account: {}", user.getEmail());
            throw new UnauthorizedException("This account has been deactivated");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        log.info("User logged in: {} (role={})", user.getEmail(), user.getRole());
        return buildAuthResponse(user);
    }

    @Override
    @Transactional
    public AuthResponse refreshToken(String rawToken) {
        RefreshToken existing = refreshTokenRepository.findByTokenAndRevokedFalse(rawToken)
                .orElseThrow(() -> new UnauthorizedException("Invalid or expired refresh token"));

        if (existing.getExpiryDate().isBefore(LocalDateTime.now())) {
            existing.setRevoked(true);
            refreshTokenRepository.save(existing);
            throw new UnauthorizedException("Refresh token has expired, please log in again");
        }

        existing.setRevoked(true);
        refreshTokenRepository.save(existing);

        log.info("Refresh token rotated for user: {}", existing.getUser().getEmail());
        return buildAuthResponse(existing.getUser());
    }

    @Override
    @Transactional
    public void logout(String rawToken) {
        refreshTokenRepository.findByTokenAndRevokedFalse(rawToken).ifPresent(rt -> {
            rt.setRevoked(true);
            refreshTokenRepository.save(rt);
            log.info("User logged out: {}", rt.getUser().getEmail());
        });
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtTokenProvider.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(secureTokenGenerator.generate());
        refreshToken.setExpiryDate(LocalDateTime.now().plusNanos(jwtTokenProvider.getRefreshTokenExpirationMs() * 1_000_000));
        refreshTokenRepository.save(refreshToken);

        var grants = userPermissionRepository.findAllByUserId(user.getId());
        return AuthResponse.of(
                accessToken,
                refreshToken.getToken(),
                jwtTokenProvider.getAccessTokenExpirationMs(),
                userMapper.toResponse(user, grants)
        );
    }
}
