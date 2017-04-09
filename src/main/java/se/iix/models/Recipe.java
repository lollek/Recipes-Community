package se.iix.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Recipe implements Serializable {

    private Recipe() {}

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String title;

    @Column(nullable = false)
    public String instructions;

    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne()
    @JoinColumn
    public User author;

    public boolean validateForSave() {
        return title != null && instructions != null;
    }
}
