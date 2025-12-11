package net.reda.billingservice.entities;

import jakarta.persistence.*;

import net.reda.billingservice.model.Customer;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date billingDate;
    private long customerId;
    @OneToMany(mappedBy = "bill")
    private List<ProductItem> productItems = new ArrayList<>();
    @Transient
    private Customer customer;

    public Bill() {
    }

    public Bill(Long id, Date billingDate, long customerId, List<ProductItem> productItems, Customer customer) {
        this.id = id;
        this.billingDate = billingDate;
        this.customerId = customerId;
        this.productItems = productItems;
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(Date billingDate) {
        this.billingDate = billingDate;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public List<ProductItem> getProductItems() {
        return productItems;
    }

    public void setProductItems(List<ProductItem> productItems) {
        this.productItems = productItems;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public static BillBuilder builder() {
        return new BillBuilder();
    }

    public static class BillBuilder {
        private Long id;
        private Date billingDate;
        private long customerId;
        private List<ProductItem> productItems;
        private Customer customer;

        BillBuilder() {
        }

        public BillBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BillBuilder billingDate(Date billingDate) {
            this.billingDate = billingDate;
            return this;
        }

        public BillBuilder customerId(long customerId) {
            this.customerId = customerId;
            return this;
        }

        public BillBuilder productItems(List<ProductItem> productItems) {
            this.productItems = productItems;
            return this;
        }

        public BillBuilder customer(Customer customer) {
            this.customer = customer;
            return this;
        }

        public Bill build() {
            return new Bill(id, billingDate, customerId, productItems, customer);
        }

        public String toString() {
            return "Bill.BillBuilder(id=" + this.id + ", billingDate=" + this.billingDate + ", customerId="
                    + this.customerId + ", productItems=" + this.productItems + ", customer=" + this.customer + ")";
        }
    }
}
