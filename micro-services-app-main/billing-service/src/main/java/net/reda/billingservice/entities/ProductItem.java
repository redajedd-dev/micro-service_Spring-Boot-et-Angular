package net.reda.billingservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import net.reda.billingservice.model.Product;

@Entity
public class ProductItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productId;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Bill bill;
    private int quantity;
    private double unitPrice;
    @Transient
    private Product product;

    public ProductItem() {
    }

    public ProductItem(Long id, String productId, Bill bill, int quantity, double unitPrice, Product product) {
        this.id = id;
        this.productId = productId;
        this.bill = bill;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public static ProductItemBuilder builder() {
        return new ProductItemBuilder();
    }

    public static class ProductItemBuilder {
        private Long id;
        private String productId;
        private Bill bill;
        private int quantity;
        private double unitPrice;
        private Product product;

        ProductItemBuilder() {
        }

        public ProductItemBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProductItemBuilder productId(String productId) {
            this.productId = productId;
            return this;
        }

        public ProductItemBuilder bill(Bill bill) {
            this.bill = bill;
            return this;
        }

        public ProductItemBuilder quantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public ProductItemBuilder unitPrice(double unitPrice) {
            this.unitPrice = unitPrice;
            return this;
        }

        public ProductItemBuilder product(Product product) {
            this.product = product;
            return this;
        }

        public ProductItem build() {
            return new ProductItem(id, productId, bill, quantity, unitPrice, product);
        }

        public String toString() {
            return "ProductItem.ProductItemBuilder(id=" + this.id + ", productId=" + this.productId + ", bill="
                    + this.bill + ", quantity=" + this.quantity + ", unitPrice=" + this.unitPrice + ", product="
                    + this.product + ")";
        }
    }
}
