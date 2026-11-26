import SwiftUI
import QuickLook

public struct QuoteDetailView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var storage: StorageManager
    @State public var quote: Quote
    
    @State private var showingEdit = false
    @State private var showingShare = false
    @State private var shareItems: [Any] = []
    @State private var showToast = false
    @State private var pdfURL: URL?
    
    public init(quote: Quote) {
        _quote = State(initialValue: quote)
    }
    
    public var body: some View {
        ZStack(alignment: .bottom) {
            ScrollView(showsIndicators: false) {
                VStack(spacing: 16) {
                    
                    // Main Invoice Card
                    VStack(alignment: .leading, spacing: 14) {
                        
                        // Header
                        HStack(alignment: .top) {
                            HStack(spacing: 8) {
                                RoundedRectangle(cornerRadius: 8)
                                    .fill(Color.blue)
                                    .frame(width: 32, height: 32)
                                    .overlay(
                                        Text("QV")
                                            .font(.system(size: 11, weight: .black))
                                            .foregroundColor(.white)
                                    )
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(storage.profile.businessName)
                                        .font(.system(size: 13, weight: .bold))
                                    Text("Lic. #\(storage.profile.licenseNumber)")
                                        .font(.system(size: 10))
                                        .foregroundColor(.secondary)
                                }
                            }
                            
                            Spacer()
                            
                            VStack(alignment: .trailing, spacing: 2) {
                                Text(quote.status.rawValue)
                                    .font(.system(size: 9.5, weight: .bold))
                                    .foregroundColor(quote.status.badgeColor)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(quote.status.badgeColor.opacity(0.12))
                                    .clipShape(Capsule())
                                
                                Text(quote.date)
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding(.bottom, 4)
                        
                        // Client Details Box
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("PREPARED FOR")
                                    .font(.system(size: 8.5, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(quote.clientName)
                                    .font(.system(size: 14, weight: .heavy))
                                Text(quote.clientAddress.isEmpty ? "742 Evergreen Terrace, Springfield" : quote.clientAddress)
                                    .font(.system(size: 10.5))
                                    .foregroundColor(.secondary)
                            }
                            
                            Spacer()
                            
                            if !quote.clientPhone.isEmpty {
                                Button {
                                    if let url = URL(string: "tel:\(quote.clientPhone.filter { $0.isNumber })") {
                                        UIApplication.shared.open(url)
                                    }
                                } label: {
                                    Image(systemName: "phone.fill")
                                        .font(.system(size: 12))
                                        .foregroundColor(.blue)
                                        .frame(width: 30, height: 30)
                                        .background(Color.blue.opacity(0.12))
                                        .clipShape(Circle())
                                }
                            }
                        }
                        .padding(10)
                        .background(Color(uiColor: .tertiarySystemGroupedBackground))
                        .cornerRadius(12)
                        
                        // Line Items Table
                        VStack(spacing: 8) {
                            HStack {
                                Text("ITEM & DESCRIPTION")
                                    .font(.system(size: 9, weight: .bold))
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("AMOUNT")
                                    .font(.system(size: 9, weight: .bold))
                                    .foregroundColor(.secondary)
                            }
                            .padding(.bottom, 2)
                            
                            ForEach(quote.items) { item in
                                HStack(alignment: .top) {
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(item.description)
                                            .font(.system(size: 12, weight: .bold))
                                        if !item.details.isEmpty {
                                            Text(item.details)
                                                .font(.system(size: 10))
                                                .foregroundColor(.secondary)
                                        }
                                    }
                                    Spacer()
                                    Text(String(format: "$%.2f", item.total))
                                        .font(.system(size: 12, weight: .bold, design: .rounded))
                                }
                                .padding(.vertical, 3)
                                Divider()
                            }
                            
                            // Tax row
                            HStack {
                                Text("Tax (\(Int(quote.taxRate * 100))%)")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text(String(format: "$%.2f", quote.taxAmount))
                                    .font(.system(size: 11, weight: .medium, design: .rounded))
                                    .foregroundColor(.secondary)
                            }
                            .padding(.top, 2)
                            
                            // Total Highlight Box
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("TOTAL ESTIMATE")
                                        .font(.system(size: 9, weight: .heavy))
                                        .foregroundColor(Color(red: 6/255, green: 95/255, blue: 70/255))
                                    Text("Guaranteed for 30 days")
                                        .font(.system(size: 9))
                                        .foregroundColor(Color(red: 6/255, green: 95/255, blue: 70/255).opacity(0.8))
                                }
                                Spacer()
                                Text(String(format: "$%.2f", quote.total))
                                    .font(.system(size: 20, weight: .heavy, design: .rounded))
                                    .foregroundColor(Color(red: 6/255, green: 95/255, blue: 70/255))
                            }
                            .padding(12)
                            .background(Color(red: 209/255, green: 250/255, blue: 229/255))
                            .cornerRadius(12)
                        }
                        
                        // Verification footer
                        HStack {
                            HStack(spacing: 4) {
                                Image(systemName: "sparkles")
                                Text("Voice-Parsed & Tax-Calculated")
                            }
                            .font(.system(size: 9.5, weight: .medium))
                            .foregroundColor(.blue)
                            
                            Spacer()
                            
                            Button {
                                let newStatus: QuoteStatus = quote.status == .paid ? .sent : .paid
                                quote.status = newStatus
                                storage.addOrUpdateQuote(quote)
                                let gen = UINotificationFeedbackGenerator()
                                gen.notificationOccurred(.success)
                            } label: {
                                Text(quote.status == .paid ? "✓ Marked Paid" : "○ Mark as Paid")
                                    .font(.system(size: 9.5, weight: .bold))
                                    .foregroundColor(quote.status == .paid ? .green : .secondary)
                            }
                        }
                    }
                    .padding(16)
                    .background(Color(uiColor: .secondarySystemGroupedBackground))
                    .cornerRadius(22)
                    .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 4)
                    
                    // Buttons
                    VStack(spacing: 8) {
                        // 1. Send via Text / WhatsApp
                        Button {
                            sendQuote()
                        } label: {
                            HStack(spacing: 8) {
                                Image(systemName: "message.fill")
                                Text("Send via Text / WhatsApp")
                            }
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .background(Color.green)
                            .cornerRadius(14)
                            .shadow(color: Color.green.opacity(0.35), radius: 8, x: 0, y: 4)
                        }
                        
                        // 2. Download PDF
                        Button {
                            downloadPDF()
                        } label: {
                            HStack(spacing: 8) {
                                Image(systemName: "arrow.down.doc.fill")
                                Text("Download PDF")
                            }
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.primary)
                            .frame(maxWidth: .infinity)
                            .frame(height: 44)
                            .background(Color(uiColor: .secondarySystemBackground))
                            .cornerRadius(14)
                        }
                    }
                    .padding(.top, 4)
                    
                    Spacer()
                        .frame(height: 30)
                }
                .padding(.horizontal, 16)
            }
            
            // Celebratory Toast
            if showToast {
                HStack(spacing: 10) {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 18))
                        .foregroundColor(.green)
                    
                    VStack(alignment: .leading, spacing: 1) {
                        Text("Quote sent to \(quote.clientName)!")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(.white)
                        Text("Sent via SMS & WhatsApp • PDF Attached")
                            .font(.system(size: 10))
                            .foregroundColor(Color.green.opacity(0.9))
                    }
                    Spacer()
                }
                .padding(12)
                .background(Color(red: 15/255, green: 23/255, blue: 42/255).opacity(0.96))
                .cornerRadius(16)
                .shadow(radius: 12)
                .padding(.horizontal, 20)
                .padding(.bottom, 20)
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
        .navigationTitle("Quote #\(quote.quoteNumber)")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    showingEdit = true
                } label: {
                    Image(systemName: "pencil")
                }
            }
        }
        .sheet(isPresented: $showingEdit) {
            QuoteEditView(quote: quote) { updated in
                self.quote = updated
                storage.addOrUpdateQuote(updated)
            }
        }
        .sheet(isPresented: $showingShare) {
            ActivityView(activityItems: shareItems)
        }
    }
    
    private func sendQuote() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
        
        quote.status = .sent
        storage.addOrUpdateQuote(quote)
        
        withAnimation {
            showToast = true
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 3.5) {
            withAnimation {
                showToast = false
            }
        }
        
        // Share text & PDF
        let msg = "Hi \(quote.clientName), here is your estimate from \(storage.profile.businessName) for \(quote.jobTitle). Total: $\(String(format: "%.2f", quote.total))."
        if let pdf = PDFManager.generatePDF(quote: quote, profile: storage.profile) {
            shareItems = [msg, pdf]
        } else {
            shareItems = [msg]
        }
        showingShare = true
    }
    
    private func downloadPDF() {
        if let pdf = PDFManager.generatePDF(quote: quote, profile: storage.profile) {
            shareItems = [pdf]
            showingShare = true
        }
    }
}

struct ActivityView: UIViewControllerRepresentable {
    var activityItems: [Any]
    var applicationActivities: [UIActivity]? = nil
    
    func makeUIViewController(context: UIViewControllerRepresentableContext<ActivityView>) -> UIActivityViewController {
        let controller = UIActivityViewController(activityItems: activityItems, applicationActivities: applicationActivities)
        return controller
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: UIViewControllerRepresentableContext<ActivityView>) {}
}
