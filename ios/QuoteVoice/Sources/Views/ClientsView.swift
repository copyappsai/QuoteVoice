import SwiftUI

public struct ClientsView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var storage: StorageManager
    @State private var search = ""
    
    public init() {}
    
    var filtered: [Client] {
        if search.isEmpty { return storage.clients }
        return storage.clients.filter {
            $0.name.localizedCaseInsensitiveContains(search) ||
            $0.address.localizedCaseInsensitiveContains(search) ||
            $0.phone.contains(search)
        }
    }
    
    public var body: some View {
        NavigationStack {
            List(filtered) { client in
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(client.name)
                                .font(.system(size: 14, weight: .bold))
                            Text(client.address)
                                .font(.system(size: 11))
                                .foregroundColor(.secondary)
                        }
                        
                        Spacer()
                        
                        VStack(alignment: .trailing, spacing: 2) {
                            Text("$\(String(format: "%.0f", client.totalRevenue))")
                                .font(.system(size: 14, weight: .bold, design: .rounded))
                            Text("\(client.totalQuotes) quote(s)")
                                .font(.system(size: 10))
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    HStack(spacing: 8) {
                        if let url = URL(string: "tel:\(client.phone.filter { $0.isNumber })") {
                            Link(destination: url) {
                                Label("Call", systemImage: "phone.fill")
                                    .font(.system(size: 10, weight: .bold))
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 4)
                                    .background(Color.blue.opacity(0.12))
                                    .foregroundColor(.blue)
                                    .clipShape(Capsule())
                            }
                        }
                    }
                    .padding(.top, 2)
                }
                .padding(.vertical, 4)
            }
            .searchable(text: $search, prompt: "Search clients...")
            .navigationTitle("Clients")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}
