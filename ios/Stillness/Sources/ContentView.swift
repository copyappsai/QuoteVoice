import SwiftUI

struct ContentView: View {
    @EnvironmentObject var manager: StillnessManager
    @State private var showSettings = false

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            // Subtle ambient background light
            RadialGradient(
                gradient: Gradient(colors: [
                    Color(white: 0.12).opacity(0.4),
                    Color.black
                ]),
                center: .top,
                startRadius: 20,
                endRadius: 400
            )
            .ignoresSafeArea()

            Group {
                switch manager.currentScreen {
                case .dashboard:
                    DashboardView(onOpenSettings: { showSettings = true })
                        .transition(.asymmetric(
                            insertion: .opacity.combined(with: .scale(scale: 0.98)),
                            removal: .opacity.combined(with: .scale(scale: 1.02))
                        ))
                case .session:
                    SessionView()
                        .transition(.opacity)
                case .summary:
                    ReclaimedSummaryView()
                        .transition(.asymmetric(
                            insertion: .move(edge: .bottom).combined(with: .opacity),
                            removal: .opacity
                        ))
                }
            }
            .animation(.easeInOut(duration: 0.35), value: manager.currentScreen)
        }
        .sheet(isPresented: $showSettings) {
            SettingsSheet()
        }
    }
}
