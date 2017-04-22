package se.iix.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe implements Serializable {

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String title;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public List<Ingredient> ingredients;

    @Column(nullable = false, columnDefinition = "TEXT")
    public String instructions;

    @ManyToOne()
    @JoinColumn
    public User author;

    private Recipe() {}

    public Recipe(String title, List<Ingredient> ingredients, String instructions, User author) {
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.author = author;
    }

    public boolean validateForSave() {
        return title != null && instructions != null;
    }
}
