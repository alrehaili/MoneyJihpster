package com.oorahimoo.money.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * A Beneficiary.
 */
@Entity
@Table(name = "beneficiary")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Beneficiary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(name = "beneficiary_ident", length = 36, unique = true)
    private UUID beneficiaryIdent;

    @Column(name = "name")
    private String name;

    @Column(name = "current_balance")
    private Double currentBalance;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "beneficiary")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiary" }, allowSetters = true)
    private Set<Transaction> transactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Beneficiary id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getBeneficiaryIdent() {
        return this.beneficiaryIdent;
    }

    public Beneficiary beneficiaryIdent(UUID beneficiaryIdent) {
        this.setBeneficiaryIdent(beneficiaryIdent);
        return this;
    }

    public void setBeneficiaryIdent(UUID beneficiaryIdent) {
        this.beneficiaryIdent = beneficiaryIdent;
    }

    public String getName() {
        return this.name;
    }

    public Beneficiary name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCurrentBalance() {
        return this.currentBalance;
    }

    public Beneficiary currentBalance(Double currentBalance) {
        this.setCurrentBalance(currentBalance);
        return this;
    }

    public void setCurrentBalance(Double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public Set<Transaction> getTransactions() {
        return this.transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        if (this.transactions != null) {
            this.transactions.forEach(i -> i.setBeneficiary(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setBeneficiary(this));
        }
        this.transactions = transactions;
    }

    public Beneficiary transactions(Set<Transaction> transactions) {
        this.setTransactions(transactions);
        return this;
    }

    public Beneficiary addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setBeneficiary(this);
        return this;
    }

    public Beneficiary removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setBeneficiary(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Beneficiary)) {
            return false;
        }
        return id != null && id.equals(((Beneficiary) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Beneficiary{" +
            "id=" + getId() +
            ", beneficiaryIdent='" + getBeneficiaryIdent() + "'" +
            ", name='" + getName() + "'" +
            ", currentBalance=" + getCurrentBalance() +
            "}";
    }
}
