import Foundation
import SwiftUI

public enum QuoteStatus: String, Codable, CaseIterable, Hashable {
    case draft = "Draft"
    case sent = "Sent"
    case accepted = "Accepted"
    case paid = "Paid"
    
    public var badgeColor: Color {
        switch self {
        case .draft: return .gray
        case .sent: return .blue
        case .accepted: return .orange
        case .paid: return .green
        }
    }
}

public struct LineItem: Identifiable, Codable, Equatable, Hashable {
    public var id: String = UUID().uuidString
    public var type: String // "labor", "material", "fee"
    public var description: String
    public var details: String
    public var quantity: Double
    public var unitPrice: Double
    public var total: Double
    
    public init(id: String = UUID().uuidString, type: String = "labor", description: String, details: String = "", quantity: Double = 1.0, unitPrice: Double = 0.0) {
        self.id = id
        self.type = type
        self.description = description
        self.details = details
        self.quantity = quantity
        self.unitPrice = unitPrice
        self.total = quantity * unitPrice
    }
}

public struct Quote: Identifiable, Codable, Equatable, Hashable {
    public var id: String = UUID().uuidString
    public var quoteNumber: String
    public var date: String
    public var dueDate: String
    public var status: QuoteStatus
    
    public var clientName: String
    public var clientPhone: String
    public var clientAddress: String
    
    public var jobTitle: String
    public var tradeType: String // "electrical", "plumbing", "hvac", "general"
    
    public var items: [LineItem]
    public var subtotal: Double
    public var taxRate: Double
    public var taxAmount: Double
    public var total: Double
    
    public var paymentTerms: String
    public var notes: String
    
    public init(
        id: String = UUID().uuidString,
        quoteNumber: String,
        date: String = "Nov 26, 2026",
        dueDate: String = "Dec 26, 2026",
        status: QuoteStatus = .draft,
        clientName: String,
        clientPhone: String = "",
        clientAddress: String = "",
        jobTitle: String,
        tradeType: String = "general",
        items: [LineItem] = [],
        taxRate: Double = 0.10,
        paymentTerms: String = "Due upon receipt • Guaranteed for 30 days",
        notes: String = ""
    ) {
        self.id = id
        self.quoteNumber = quoteNumber
        self.date = date
        self.dueDate = dueDate
        self.status = status
        self.clientName = clientName
        self.clientPhone = clientPhone
        self.clientAddress = clientAddress
        self.jobTitle = jobTitle
        self.tradeType = tradeType
        self.items = items
        self.taxRate = taxRate
        self.paymentTerms = paymentTerms
        self.notes = notes
        
        let sub = items.reduce(0.0) { $0 + $1.total }
        self.subtotal = sub
        self.taxAmount = (sub * taxRate * 100).rounded() / 100
        self.total = ((sub + (sub * taxRate)) * 100).rounded() / 100
    }
}

public struct ContractorProfile: Codable, Equatable {
    public var businessName: String = "Mike's Electrical & HVAC"
    public var ownerName: String = "Mike Sterling"
    public var tradeSpecialty: String = "Licensed Electrical & HVAC Master"
    public var licenseNumber: String = "EC-9821 / HVAC-4402"
    public var phone: String = "+1 (555) 019-2834"
    public var email: String = "mike@apexcontracting.com"
    public var defaultHourlyRate: Double = 120.0
    public var defaultTaxRate: Double = 0.10
    public var defaultPaymentTerms: String = "Due upon receipt • Guaranteed for 30 days"
}

public struct Client: Identifiable, Codable {
    public var id: String = UUID().uuidString
    public var name: String
    public var phone: String
    public var address: String
    public var totalQuotes: Int
    public var totalRevenue: Double
}
