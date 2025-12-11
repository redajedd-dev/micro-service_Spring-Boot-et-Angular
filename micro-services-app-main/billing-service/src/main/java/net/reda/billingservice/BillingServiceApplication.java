package net.reda.billingservice;

import net.reda.billingservice.entities.Bill;
import net.reda.billingservice.entities.ProductItem;
import net.reda.billingservice.feign.CustomerRestClient;
import net.reda.billingservice.feign.ProductRestClient;
import net.reda.billingservice.model.Customer;
import net.reda.billingservice.model.Product;
import net.reda.billingservice.repository.BillRepository;
import net.reda.billingservice.repository.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(BillRepository billRepository,
			ProductItemRepository productItemRepository,
			CustomerRestClient customerRestClient,
			ProductRestClient productRestClient) {

		return args -> {
			for (int i = 0; i < 5; i++) {
				try {
					Thread.sleep(15000); // Wait for Eureka sync
					Collection<Customer> customers = customerRestClient.getAllCustomers().getContent();
					Collection<Product> products = productRestClient.getAllProducts().getContent();

					customers.forEach(customer -> {
						Bill bill = Bill.builder()
								.billingDate(new Date())
								.customerId(customer.getId())
								.build();
						billRepository.save(bill);
						products.forEach(product -> {
							ProductItem productItem = ProductItem.builder()
									.bill(bill)
									.productId(product.getId())
									.quantity(1 + new Random().nextInt(10))
									.unitPrice(product.getPrice())
									.build();
							productItemRepository.save(productItem);
						});
					});
					break; // Success, exit loop
				} catch (Exception e) {
					System.err.println("Attempt " + (i + 1) + " failed: " + e.getMessage());
					if (i == 4) {
						// Don't throw exception, just log and keep running
						System.err.println(
								"Initialization failed after 5 attempts. Application will continue running but data might be missing.");
					}
				}
			}
		};
	}

}
