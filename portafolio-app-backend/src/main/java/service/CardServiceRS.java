package service;

import data.CardDao;
import domain.CardWork;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Stateless
@Path("/card")
public class CardServiceRS {
    
    @Inject
    private CardDao cardDao;
    
    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    public List<CardWork> listarCards(){
        List<CardWork> cards = cardDao.encontrarTodasCards();
        System.out.println("card encontradas;" + cards);
        return cards;
    }
    
    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public CardWork encontrarCard (@PathParam("id") int id){
        CardWork card = cardDao.encontrarCard(new CardWork(id));
        System.out.println("cardWork encontrada:" + card);
        return card;
    }
    
    @POST
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    public CardWork agregarCard (CardWork card){
        cardDao.insertarCard(card);
        System.out.println("cardWork agregada:" + card);
        return card;
    }
    
    @PUT
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response modificarCard(@PathParam("id") int id, CardWork cardModificada){
        CardWork card = cardDao.encontrarCard(new CardWork(id));
        if(card != null){
            cardDao.actualizarCard(cardModificada   );
            System.out.println("cardWork modificada:" + cardModificada);
            return Response.ok().entity(cardModificada).build();
        }
        else{
            return Response.status(Status.NOT_FOUND).build();
        }
    }
    
    @DELETE
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response eliminarCard(@PathParam("id") int id){
        cardDao.eliminarCard(new CardWork(id));
        System.out.println("cardWork eliminada" + id);
        return Response.ok().build();
    }
}
