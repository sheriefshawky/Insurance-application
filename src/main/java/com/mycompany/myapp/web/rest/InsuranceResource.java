package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Insurance;
import com.mycompany.myapp.repository.InsuranceRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Insurance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InsuranceResource {

    private final Logger log = LoggerFactory.getLogger(InsuranceResource.class);

    private static final String ENTITY_NAME = "insurance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InsuranceRepository insuranceRepository;

    public InsuranceResource(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    /**
     * {@code POST  /insurances} : Create a new insurance.
     *
     * @param insurance the insurance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new insurance, or with status {@code 400 (Bad Request)} if the insurance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/insurances")
    public ResponseEntity<Insurance> createInsurance(@RequestBody Insurance insurance) throws URISyntaxException {
        log.debug("REST request to save Insurance : {}", insurance);
        if (insurance.getId() != null) {
            throw new BadRequestAlertException("A new insurance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Insurance result = insuranceRepository.save(insurance);
        return ResponseEntity.created(new URI("/api/insurances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /insurances} : Updates an existing insurance.
     *
     * @param insurance the insurance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated insurance,
     * or with status {@code 400 (Bad Request)} if the insurance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the insurance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/insurances")
    public ResponseEntity<Insurance> updateInsurance(@RequestBody Insurance insurance) throws URISyntaxException {
        log.debug("REST request to update Insurance : {}", insurance);
        if (insurance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Insurance result = insuranceRepository.save(insurance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, insurance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /insurances} : get all the insurances.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of insurances in body.
     */
    @GetMapping("/insurances")
    public List<Insurance> getAllInsurances() {
        log.debug("REST request to get all Insurances");
        return insuranceRepository.findAll();
    }

    /**
     * {@code GET  /insurances/:id} : get the "id" insurance.
     *
     * @param id the id of the insurance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the insurance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/insurances/{id}")
    public ResponseEntity<Insurance> getInsurance(@PathVariable Long id) {
        log.debug("REST request to get Insurance : {}", id);
        Optional<Insurance> insurance = insuranceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(insurance);
    }

    /**
     * {@code DELETE  /insurances/:id} : delete the "id" insurance.
     *
     * @param id the id of the insurance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/insurances/{id}")
    public ResponseEntity<Void> deleteInsurance(@PathVariable Long id) {
        log.debug("REST request to delete Insurance : {}", id);
        insuranceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
