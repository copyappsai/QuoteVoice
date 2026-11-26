import SwiftUI

public struct HomeView: View {
    @EnvironmentObject var storage: StorageManager
    @State private var selectedFilter: String = "All"
    @State private var showingRecording = false
    @State private var showingClients = false
    @State private var showingSettings = false
    @State private var selectedQuote: Quote?
    
    let filters = ["All", "Paid", "Pending", "Draft"]
    
    public init() {}
    
    public var filteredQuotes: [Quote] {
        storage.quotes.filter { quote in
            if selectedFilter == "All" { return true }
            if selectedFilter == "Pending" { return quote.status == .sent || quote.status == .draft }
            return quote.status.rawValue == selectedFilter
        }
    }
    
    public var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                ScrollView(showsIndicators: false) {
                    VStack(alignment: .leading, spacing: 16) {
                        
                        // 1. Top Bar
                        HStack(spacing: 12) {
                            ZStack(alignment: .bottomTrailing) {
                                Circle()
                                    .fill(LinearGradient(colors: [.blue, .indigo], startPoint: .topLeading, endPoint: .bottomTrailing))
                                    .frame(width: 42, height: 42)
                                    .overlay(
                                        Text(String(storage.profile.ownerName.prefix(1)))
                                            .font(.system(size: 16, weight: .bold))
                                            .foregroundColor(.white)
                                    )
                                
                                Circle()
                                    .fill(Color.green)
                                    .frame(width: 12, height: 12)
                                    .overlay(Circle().stroke(Color(uiColor: .systemBackground), lineWidth: 2))
                            }
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("⚡ \(storage.profile.businessName)")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.blue)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.blue.opacity(0.12))
                                    .cornerRadius(4)
                                
                                Text("Hey \(storage.profile.ownerName.components(separatedBy: " ").first ?? "Mike") 👋")
                                    .font(.system(size: 19, weight: .heavy))
                                    .foregroundColor(.primary)
                            }
                            
                            Spacer()
                            
