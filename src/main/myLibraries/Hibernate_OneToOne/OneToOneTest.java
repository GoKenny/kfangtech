package Hibernate_OneToOne;

/*

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.tool.hbm2ddl.SchemaExport;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class OneToOneTest {
	
    private static SessionFactory sessionFactory ;
    
    @BeforeClass
    public static void beforeClass() {
        new SchemaExport(new AnnotationConfiguration().configure()).create(true, true) ;          
        sessionFactory = new AnnotationConfiguration().configure().buildSessionFactory() ;}
    
    @AfterClass
    public static void afterClass() {
            sessionFactory.close() ;}
    @Test
    public void testSave() {
        Heart h = new Heart() ;
        h.setHeartName("h2") ;

        Body b = new Body() ;
        b.setBodyName("b2") ;
        b.setHeart(h) ;
            
        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction() ;
        session.save(h) ;
        session.save(b) ;
        session.beginTransaction().commit() ;}
    
    @Test
    public void testGet() {
        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction();
        
        Body b = (Body) session.get(Body.class, 1) ;
        System.out.println(b.getId() +" "+b.getBodyName());
            
        Heart h = b.getHeart();
        System.out.println(h.getId() +" "+h.getHeartName());
            
        session.beginTransaction().commit();}
    


    @Test
    public void testDelete() {
        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction() ;

        Body b = (Body) session.get(Body.class, 1) ;
        session.delete(b) ;
            
        session.beginTransaction().commit() ;}

}


*/