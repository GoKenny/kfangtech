package Exception;

public class SelfDefineException extends Exception{

	private static final long serialVersionUID = -8762558216313139477L;

	public SelfDefineException(){
		super("Something Causes Exception");
	}

}
