package si.fri.jakmar.backend.exchangeapp.services.exceptions;

/**
 * thrown when UserEntity is unauthorized to edit/view/access given data
 */
public class AccessUnauthorizedException extends Exception {
    public AccessUnauthorizedException(String message) {
        super(message);
    }
}
