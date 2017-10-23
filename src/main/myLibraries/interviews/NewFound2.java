package interviews;

public class NewFound2 {

	public static void main(String[] args) {

		NewFound2 newFound2 = new NewFound2();

		int A[] = {1, 1, 0, 1, 0, 0, 1, 1};
		
		System.out.println(newFound2.solution(A));
	}
	
	
public int solution(int[] A) {
        
        // 1. Loop Through The Array A
        int adjacency = 0;
        boolean reversed = false;
        for(int i=0; i<A.length-1; i++) {
            
            // 2. Reverse Once
            if(i<A.length-2) {
                if(A[i] != A[i+1] && A[i] ==A[i+2] && !reversed) {
                    A[i+1]=A[i];   
                    reversed = true;
                }
            } else {
            
                if (A[i] !=A[i+1] && !reversed) {
                    A[i+1]=A[i];   
                    reversed = true;   
                }
            }
            // 3. Count Max Adjacency
            if(A[i] == A[i+1])
                adjacency++;
        }
        
        return adjacency;
        
    }

	
}
