package domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@NamedQueries({
    @NamedQuery(name = "CardWork.encontrarTodasCardWorks", query = "SELECT cw FROM CardWork cw ORDER BY cw.idCardWork")
})
public class CardWork implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcard_work")
    private int idCardWork;
    
    private String titulo;
    
    //@Lob
    //@Column(name = "image", columnDefinition="LONGBLOB")
    private String image;
    
    private String descripcion;
    private String referencia;

    public CardWork() {}

    public CardWork(int idCardWork) {
        this.idCardWork = idCardWork;
    }

    public CardWork(int idCardWork, String titulo, String image, String descripcion, String referencia) {
        this.idCardWork = idCardWork;
        this.titulo = titulo;
        this.image = image;
        this.descripcion = descripcion;
        this.referencia = referencia;
    }

    public int getIdCardWork() {
        return idCardWork;
    }

    public void setIdCardWork(int idCardWork) {
        this.idCardWork = idCardWork;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    } 

    @Override
    public String toString() {
        return "CardWork{" + "idCardWork=" + idCardWork + ", titulo=" + titulo + ", image=" + image + ", descripcion=" + descripcion + ", referencia=" + referencia + '}';
    }
    
}