                            HStack(spacing: 8) {
                                Button {
                                    showingClients = true
                                } label: {
                                    Image(systemName: "person.2.fill")
                                        .font(.system(size: 14))
                                        .foregroundColor(.secondary)
                                        .frame(width: 36, height: 36)
                                        .background(Color(uiColor: .secondarySystemBackground))
                                        .clipShape(Circle())
                                }
                                
                                Button {
                                    showingSettings = true
                                } label: {
                                    Image(systemName: "gearshape.fill")
                                        .font(.system(size: 14))
                                        .foregroundColor(.secondary)
                                        .frame(width: 36, height: 36)
                                        .background(Color(uiColor: .secondarySystemBackground))
                                        .clipShape(Circle())
                                }
                            }
                        }
                        .padding(.top, 4)
                        
                        // 2. Monthly Revenue Card
                        ZStack {
                            RoundedRectangle(cornerRadius: 22, style: .continuous)
                                .fill(
                                    LinearGradient(
                                        colors: [Color(red: 30/255, green: 58/255, blue: 138/255), Color(red: 37/255, green: 99/255, blue: 235/255)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .shadow(color: Color.blue.opacity(0.3), radius: 15, x: 0, y: 8)
                            
                            VStack(alignment: .leading, spacing: 14) {
                                HStack {
                                    Text("November Sent")
                                        .font(.system(size: 12, weight: .medium))
                                        .foregroundColor(Color.white.opacity(0.85))
                                    
                                    Spacer()
                                    
                                    HStack(spacing: 4) {
                                        Image(systemName: "arrow.up.right")
                                        Text("+24.8%")
                                    }
                                    .font(.system(size: 11, weight: .bold))
                                    .foregroundColor(Color(red: 110/255, green: 231/255, blue: 183/255))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(Color.white.opacity(0.18))
                                    .clipShape(Capsule())
                                }
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    HStack(alignment: .firstTextBaseline, spacing: 4) {
                                        Text("$\(String(format: "%.0f", storage.totalRevenue))")
                                            .font(.system(size: 32, weight: .heavy, design: .rounded))
                                            .foregroundColor(.white)
                                        
                                        Text("USD")
                                            .font(.system(size: 13, weight: .medium))
                                            .foregroundColor(Color.white.opacity(0.8))
                                    }
                                    
                                    Text("Sent this month")
                                        .font(.system(size: 12, weight: .medium))
                                        .foregroundColor(Color.white.opacity(0.85))
                                }
                                
                                Divider()
                                    .background(Color.white.opacity(0.2))
                                
                                HStack {
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Total Quotes")
                                            .font(.system(size: 10, weight: .medium))
                                            .foregroundColor(Color.white.opacity(0.7))
                                        Text("\(storage.quotes.count) sent")
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(.white)
                                    }
                                    Spacer()
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Win Rate")
                                            .font(.system(size: 10, weight: .medium))
                                            .foregroundColor(Color.white.opacity(0.7))
                                        Text("\(storage.winRate)%")
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(Color(red: 110/255, green: 231/255, blue: 183/255))
                                    }
                                    Spacer()
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Avg Turnaround")
                                            .font(.system(size: 10, weight: .medium))
                                            .foregroundColor(Color.white.opacity(0.7))
                                        Text("38 sec")
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(.white)
                                    }
                                }
                            }
                            .padding(18)
                        }
                        
                        // 3. Filter Tabs
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 8) {
                                ForEach(filters, id: \.self) { filter in
                                    Button {
                                        let generator = UIImpactFeedbackGenerator(style: .light)
                                        generator.impactOccurred()
                                        selectedFilter = filter
                                    } label: {
                                        Text(filter)
                                            .font(.system(size: 12, weight: .bold))
                                            .foregroundColor(selectedFilter == filter ? .white : .primary)
                                            .padding(.horizontal, 14)
                                            .padding(.vertical, 7)
                                            .background(
                                                selectedFilter == filter
                                                ? Color(uiColor: .label)
                                                : Color(uiColor: .secondarySystemBackground)
                                            )
                                            .clipShape(Capsule())
                                    }
                                }
                            }
                        }
                        
                        // 4. Recent Quotes Section
                        HStack {
                            Text("Recent Quotes")
                                .font(.system(size: 14, weight: .bold))
                            
                            Text("\(filteredQuotes.count)")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.secondary)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Color(uiColor: .tertiarySystemBackground))
                                .clipShape(Capsule())
                            
                            Spacer()
                        }
                        .padding(.top, 4)
                        
                        // Quotes List
                        VStack(spacing: 10) {
                            ForEach(filteredQuotes) { quote in
                                NavigationLink {
                                    QuoteDetailView(quote: quote)
                                } label: {
                                    HStack(spacing: 12) {
                                        Image(systemName: iconForTrade(quote.tradeType))
                                            .font(.system(size: 15, weight: .bold))
                                            .foregroundColor(colorForTrade(quote.tradeType))
                                            .frame(width: 38, height: 38)
                                            .background(colorForTrade(quote.tradeType).opacity(0.12))
                                            .clipShape(RoundedRectangle(cornerRadius: 10))
                                        
                                        VStack(alignment: .leading, spacing: 3) {
                                            HStack(spacing: 6) {
                                                Text(quote.clientName)
                                                    .font(.system(size: 13, weight: .bold))
                                                    .foregroundColor(.primary)
                                                
                                                Text(quote.status.rawValue)
                                                    .font(.system(size: 9, weight: .bold))
                                                    .foregroundColor(quote.status.badgeColor)
                                                    .padding(.horizontal, 5)
                                                    .padding(.vertical, 2)
                                                    .background(quote.status.badgeColor.opacity(0.12))
                                                    .clipShape(RoundedRectangle(cornerRadius: 4))
                                            }
                                            
                                            Text(quote.jobTitle)
                                                .font(.system(size: 11))
                                                .foregroundColor(.secondary)
                                                .lineLimit(1)
                                        }
                                        
                                        Spacer()
                                        
                                        VStack(alignment: .trailing, spacing: 2) {
                                            Text("$\(String(format: "%.0f", quote.total))")
                                                .font(.system(size: 13, weight: .heavy, design: .rounded))
                                                .foregroundColor(.primary)
                                            
                                            Text(quote.date)
                                                .font(.system(size: 10))
                                                .foregroundColor(.secondary)
                                        }
                                    }
                                    .padding(12)
                                    .background(Color(uiColor: .secondarySystemGroupedBackground))
                                    .cornerRadius(16)
                                    .shadow(color: Color.black.opacity(0.03), radius: 5, x: 0, y: 2)
                                }
                            }
                        }
                        
                        // Space for floating mic
                        Spacer()
                            .frame(height: 100)
                    }
                    .padding(.horizontal, 16)
                }
                
                // 5. Floating Glowing Blue Microphone Dock
                VStack(spacing: 6) {
                    Text("Hold to Speak Quote")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(.primary)
                    
                    Button {
                        let generator = UIImpactFeedbackGenerator(style: .medium)
                        generator.impactOccurred()
                        showingRecording = true
                    } label: {
                        ZStack {
                            Circle()
                                .fill(Color.blue.opacity(0.25))
                                .frame(width: 82, height: 82)
                            
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [Color.blue, Color(red: 79/255, green: 70/255, blue: 229/255)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 66, height: 66)
                                .shadow(color: Color.blue.opacity(0.55), radius: 14, x: 0, y: 6)
                            
                            Image(systemName: "mic.fill")
                                .font(.system(size: 26, weight: .semibold))
                                .foregroundColor(.white)
                        }
                    }
                    
                    Text("e.g. 'Quote for John Miller, 4 hours labor at 120...'")
                        .font(.system(size: 9.5))
                        .foregroundColor(.secondary)
                }
                .padding(.bottom, 8)
            }
            .navigationBarHidden(true)
            .sheet(isPresented: $showingRecording) {
                RecordingView { createdQuote in
                    showingRecording = false
                    selectedQuote = createdQuote
                }
            }
            .sheet(isPresented: $showingClients) {
                ClientsView()
            }
            .sheet(isPresented: $showingSettings) {
                SettingsView()
            }
            .navigationDestination(item: $selectedQuote) { quote in
                QuoteDetailView(quote: quote)
            }
        }
    }
    
    private func iconForTrade(_ trade: String) -> String {
        switch trade.lowercased() {
        case "electrical": return "bolt.fill"
        case "plumbing": return "wrench.adjustable.fill"
        case "hvac": return "flame.fill"
        default: return "hammer.fill"
        }
    }
    
    private func colorForTrade(_ trade: String) -> Color {
        switch trade.lowercased() {
        case "electrical": return .orange
        case "plumbing": return .blue
        case "hvac": return .red
        default: return .indigo
        }
    }
}
