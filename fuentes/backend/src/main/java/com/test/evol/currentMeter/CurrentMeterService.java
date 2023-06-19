package com.test.evol.currentMeter;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CurrentMeterService {

    private final CurrentMeterRepository CurrentMeterRepository;

    @Autowired
    public CurrentMeterService(CurrentMeterRepository CurrentMeterRepository) {
        this.CurrentMeterRepository = CurrentMeterRepository;
    }

    public List<CurrentMeter> getCurrentMeter() {
        return this.CurrentMeterRepository.findAll();
    }

    public ResponseEntity<Object> createCurrentMeter(CurrentMeter CurrentMeter) {
        Optional<CurrentMeter> res = CurrentMeterRepository.findCurrentMeterByEvolId(CurrentMeter.getEvolId());
        HashMap<String, Object> data = new HashMap<>();

        if (res.isPresent() && CurrentMeter.getId() == null) {
            data.put("error", true);
            data.put("message", "Ya existe el Id Unico del medidor");

            return new ResponseEntity<>(
                    data,
                    HttpStatus.CONFLICT);
        }

        data.put("data", CurrentMeter);
        data.put("message", "Se agrego un nuevo medidor de corriente ");

        if (CurrentMeter.getId() != null) {
            data.put("message", "Se actualizaron el medidor de corriente ");
        }

        CurrentMeterRepository.save(CurrentMeter);

        return new ResponseEntity<>(
                data,
                HttpStatus.CREATED);
    }

    public ResponseEntity<Object> deleteCurrentMeter(Long id) {
        boolean exists = this.CurrentMeterRepository.existsById(id);
        HashMap<String, Object> data = new HashMap<>();

        if (!exists) {
            data.put("error", true);
            data.put("message", "No existe un Medidor de corriente con esta id");

            return new ResponseEntity<>(
                    data,
                    HttpStatus.CONFLICT);
        }

        CurrentMeterRepository.deleteById(id);

        data.put("message", "Medidor de corriente eliminado");

        return new ResponseEntity<>(
                data,
                HttpStatus.ACCEPTED);

    }
}
