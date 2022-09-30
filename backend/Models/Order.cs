using System.Collections;

namespace backend.Models;

public record CartItem {
    public Guid sku { get; set; }
    public int quantity { get; set; }
    public double price { get; set; }
}

public record Order {
    public List<CartItem> items { get; set; } = new();
    public double total { get; set; }
}

public class OrderError {
    public Dictionary<Guid, List<string>> errorList { get; private set; } = new();
    public int errorCount { get; private set; } = 0;

    public void AddError(Guid guid, string message) {

        try {
            errorList[guid].Add(message);
        }
        catch (KeyNotFoundException) {
            errorList[guid] = new List<string> { message };
        }
        errorCount++;
    }
}
