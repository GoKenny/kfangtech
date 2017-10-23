package Vector;

import java.util.Enumeration;
import java.util.Vector;

class MyVector {

	public static void main(String args[]) {

		Vector<String> vector = new Vector<String>();
		vector.add("Lebron");
		vector.add("Jame");
		vector.add("Dwayne");
		vector.add("Wade");
		vector.add("Kuinai");
		vector.add("Fang");

		for (String string : vector)
			System.out.println(string);

	}
}

// Vector<Number> v = new Vector<Number> (3, 2);
// System.out.println("Initial size: " + v.size());
// System.out.println("Initial capacity: " + v.capacity());
//
// v.add(new Integer(1));
// v.add(new Integer(2));
// v.addElement(new Integer(3));
// v.addElement(new Integer(4));
// System.out.println("\nCapacity after four additions: " + v.capacity());
//
// v.addElement(new Double(5.45));
// v.addElement(new Double(6.08));
// v.addElement(new Integer(7));
// System.out.println("\nCurrent capacity: " + v.capacity());
//
// v.addElement(new Float(9.4));
// v.addElement(new Integer(10));
// System.out.println("\nCurrent capacity: " + v.capacity());
//
// System.out.println("First element: " + (Integer) v.firstElement());
// System.out.println("Last element: " + (Integer) v.lastElement());
//
// if (v.contains(new Integer(3)))
// System.out.println("Vector contains 3.");
//
// // enumerate the elements in the vector.
// Enumeration<Number> enumeration = v.elements();
// System.out.println("\nElements in vector:");
// while (enumeration.hasMoreElements())
// System.out.print(enumeration.nextElement() + " ");
//
// System.out.println("\n");
// System.out.println(v.get(5));
