import Foundation

public struct ParsedTradeQuote {
    public var clientName: String
    public var jobTitle: String
    public var tradeType: String
    public var items: [LineItem]
    public var subtotal: Double
    public var taxRate: Double
    public var taxAmount: Double
    public var total: Double
}

public class TradeNLPParser {
    public static func parse(text: String, defaultTaxRate: Double = 0.10) -> ParsedTradeQuote {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        let lower = trimmed.lowercased()
        
        // 1. Client Name
        var clientName = "Valued Client"
        let namePattern = #"(?:quote|estimate|for|to)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)"#
        if let regex = try? NSRegularExpression(pattern: namePattern),
           let match = regex.firstMatch(in: trimmed, range: NSRange(trimmed.startIndex..., in: trimmed)),
           let nameRange = Range(match.range(at: 1), in: trimmed) {
            clientName = String(trimmed[nameRange])
        }
        
        // 2. Labor hours & rate
        var laborHours: Double = 4.0
        var laborRate: Double = 120.0
        let laborPattern = #"(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*(?:labor)?\s*(?:at|@)\s*(\d+(?:\.\d+)?)"#
        if let regex = try? NSRegularExpression(pattern: laborPattern, options: .caseInsensitive),
           let match = regex.firstMatch(in: trimmed, range: NSRange(trimmed.startIndex..., in: trimmed)),
           let hRange = Range(match.range(at: 1), in: trimmed),
           let rRange = Range(match.range(at: 2), in: trimmed) {
            laborHours = Double(trimmed[hRange]) ?? 4.0
            laborRate = Double(trimmed[rRange]) ?? 120.0
        }
        
        // 3. Materials cost & description
        var materialCost: Double = 350.0
        var materialDesc = "Materials (Copper piping & valves)"
        let matPattern = #"(?:plus|and|with|materials?|parts?)\s*(?:\$)?(\d+(?:\.\d+)?)\s*(?:for|in)\s+([^,.]+)"#
        if let regex = try? NSRegularExpression(pattern: matPattern, options: .caseInsensitive),
           let match = regex.firstMatch(in: trimmed, range: NSRange(trimmed.startIndex..., in: trimmed)),
           let costRange = Range(match.range(at: 1), in: trimmed),
           let descRange = Range(match.range(at: 2), in: trimmed) {
            materialCost = Double(trimmed[costRange]) ?? 350.0
            materialDesc = "Materials (\(trimmed[descRange].trimmingCharacters(in: .whitespaces)))"
        }
        
        // 4. Tax
        var taxRate = defaultTaxRate
        if lower.contains("no tax") || lower.contains("zero tax") {
            taxRate = 0.0
        } else {
            let taxPattern = #"(\d+(?:\.\d+)?)\s*(?:percent|%)\s*tax"#
            if let regex = try? NSRegularExpression(pattern: taxPattern, options: .caseInsensitive),
               let match = regex.firstMatch(in: trimmed, range: NSRange(trimmed.startIndex..., in: trimmed)),
               let rateRange = Range(match.range(at: 1), in: trimmed) {
                taxRate = (Double(trimmed[rateRange]) ?? 10.0) / 100.0
            }
        }
        
        // 5. Trade type
        var tradeType = "general"
        if lower.contains("pipe") || lower.contains("valve") || lower.contains("plumb") || lower.contains("drain") {
            tradeType = "plumbing"
        } else if lower.contains("panel") || lower.contains("wire") || lower.contains("breaker") || lower.contains("charger") || lower.contains("electric") {
            tradeType = "electrical"
        } else if lower.contains("heat") || lower.contains("ac") || lower.contains("hvac") || lower.contains("pump") {
            tradeType = "hvac"
        }
        
        // 6. Build Items
        let laborItem = LineItem(
            type: "labor",
            description: "Labor (\(String(format: "%.0f", laborHours)) hrs @ $\(String(format: "%.0f", laborRate))/hr)",
            details: "Licensed technician diagnostics & installation",
            quantity: laborHours,
            unitPrice: laborRate
        )
        
        let matItem = LineItem(
            type: "material",
            description: materialDesc,
            details: "Trade-grade supplies and fittings",
            quantity: 1.0,
            unitPrice: materialCost
        )
        
        let items = [laborItem, matItem]
        let subtotal = items.reduce(0.0) { $0 + $1.total }
        let taxAmount = (subtotal * taxRate * 100).rounded() / 100
        let total = ((subtotal + taxAmount) * 100).rounded() / 100
        
        return ParsedTradeQuote(
            clientName: clientName,
            jobTitle: "\(clientName) Service Installation",
            tradeType: tradeType,
            items: items,
            subtotal: subtotal,
            taxRate: taxRate,
            taxAmount: taxAmount,
            total: total
        )
    }
}
