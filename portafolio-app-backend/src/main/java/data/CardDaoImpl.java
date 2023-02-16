package data;

import domain.CardWork;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.*;

@Stateless
public class CardDaoImpl implements CardDao{
    
    @PersistenceContext(unitName = "PortfolioPU") 
    EntityManager em;
    
    @Override
    public List<CardWork> encontrarTodasCards() {
        return em.createNamedQuery("CardWork.encontrarTodasCardWorks").getResultList();
    }

    @Override
    public CardWork encontrarCard(CardWork card) {
        return em.find(CardWork.class, card.getIdCardWork());
    }

    @Override
    public void insertarCard(CardWork card) {
        em.persist(card);
        em.flush();
    }

    @Override
    public void actualizarCard(CardWork card) {
        em.merge(card);
    }

    @Override
    public void eliminarCard(CardWork card) {
        em.remove(em.merge(card));
    }
    
}
