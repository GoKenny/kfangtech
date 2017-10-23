package Hibernate_OneToOne;

/*

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
import org.hibernate.annotations.Entity;

@Entity
public class Body {        
    
    private int id ;
    private String bodyName ;    
    private Heart heart ;
    
    @Id
    @GeneratedValue
    public int getId() {
        return id;}
    public void setId(int id) {
        this.id = id;}
        
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="body-id",unique=true)
    public Heart getHeart() {
        return heart;}
    public void setHeart(Heart heart) {
        this.heart = heart;}

    public String getBodyName() {
        return bodyName;}
    public void setBodyName(String bodyName) {
        this.bodyName = bodyName;}
}

*/