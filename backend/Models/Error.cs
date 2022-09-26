namespace backend.Models;

public class Error {

    public List<string> errors {get; set;} = new();
    public Error(string message) {
        this.errors.Add(message);
    }
    public Error() {}

}