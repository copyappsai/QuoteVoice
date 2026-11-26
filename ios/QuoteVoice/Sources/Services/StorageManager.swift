import Foundation
import SwiftUI

@MainActor
public class StorageManager: ObservableObject {
    public static let shared = StorageManager()
    
    @Published public var quotes: [Quote] = []
    @Published public var profile: ContractorProfile = ContractorProfile()
    @Published public var clients: [Client] = []
    
    private let quotesKey = "quotevoice_ios_quotes"
    private let profileKey = "quotevoice_ios_profile"
    
    public init() {
        loadData()
    }
    
    public func loadData() {
        // Load Profile
        if let data = UserDefaults.standard.data(forKey: profileKey),
           let savedProfile = try? JSONDecoder().decode(ContractorProfile.self, from: data) {
            self.profile = savedProfile
        }
        
        // Load Quotes
        if let data = UserDefaults.standard.data(forKey: quotesKey),
           let savedQuotes = try? JSONDecoder().decode([Quote].self, from: data) {
            self.quotes = savedQuotes
        } else {
            // Default sample quotes
            self.quotes = [
                Quote(
                    quoteNumber: "QV-1089",
                    date: "Nov 26, 2026",
                    dueDate: "Dec 26, 2026",
                    status: .draft,
                    clientName: "John Miller",
                    clientPhone: "+1 (555) 234-5678",
                    clientAddress: "742 Evergreen Terrace, Springfield",
                    jobTitle: "Copper Piping & Shutoff Valves",
                    tradeType: "plumbing",
                    items: [
                        LineItem(type: "labor", description: "Labor (4 hrs @ $120/hr)", details: "Licensed journeyman diagnostics & copper installation", quantity: 4.0, unitPrice: 120.0),
                        LineItem(type: "material", description: "Materials (Copper piping & valves)", details: "Grade-L 3/4\" copper pipe, brass ball shutoff valves", quantity: 1.0, unitPrice: 350.0)
                    ],
                    taxRate: 0.10
                ),
                Quote(
                    quoteNumber: "QV-1088",
                    date: "Nov 26, 2026",
                    dueDate: "Dec 26, 2026",
                    status: .paid,
                    clientName: "Sarah Jenkins",
                    clientPhone: "+1 (555) 345-6789",
                    clientAddress: "1240 Oak Ridge Road",
                    jobTitle: "Main Panel Upgrade 200A",
                    tradeType: "electrical",
                    items: [
                        LineItem(type: "labor", description: "Panel Swap & Breaker Installation (8 hrs)", quantity: 8.0, unitPrice: 130.0),
                        LineItem(type: "material", description: "Square D 200A Main Breaker Panel", quantity: 1.0, unitPrice: 650.0)
                    ],
                    taxRate: 0.10
                ),
                Quote(
                    quoteNumber: "QV-1087",
                    date: "Nov 26, 2026",
                    dueDate: "Dec 10, 2026",
                    status: .sent,
                    clientName: "Dave Roberts",
                    clientPhone: "+1 (555) 456-7890",
                    clientAddress: "55 Birchwood Blvd",
                    jobTitle: "Heat Pump Diagnostics",
                    tradeType: "hvac",
                    items: [
                        LineItem(type: "labor", description: "Diagnostic & ECM Motor Swap (2 hrs)", quantity: 2.0, unitPrice: 120.0),
                        LineItem(type: "material", description: "1/2 HP Variable ECM Motor Module", quantity: 1.0, unitPrice: 150.0)
                    ],
                    taxRate: 0.10
                ),
                Quote(
                    quoteNumber: "QV-1086",
                    date: "Nov 25, 2026",
                    dueDate: "Dec 25, 2026",
                    status: .paid,
                    clientName: "Marcus Vance",
                    clientPhone: "+1 (555) 567-8901",
                    clientAddress: "883 Sunset Way",
                    jobTitle: "Tesla Wall Connector EV Charger",
                    tradeType: "electrical",
                    items: [
                        LineItem(type: "labor", description: "Level 2 EV Charger Wire Run (5 hrs)", quantity: 5.0, unitPrice: 120.0),
                        LineItem(type: "material", description: "60A Breaker, 6/3 NM-B Wire, Conduit", quantity: 1.0, unitPrice: 500.0)
                    ],
                    taxRate: 0.10
                )
            ]
            saveQuotes()
        }
        
        syncClients()
    }
    
    public func saveQuotes() {
        if let encoded = try? JSONEncoder().encode(quotes) {
            UserDefaults.standard.set(encoded, forKey: quotesKey)
        }
        syncClients()
    }
    
    public func saveProfile(_ newProfile: ContractorProfile) {
        self.profile = newProfile
        if let encoded = try? JSONEncoder().encode(newProfile) {
            UserDefaults.standard.set(encoded, forKey: profileKey)
        }
    }
    
    public func addOrUpdateQuote(_ quote: Quote) {
        if let idx = quotes.firstIndex(where: { $0.id == quote.id }) {
            quotes[idx] = quote
        } else {
            quotes.insert(quote, at: 0)
        }
        saveQuotes()
    }
    
    public func updateQuoteStatus(_ id: String, status: QuoteStatus) {
        if let idx = quotes.firstIndex(where: { $0.id == id }) {
            quotes[idx].status = status
            saveQuotes()
        }
    }
    
    public func deleteQuote(_ id: String) {
        quotes.removeAll { $0.id == id }
        saveQuotes()
    }
    
    private func syncClients() {
        var map: [String: Client] = [:]
        for q in quotes {
            let name = q.clientName.trimmingCharacters(in: .whitespaces)
            guard !name.isEmpty else { continue }
            if var client = map[name] {
                client.totalQuotes += 1
                client.totalRevenue += q.total
                map[name] = client
            } else {
                map[name] = Client(
                    name: q.clientName,
                    phone: q.clientPhone.isEmpty ? "+1 (555) 000-0000" : q.clientPhone,
                    address: q.clientAddress.isEmpty ? "Springfield" : q.clientAddress,
                    totalQuotes: 1,
                    totalRevenue: q.total
                )
            }
        }
        self.clients = Array(map.values).sorted { $0.name < $1.name }
    }
    
    public var totalRevenue: Double {
        quotes.reduce(0.0) { $0 + $1.total }
    }
    
    public var winRate: Int {
        guard !quotes.isEmpty else { return 0 }
        let accepted = quotes.filter { $0.status == .accepted || $0.status == .paid }.count
        return Int((Double(accepted) / Double(quotes.count)) * 100)
    }
}
