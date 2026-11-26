import Foundation
import SwiftUI
import Combine

enum StillnessScreen {
    case dashboard
    case session
    case summary
}

class StillnessManager: ObservableObject {
    @Published var currentScreen: StillnessScreen = .dashboard
    
    // Total seconds phone has been untouched today
    @Published var totalUntouchedSecondsToday: Int = 16080 // 4h 28m default
    
    // Active session seconds
    @Published var currentSessionSeconds: Int = 0
    @Published var isSessionActive: Bool = false
    
    // Stats
    @Published var currentStreakDays: Int = 7
    @Published var pickupsPreventedToday: Int = 18
    @Published var pagesReadToday: Int = 42
    
    // Settings
    @Published var flipToUnplugEnabled: Bool = true
    @Published var hapticsEnabled: Bool = true
    @Published var ambientGlowEnabled: Bool = true
    
    private var timer: AnyCancellable?
    
    init() {
        loadData()
    }
    
    func startSession() {
        Haptics.tap()
        currentSessionSeconds = 0
        isSessionActive = true
        currentScreen = .session
        
        timer = Timer.publish(every: 1.0, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] _ in
                guard let self = self else { return }
                self.currentSessionSeconds += 1
                self.totalUntouchedSecondsToday += 1
                
                // Every 15 minutes untouched = +1 page read reclaimed
                if self.currentSessionSeconds % 900 == 0 {
                    self.pagesReadToday += 1
                }
            }
    }
    
    func endSession() {
        Haptics.success()
        timer?.cancel()
        timer = nil
        isSessionActive = false
        currentScreen = .summary
        saveData()
    }
    
    func returnToDashboard() {
        Haptics.tap()
        currentScreen = .dashboard
    }
    
    func formatTime(seconds: Int) -> (hours: String, minutes: String, seconds: String) {
        let hrs = seconds / 3600
        let mins = (seconds % 3600) / 60
        let secs = seconds % 60
        return (
            String(format: "%02d", hrs),
            String(format: "%02d", mins),
            String(format: "%02d", secs)
        )
    }
    
    private func loadData() {
        let defaults = UserDefaults.standard
        if defaults.object(forKey: "totalUntouchedSeconds") != nil {
            totalUntouchedSecondsToday = defaults.integer(forKey: "totalUntouchedSeconds")
        }
        if defaults.object(forKey: "streakDays") != nil {
            currentStreakDays = defaults.integer(forKey: "streakDays")
        }
    }
    
    private func saveData() {
        let defaults = UserDefaults.standard
        defaults.set(totalUntouchedSecondsToday, forKey: "totalUntouchedSeconds")
        defaults.set(currentStreakDays, forKey: "streakDays")
    }
}
