package se.iix.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ingredients")
public class Ingredient implements Serializable {

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public double amount;

    @Column(nullable = false)
    public String unit;

    private Ingredient() {}

    public Ingredient(
            final String name,
            final double amount,
            final String unit
    ) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    public boolean validateForSave() {
        return this.name != null && this.unit != null;
    }
}
