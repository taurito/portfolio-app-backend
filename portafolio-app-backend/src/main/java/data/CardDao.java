package data;

import domain.CardWork;
import java.util.List;

public interface CardDao {
    
    public List<CardWork> encontrarTodasCards();
    
    public CardWork encontrarCard(CardWork card);
    
    public void insertarCard(CardWork card);
    
    public void actualizarCard(CardWork card);
    
    public void eliminarCard(CardWork card);
}
