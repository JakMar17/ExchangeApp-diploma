package si.fri.jakmar.backend.exchangeapp.services.exceptions;

/**
 * thrown when data is in some sort invalid
 */
public class DataInvalidException extends Exception{
    public DataInvalidException(String message) {
        super(message);
    }
}