package com.silvee925.erp.security;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;

/** Generates cryptographically strong, URL-safe opaque tokens for refresh-token storage. */
@Component
public class SecureTokenGenerator {

    private static final int TOKEN_BYTES = 64;
    private final SecureRandom secureRandom = new SecureRandom();

    public String generate() {
        byte[] bytes = new byte[TOKEN_BYTES];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
