package se.iix.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class RecipeInstructionsModel implements Serializable{

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String text;

    public boolean validateForSave() {
        return text != null;
    }
}
