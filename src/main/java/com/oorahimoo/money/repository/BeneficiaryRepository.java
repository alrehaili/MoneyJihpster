package com.oorahimoo.money.repository;

import com.oorahimoo.money.domain.Beneficiary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Beneficiary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {}
