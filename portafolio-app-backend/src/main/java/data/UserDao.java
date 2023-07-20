package data;

import domain.User;
import java.util.List;

public interface UserDao {
    
    public List<User> encontrarTodosUsuarios();
    
    public User encontrarUsuarioPorID(User usuario);
    
    public User encontrarPorEmailContraseña(User Usuario);
        
    public void insertarUsuario(User usuario);
    
    public void actualizarUsuario( User usuario);
    
    public void eliminarUsuario (User usuario);
}
