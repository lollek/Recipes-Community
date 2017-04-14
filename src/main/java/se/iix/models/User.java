package se.iix.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity()
@Table(name = "users")
public class User implements Serializable {

    private User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.enabled = true;
    }

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false, unique = true)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column
    public Boolean enabled;

    public boolean validateForSave() {
        return this.username != null &&
                this.password != null;
    }
}
