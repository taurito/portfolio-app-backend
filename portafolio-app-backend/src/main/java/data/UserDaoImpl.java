package data;

import domain.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.*;


@Stateless
public class UserDaoImpl implements UserDao {
    
    @PersistenceContext(unitName = "PortfolioPU")
    EntityManager em;
    
    @Override
    public List<User> encontrarTodosUsuarios() {
        return em.createNamedQuery("User.encontrarTodosUsuarios").getResultList();
    }

    @Override
    public User encontrarUsuarioPorID(User usuario) {
        return em.find(User.class, usuario.getIdUser());
    }
    
    @Override
    public User encontrarPorEmailContraseña(User usuario){
        TypedQuery<User> query = em.createNamedQuery("User.findByEmailPassword", User.class);
        query.setParameter("email", usuario.getEmail());
        query.setParameter("password", usuario.getPassword());
        return query.getSingleResult();
  
    }
    
    @Override
    public void insertarUsuario(User usuario) {
        em.persist(usuario);
        em.flush();
    }

    @Override
    public void actualizarUsuario(User usuario) {
        em.merge(usuario);
    }

    @Override
    public void eliminarUsuario(User usuario) {
        em.remove(em.merge(usuario));
    }
    
}
