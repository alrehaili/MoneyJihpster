package com.oorahimoo.money.domain;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Transaction extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(name = "transaction_ident", length = 36, unique = true)
    private String transactionIdent;

    @Column(name = "type")
    private String type;

    @Column(name = "how")
    private String how;

    @Column(name = "reason")
    private String reason;

    @Column(name = "note")
    private String note;

    @Column(name = "amount")
    private Double amount;

    @ManyToOne(fetch = FetchType.EAGER)
    //    @JsonIgnoreProperties(value = { "transactions" }, allowSetters = true)
    @JsonIncludeProperties({ "id", "name" })
    private Beneficiary beneficiary;

    public Long getId() {
        return this.id;
    }

    public Transaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionIdent() {
        return transactionIdent;
    }

    public void setTransactionIdent(String transactionIdent) {
        this.transactionIdent = transactionIdent;
    }

    public String getType() {
        return this.type;
    }

    public Transaction type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getHow() {
        return this.how;
    }

    public Transaction how(String how) {
        this.setHow(how);
        return this;
    }

    public void setHow(String how) {
        this.how = how;
    }

    public String getReason() {
        return this.reason;
    }

    public Transaction reason(String reason) {
        this.setReason(reason);
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getNote() {
        return this.note;
    }

    public Transaction note(String note) {
        this.setNote(note);
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Double getAmount() {
        return this.amount;
    }

    public Transaction amount(Double amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Beneficiary getBeneficiary() {
        return this.beneficiary;
    }

    public void setBeneficiary(Beneficiary beneficiary) {
        this.beneficiary = beneficiary;
    }

    public Transaction beneficiary(Beneficiary beneficiary) {
        this.setBeneficiary(beneficiary);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", transactionIdent='" + getTransactionIdent() + "'" +
            ", type='" + getType() + "'" +
            ", how='" + getHow() + "'" +
            ", reason='" + getReason() + "'" +
            ", note='" + getNote() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
