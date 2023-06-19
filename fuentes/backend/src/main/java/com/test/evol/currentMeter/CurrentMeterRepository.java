package com.test.evol.currentMeter;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentMeterRepository extends JpaRepository<CurrentMeter, Long> {

    Optional<CurrentMeter> findCurrentMeterByEvolId(String evolId);

}
