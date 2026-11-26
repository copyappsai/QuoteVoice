import SwiftUI

public struct QuoteEditView: View {
    @Environment(\.dismiss) var dismiss
    @State public var quote: Quote
    public var onSave: (Quote) -> Void
    
    @State private var clientName: String
    @State private var clientPhone: String
    @State private var clientAddress: String
    @State private var jobTitle: String
    @State private var taxRatePct: String
    @State private var items: [LineItem]
    
    public init(quote: Quote, onSave: @escaping (Quote) -> Void) {
        self.quote = quote
        self.onSave = onSave
        _clientName = State(initialValue: quote.clientName)
        _clientPhone = State(initialValue: quote.clientPhone)
        _clientAddress = State(initialValue: quote.clientAddress)
        _jobTitle = State(initialValue: quote.jobTitle)
        _taxRatePct = State(initialValue: String(format: "%.0f", quote.taxRate * 100))
        _items = State(initialValue: quote.items)
    }
    
    private var subtotal: Double {
        items.reduce(0.0) { $0 + ($1.quantity * $1.unitPrice) }
    }
    
    private var taxRate: Double {
        (Double(taxRatePct) ?? 10.0) / 100.0
    }
    
    private var taxAmount: Double {
        (subtotal * taxRate * 100).rounded() / 100
    }
    
    private var total: Double {
        ((subtotal + taxAmount) * 100).rounded() / 100
    }
    
    public var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Client & Job")) {
                    TextField("Client Name", text: $clientName)
                    TextField("Phone", text: $clientPhone)
                    TextField("Address", text: $clientAddress)
                    TextField("Job Title", text: $jobTitle)
                }
                
                Section(header: HStack {
                    Text("Line Items")
                    Spacer()
                    Button("+ Labor") {
                        items.append(LineItem(type: "labor", description: "Labor (1 hr)", details: "On-site installation", quantity: 1.0, unitPrice: 120.0))
                    }
                    Button("+ Parts") {
                        items.append(LineItem(type: "material", description: "Materials", details: "Standard supplies", quantity: 1.0, unitPrice: 50.0))
                    }
                }) {
                    ForEach($items) { $item in
                        VStack(alignment: .leading, spacing: 4) {
                            TextField("Description", text: $item.description)
                                .font(.system(size: 13, weight: .bold))
                            
                            HStack {
                                Text("Qty:")
                                    .font(.system(size: 11))
                                    .foregroundColor(.secondary)
                                TextField("1", value: $item.quantity, format: .number)
                                    .frame(width: 45)
                                    .textFieldStyle(.roundedBorder)
                                
                                Text("Rate ($):")
                                    .font(.system(size: 11))
                                    .foregroundColor(.secondary)
                                TextField("120", value: $item.unitPrice, format: .number)
                                    .frame(width: 65)
                                    .textFieldStyle(.roundedBorder)
                                
                                Spacer()
                                Text(String(format: "$%.2f", item.quantity * item.unitPrice))
                                    .font(.system(size: 12, weight: .bold, design: .rounded))
                            }
                        }
                    }
                    .onDelete { indices in
                        items.remove(atOffsets: indices)
                    }
                }
                
                Section(header: Text("Tax & Pricing")) {
                    HStack {
                        Text("Sales Tax Rate (%):")
                        Spacer()
                        TextField("10", text: $taxRatePct)
                            .frame(width: 50)
                            .multilineTextAlignment(.trailing)
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    HStack {
                        Text("Subtotal:")
                        Spacer()
                        Text(String(format: "$%.2f", subtotal))
                    }
                    HStack {
                        Text("Tax Amount:")
                        Spacer()
                        Text(String(format: "$%.2f", taxAmount))
                    }
                    HStack {
                        Text("Total:")
                            .font(.headline)
                        Spacer()
                        Text(String(format: "$%.2f", total))
                            .font(.headline)
                            .foregroundColor(.blue)
                    }
                }
            }
            .navigationTitle("Edit Quote")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        var updated = quote
                        updated.clientName = clientName
                        updated.clientPhone = clientPhone
                        updated.clientAddress = clientAddress
                        updated.jobTitle = jobTitle
                        updated.items = items
                        updated.taxRate = taxRate
                        updated.subtotal = subtotal
                        updated.taxAmount = taxAmount
                        updated.total = total
                        onSave(updated)
                        dismiss()
                    }
                    .fontWeight(.bold)
                }
            }
        }
    }
}
