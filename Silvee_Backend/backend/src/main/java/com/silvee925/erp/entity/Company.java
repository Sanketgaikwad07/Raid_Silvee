package com.silvee925.erp.entity;

import com.silvee925.erp.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "companies",
    indexes = {
        @Index(name = "idx_company_status", columnList = "status"),
        @Index(name = "idx_company_gst_no", columnList = "gst_no")
    }
)
public class Company extends BaseEntity {

    @Column(name = "company_code", nullable = false, unique = true, length = 20)
    private String companyCode;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(name = "legal_name", length = 150)
    private String legalName;

    @Column(name = "company_type", length = 30)
    private String companyType;

    @Column(name = "gst_no", unique = true, length = 15)
    private String gstNo;

    @Column(name = "pan_no", length = 10)
    private String panNo;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "alternate_phone", length = 20)
    private String alternatePhone;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "website", length = 150)
    private String website;

    @Column(name = "address_line1", length = 200)
    private String addressLine1;

    @Column(name = "address_line2", length = 200)
    private String addressLine2;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "state", nullable = false, length = 50)
    private String state;

    @Column(name = "state_code", length = 5)
    private String stateCode;

    @Column(name = "pincode", length = 10)
    private String pincode;

    @Column(name = "country", nullable = false, length = 50)
    private String country = "India";

    @Column(name = "currency", nullable = false, length = 10)
    private String currency = "INR";

    @Column(name = "logo_url", length = 255)
    private String logoUrl;

    @Column(name = "is_default", nullable = false)
    private boolean defaultCompany = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status = Status.ACTIVE;
}
