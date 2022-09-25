namespace backend.Models;

public class Error {
    public string error { get; }
    public List<string> errors {get; set;} = new();
    public Error(string message) {
        this.error = message ;
    }
    public Error() {
        this.error = "";
    }

}