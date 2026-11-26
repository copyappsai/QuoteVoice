import SwiftUI

@main
struct QuoteVoiceApp: App {
    @StateObject private var storage = StorageManager.shared
    
    var body: some Scene {
        WindowGroup {
            HomeView()
                .environmentObject(storage)
        }
    }
}
