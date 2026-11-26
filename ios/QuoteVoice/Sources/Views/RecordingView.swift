import SwiftUI

public struct RecordingView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var storage: StorageManager
    @StateObject private var speech = SpeechManager()
    
    var onComplete: (Quote) -> Void
    
    @State private var phase: RecordingPhase = .recording
    @State private var displayedWords: [String] = []
    @State private var progress: Double = 0.0
    @State private var createdQuote: Quote?
    
    enum RecordingPhase {
        case recording
        case processing
    }
    
    let defaultTranscript = "Quote for John Miller, 4 hours labor at 120 an hour, plus 350 for copper piping and valves, add 10 percent tax."
    
    public init(onComplete: @escaping (Quote) -> Void) {
        self.onComplete = onComplete
    }
    
    public var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                
                // Top Indicator Pill
                HStack(spacing: 6) {
                    Circle()
                        .fill(phase == .recording ? Color.red : Color.indigo)
                        .frame(width: 8, height: 8)
                    
                    Text(phase == .recording ? "Listening..." : "AI Structuring...")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundColor(.primary)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(Color(uiColor: .secondarySystemBackground))
                .clipShape(Capsule())
                .padding(.top, 10)
                
                Spacer()
                
                if phase == .recording {
                    // PHASE 1: AUDIO WAVEFORM & LIVE TRANSCRIPTION
                    VStack(spacing: 16) {
                        // Soundwave Card
                        VStack(spacing: 12) {
                            HStack(spacing: 6) {
                                Image(systemName: "waveform")
                                    .foregroundColor(.blue)
                                Text("Speech Detected • 44.1 kHz")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                            }
                            
                            // 20 Animated Wave Bars
                            HStack(spacing: 4) {
                                ForEach(0..<20) { i in
                                    RoundedRectangle(cornerRadius: 2)
                                        .fill(
                                            LinearGradient(
                                                colors: [.blue, Color(red: 99/255, green: 102/255, blue: 241/255)],
                                                startPoint: .bottom,
                                                endPoint: .top
                                            )
                                        )
                                        .frame(width: 4, height: waveHeight(for: i))
                                        .animation(.easeInOut(duration: 0.25).repeatForever(autoreverses: true), value: displayedWords.count)
                                }
                            }
                            .frame(height: 70)
                        }
                        .padding(18)
                        .frame(maxWidth: .infinity)
                        .background(Color(uiColor: .secondarySystemGroupedBackground))
                        .cornerRadius(20)
                        .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 3)
                        
                        // Live Transcription Box
                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                HStack(spacing: 4) {
                                    Circle()
                                        .fill(Color.blue)
                                        .frame(width: 6, height: 6)
                                    Text("LIVE TRANSCRIPTION")
                                        .font(.system(size: 9.5, weight: .heavy))
                                        .foregroundColor(.blue)
                                }
                                Spacer()
                                Text("0:02")
                                    .font(.system(size: 10, design: .monospaced))
                                    .foregroundColor(.secondary)
                            }
                            
                            Text(wordsAttributedString)
                                .font(.system(size: 14, weight: .medium))
                                .lineSpacing(4)
                                .frame(minHeight: 65, alignment: .topLeading)
                        }
                        .padding(16)
                        .background(Color(uiColor: .secondarySystemGroupedBackground))
                        .cornerRadius(20)
                        .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 3)
                    }
                } else {
                    // PHASE 2: AI LINE ITEM EXTRACTION
                    VStack(spacing: 14) {
                        // Shimmering AI Banner
                        ZStack {
                            RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .fill(
                                    LinearGradient(
                                        colors: [Color.blue, Color(red: 99/255, green: 102/255, blue: 241/255)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                            
                            VStack(spacing: 10) {
                                HStack {
                                    HStack(spacing: 8) {
                                        Image(systemName: "sparkles")
                                            .font(.system(size: 16, weight: .bold))
                                            .foregroundColor(.yellow)
                                        
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text("Structuring line items...")
                                                .font(.system(size: 13, weight: .bold))
                                                .foregroundColor(.white)
                                            Text("AI Contractor Parser v2.4")
                                                .font(.system(size: 10))
                                                .foregroundColor(Color.white.opacity(0.8))
                                        }
                                    }
                                    Spacer()
                                    Text("\(Int(progress * 100))%")
                                        .font(.system(size: 12, weight: .bold, design: .monospaced))
                                        .foregroundColor(.white)
                                }
                                
                                GeometryReader { geo in
                                    ZStack(alignment: .leading) {
                                        Capsule()
                                            .fill(Color.white.opacity(0.25))
                                        Capsule()
                                            .fill(Color.green)
                                            .frame(width: geo.size.width * progress)
                                    }
                                }
                                .frame(height: 6)
                            }
                            .padding(14)
                        }
                        .frame(height: 80)
                        
                        // Extracted Items Checklist
                        VStack(spacing: 8) {
                            HStack {
                                Text("EXTRACTED LINE ITEMS")
                                    .font(.system(size: 9.5, weight: .bold))
                                    .foregroundColor(.secondary)
                                Spacer()
                            }
                            
                            ExtractedRow(icon: "person.fill", title: "Client", value: createdQuote?.clientName ?? "John Miller", color: .blue)
                            ExtractedRow(icon: "wrench.fill", title: "Labor", value: "4 hrs @ $120/hr ($480)", color: .green)
                            ExtractedRow(icon: "shippingbox.fill", title: "Materials", value: "Copper piping & valves ($350)", color: .purple)
                            ExtractedRow(icon: "percent", title: "Tax", value: "10% Sales Tax ($83)", color: .orange)
                        }
                        .padding(14)
                        .background(Color(uiColor: .secondarySystemGroupedBackground))
                        .cornerRadius(20)
                        .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 3)
                    }
                }
                
                Spacer()
                
                // Footer controls
                HStack {
                    Button("Cancel") {
                        dismiss()
                    }
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.secondary)
                    
                    Spacer()
                    
                    Button("Skip >") {
                        finishToQuote()
                    }
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.blue)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 12)
            }
            .padding(.horizontal, 16)
            .navigationTitle("Dictate Quote")
            .navigationBarTitleDisplayMode(.inline)
            .onAppear {
                startFlow()
            }
        }
    }
    
    private func waveHeight(for index: Int) -> CGFloat {
        let pattern: [CGFloat] = [18, 36, 60, 42, 65, 50, 30, 58, 68, 45, 62, 38, 55, 64, 32, 58, 48, 24, 52, 34]
        let base = pattern[index % pattern.count]
        return base
    }
    
    private var wordsAttributedString: AttributedString {
        var str = AttributedString()
        for (i, word) in displayedWords.enumerated() {
            var wordStr = AttributedString(word + " ")
            let lower = word.lowercased()
            if lower.contains("john") || lower.contains("miller") {
                wordStr.foregroundColor = .blue
                wordStr.font = .system(size: 14, weight: .bold)
            } else if lower.contains("labor") || lower.contains("120") || lower.contains("hours") {
                wordStr.foregroundColor = .green
                wordStr.font = .system(size: 14, weight: .bold)
            } else if lower.contains("copper") || lower.contains("piping") || lower.contains("350") {
                wordStr.foregroundColor = .purple
                wordStr.font = .system(size: 14, weight: .bold)
            } else if lower.contains("tax") || lower.contains("10") {
                wordStr.foregroundColor = .orange
                wordStr.font = .system(size: 14, weight: .bold)
            }
            str.append(wordStr)
        }
        return str
    }
    
    private func startFlow() {
        let allWords = defaultTranscript.components(separatedBy: " ")
        var idx = 0
        
        Timer.scheduledTimer(withTimeInterval: 0.09, repeats: true) { timer in
            if idx < allWords.count {
                displayedWords.append(allWords[idx])
                idx += 1
            } else {
                timer.invalidate()
                
                // Switch to AI phase after 2 seconds
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                    let parsed = TradeNLPParser.parse(text: defaultTranscript, defaultTaxRate: storage.profile.defaultTaxRate)
                    
                    self.createdQuote = Quote(
                        quoteNumber: "QV-\(Int.random(in: 1000...9999))",
                        clientName: parsed.clientName,
                        clientPhone: "+1 (555) 234-5678",
                        clientAddress: "742 Evergreen Terrace, Springfield",
                        jobTitle: parsed.jobTitle,
                        tradeType: parsed.tradeType,
                        items: parsed.items,
                        taxRate: parsed.taxRate
                    )
                    
                    withAnimation {
                        phase = .processing
                    }
                    
                    // 1.2s extraction progress
                    Timer.scheduledTimer(withTimeInterval: 0.03, repeats: true) { pTimer in
                        if progress < 1.0 {
                            progress += 0.035
                        } else {
                            pTimer.invalidate()
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                                finishToQuote()
                            }
                        }
                    }
                }
            }
        }
    }
    
    private func finishToQuote() {
        if let quote = createdQuote {
            storage.addOrUpdateQuote(quote)
            onComplete(quote)
        } else {
            let parsed = TradeNLPParser.parse(text: defaultTranscript)
            let quote = Quote(
                quoteNumber: "QV-\(Int.random(in: 1000...9999))",
                clientName: parsed.clientName,
                clientPhone: "+1 (555) 234-5678",
                clientAddress: "742 Evergreen Terrace, Springfield",
                jobTitle: parsed.jobTitle,
                tradeType: parsed.tradeType,
                items: parsed.items,
                taxRate: parsed.taxRate
            )
            storage.addOrUpdateQuote(quote)
            onComplete(quote)
        }
    }
}

struct ExtractedRow: View {
    let icon: String
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 12))
                .foregroundColor(color)
                .frame(width: 24, height: 24)
                .background(color.opacity(0.12))
                .clipShape(RoundedRectangle(cornerRadius: 6))
            
            Text(title)
                .font(.system(size: 12, weight: .bold))
                .foregroundColor(.primary)
            
            Spacer()
            
            Text(value)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(.secondary)
            
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 13))
                .foregroundColor(.green)
        }
        .padding(8)
        .background(Color(uiColor: .tertiarySystemGroupedBackground))
        .cornerRadius(10)
    }
}
