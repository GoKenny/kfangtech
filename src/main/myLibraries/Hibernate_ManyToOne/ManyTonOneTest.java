package Hibernate_ManyToOne;

/*

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class ManyTonOneTest {
    
    private static SessionFactory sessionFactory ;
    
    @BeforeClass
    public static void beforeClass() {
        sessionFactory = new AnnotationConfiguration().configure().buildSessionFactory() ;}
    
    @AfterClass
    public static void afterClass() {
        sessionFactory.close() ;}
    
    @Test
    public void testSave() {
        
        Organization o = new Organization() ;
        o.setOrgName("谷度培训机构") ;

        Company c = new Company() ;
        c.setCompayName("广州分公叄1�7") ;
        c.setOrg(o ) ;
        Company c1 = new Company() ;
        c1.setCompayName("成都分公叄1�7") ;
        c1.setOrg(o) ;
        Company c2 = new Company() ;
        c2.setCompayName("天津分公叄1�7") ;
        c2.setOrg(o) ;
          
        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction() ;
        session.save(o) ;
        session.save(c) ;
        session.save(c1) ;
        session.save(c2) ;
        session.beginTransaction().commit();}
    
    @Test
    public void testLoad() {
        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction() ;
            
        Company c = (Company)session.load(Company.class,1) ;
        System.out.println(c.getCompayName()+"org:"+c.getOrg().getOrgName());           
        session.beginTransaction().commit() ;}
    
    @Test
    public void testDelete() {
        Session session = sessionFactory.getCurrentSession() ;
        session.beginTransaction() ;
        
        Company c = (Company) session.load(Company.class, 1) ;            
        session.delete(c) ;            
        session.beginTransaction().commit() ;}

}


*/