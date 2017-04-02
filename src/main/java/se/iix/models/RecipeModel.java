package se.iix.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class RecipeModel implements Serializable {

    private RecipeModel() {}

    @Id
    @GeneratedValue
    public Long id;

    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="text")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToOne(targetEntity = RecipeInstructionsModel.class)
    @JoinColumn(nullable = false)
    public RecipeInstructionsModel instructions;

    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne()
    @JoinColumn
    public UserModel author;

    public boolean validateForSave() {
        return (instructions != null && instructions.validateForSave());
    }
}
