import SwiftUI

struct ReclaimedSummaryView: View {
    @EnvironmentObject var manager: StillnessManager
    @State private var showShareSheet = false

    var body: some View {
        VStack(spacing: 20) {
            
            Spacer()
            
            // Icon
            ZStack {
                Circle()
                    .fill(Color.white.opacity(0.08))
                    .frame(width: 80, height: 80)
                Image(systemName: "sparkles")
                    .font(.system(size: 36))
                    .foregroundColor(.white)
            }
            
            VStack(spacing: 6) {
                Text("Session Complete")
                    .font(.system(size: 28, weight: .heavy, design: .rounded))
                    .foregroundColor(.white)
                Text("You lived in the real world.")
                    .font(.system(size: 15, weight: .regular, design: .rounded))
                    .foregroundColor(Color(white: 0.6))
            }
            
            // Instagram / Apple Minimalist Certificate Card
            VStack(spacing: 18) {
                HStack {
                    Text("PRESENCE CERTIFICATE")
                        .font(.system(size: 10, weight: .bold, design: .rounded))
                        .tracking(1.5)
                        .foregroundColor(Color(white: 0.4))
                    Spacer()
                    Text("TODAY")
                        .font(.system(size: 10, weight: .bold, design: .rounded))
                        .foregroundColor(Color(white: 0.4))
                }
                
                let time = manager.formatTime(seconds: manager.currentSessionSeconds)
                
                VStack(spacing: 4) {
                    HStack(alignment: .firstTextBaseline, spacing: 2) {
                        Text(time.hours)
                        Text("h ")
                            .foregroundColor(Color(white: 0.5))
                            .font(.system(size: 22, weight: .bold))
                        Text(time.minutes)
                        Text("m")
                            .foregroundColor(Color(white: 0.5))
                            .font(.system(size: 22, weight: .bold))
                    }
                    .font(.system(size: 52, weight: .black, design: .rounded))
                    .foregroundColor(.white)
                    
                    Text("Uninterrupted Human Life")
                        .font(.system(size: 13, weight: .medium, design: .rounded))
                        .foregroundColor(Color(white: 0.6))
                }
                .padding(.vertical, 8)
                
                Divider()
                    .background(Color(white: 0.16))
                
                VStack(spacing: 10) {
                    HStack {
                        Text("Pickups Prevented")
                            .font(.system(size: 13, weight: .regular))
                            .foregroundColor(Color(white: 0.6))
                        Spacer()
                        Text("18 Impulses")
                            .font(.system(size: 13, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                    }
                    
                    HStack {
                        Text("Deep Calm Gain")
                            .font(.system(size: 13, weight: .regular))
                            .foregroundColor(Color(white: 0.6))
                        Spacer()
                        Text("+94% Focused")
                            .font(.system(size: 13, weight: .bold, design: .rounded))
                            .foregroundColor(.green)
                    }
                }
            }
            .padding(24)
            .background(
                RoundedRectangle(cornerRadius: 30, style: .continuous)
                    .fill(Color(white: 0.08))
                    .overlay(
                        RoundedRectangle(cornerRadius: 30, style: .continuous)
                            .stroke(Color(white: 0.16), lineWidth: 1)
                    )
            )
            .padding(.horizontal, 24)
            
            Spacer()
            
            // Actions
            VStack(spacing: 12) {
                Button(action: {
                    Haptics.success()
                    showShareSheet = true
                }) {
                    HStack(spacing: 8) {
                        Image(systemName: "square.and.arrow.up")
                            .font(.system(size: 15, weight: .bold))
                        Text("Share Presence Record")
                            .font(.system(size: 16, weight: .bold, design: .rounded))
                    }
                    .foregroundColor(.black)
                    .frame(maxWidth: .infinity)
                    .frame(height: 56)
                    .background(Color.white)
                    .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                }
                
                Button(action: {
                    manager.returnToDashboard()
                }) {
                    Text("Return to Dashboard")
                        .font(.system(size: 15, weight: .semibold, design: .rounded))
                        .foregroundColor(Color(white: 0.6))
                        .frame(maxWidth: .infinity)
                        .frame(height: 48)
                }
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 24)
        }
        .sheet(isPresented: $showShareSheet) {
            ShareSheet(activityItems: ["I spent \(manager.formatTime(seconds: manager.currentSessionSeconds).minutes) minutes present in the real world today using Stillness. 🕊️"])
        }
    }
}

struct ShareSheet: UIViewControllerRepresentable {
    let activityItems: [Any]
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
