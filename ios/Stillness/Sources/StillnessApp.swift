import SwiftUI

@main
struct StillnessApp: App {
    @StateObject private var manager = StillnessManager()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(manager)
                .preferredColorScheme(.dark)
        }
    }
}
