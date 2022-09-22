namespace backend.Models;

public class Error {
    public string error { get; }
    public Error(string message) {
        this.error = message;
    }

}