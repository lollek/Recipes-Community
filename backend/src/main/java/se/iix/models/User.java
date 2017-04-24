package se.iix.models;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;

@Entity
@Table(name = "users")
@JsonSerialize(using = UserSerializer.class)
public class User implements Serializable {

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false, unique = true)
    public String username;

    @Column(nullable = false)
    public String facebookId;

    @Column
    public Boolean enabled;

    private User() {}

    public User(
            final String username,
            final String facebookId
    ) {
        this.username = username;
        this.facebookId = facebookId;
        this.enabled = true;
    }
}

class UserSerializer extends JsonSerializer<User> {

    @Override
    public void serialize(
            final User user,
            final JsonGenerator jsonGenerator,
            final SerializerProvider serializerProvider
    ) throws IOException, JsonProcessingException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", user.id);
        jsonGenerator.writeStringField("username", user.username);
        jsonGenerator.writeEndObject();
    }
}
