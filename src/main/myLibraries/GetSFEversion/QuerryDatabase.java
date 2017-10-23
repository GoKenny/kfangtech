package GetSFEversion;

/*

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;


public class QuerryDatabase {
private static SessionFactory sessionFactory ;
    
    @BeforeClass
    public static void beforeClass() {          
//        new SchemaExport(new Configuration().configure()).create(true, true) ;            
        sessionFactory = new AnnotationConfiguration().configure().buildSessionFactory() ;}
    
    @AfterClass
    public static void afterClass() {
        sessionFactory.close() ;}
    
    @Test
    public void testGetVersion() {

        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction();
        
        Version v = (Version) session.get(Version.class, 1) ;
        System.out.println("The Version is: "+v.getVersion());
    }

}


*/