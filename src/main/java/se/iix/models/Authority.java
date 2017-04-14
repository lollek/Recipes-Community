package se.iix.models;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class Authority {

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String authority;
}
