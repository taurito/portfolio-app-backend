package service;

import data.UserDao;
import domain.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Stateless
@Path("/user")
public class UserServiceRS {
    
    @Inject
    private UserDao userDao;
    
    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    public List<User> listarUsuarios(){
        List<User> usuarios = userDao.encontrarTodosUsuarios();
        System.out.println("usuarios encontrados:" + usuarios);
        return usuarios;
    }
    
    @GET
    @Produces (value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public User encontrarUsuario(@PathParam("id") int id){
        User usuario = userDao.encontrarUsuarioPorID(new User(id));
        System.out.println("Usuario encontrado:" + usuario);
        return usuario;
    }
    
    @GET
    @Produces (value = MediaType.APPLICATION_JSON)
    @Path("/{email}/{contrasena}")
    public User encontrarUsuarioPorEmailContraseña(@PathParam("email") String email, @PathParam("contrasena") String password){
        User usuarioEncontrado = userDao.encontrarPorEmailContraseña(new User(email, password));
        System.out.println("Usuario encontrado pass:"+ usuarioEncontrado);
        return usuarioEncontrado;
    }
    
    @POST
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    public User insertarUsuario(User usuario){
        userDao.insertarUsuario(usuario);
        System.out.println("Usuario insertado:" + usuario);
        return usuario;
    }
    
    @PUT
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    public Response modificarUsuario(@PathParam("id") int id, User usuarioModificado){
        User usuario = userDao.encontrarUsuarioPorID(new User(id));
        if(usuario != null){
            userDao.actualizarUsuario(usuarioModificado);
            System.out.println("usuario modificado" + usuarioModificado);
            return Response.ok().entity(usuarioModificado).build();
        }
        else{
            return Response.status(Status.NOT_FOUND).build();
        }
    }
    
    @DELETE
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response eliminarUsuario(@PathParam("id") int id){
        userDao.eliminarUsuario(new User(id));
        System.out.println("Usuario eliminado" + id);
        return Response.ok().build();
    }
}
