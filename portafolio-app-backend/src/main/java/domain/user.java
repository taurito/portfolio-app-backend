package domain;

import java.io.Serializable;
import javax.persistence.*;


@Entity
@NamedQueries({
    @NamedQuery(name = "User.encontrarTodosUsuarios", query = "SELECT us FROM User us ORDER BY us.idUser "),
    @NamedQuery(name = "User.findByEmailPassword", query = "SELECT us FROM User us WHERE us.email = :email AND us.password = :password")
})
public class User implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int idUser;
    
    private String userName;
    private String email;
    private String password;
    private String rol;
    
    public User() {}

    public User(int idUser) {
        this.idUser = idUser;
    }

    public User(int idUser, String userName, String email, String password, String rol) {
        this.idUser = idUser;
        this.userName = userName;
        this.email= email;
        this.password = password;
        this.rol = rol;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
    

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getEmail(){
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "User{" + "idUser=" + idUser + ", userName=" + userName + ", email=" + email + ", password=" + password + ", rol=" + rol +'}';
    }
    
}
