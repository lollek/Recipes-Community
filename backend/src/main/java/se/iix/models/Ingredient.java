package se.iix.models;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@SuppressWarnings("WeakerAccess")
@Entity
@Table(name = "ingredients")
public class Ingredient implements Serializable {

    @SuppressWarnings("unused")
    @Id
    @GeneratedValue
    public Long id;

    @NotNull
    @Column(nullable = false)
    public String name;

    @Min(1)
    @Column(nullable = false)
    public double amount;

    @NotNull
    @Column(nullable = false)
    public String unit;

    @SuppressWarnings("unused")
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
