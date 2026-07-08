package com.silvee925.erp.repository;

import com.silvee925.erp.entity.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {

    @Query("select up from UserPermission up join fetch up.permission where up.user.id = :userId")
    List<UserPermission> findAllByUserId(Long userId);

    @Modifying
    @Query("delete from UserPermission up where up.user.id = :userId")
    void deleteAllByUserId(Long userId);
}
