import SwiftUI

struct SettingsSheet: View {
    @EnvironmentObject var manager: StillnessManager
    @Environment(\.dismiss) var dismiss

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                List {
                    Section(header: Text("STILLNESS ENGINE").foregroundColor(Color(white: 0.5))) {
                        Toggle(isOn: $manager.flipToUnplugEnabled) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Flip to Unplug")
                                    .foregroundColor(.white)
                                    .font(.system(size: 15, weight: .semibold))
                                Text("Auto-starts silence when phone placed face-down")
                                    .foregroundColor(Color(white: 0.5))
                                    .font(.system(size: 12))
                            }
                        }
                        .tint(.white)
                        .listRowBackground(Color(white: 0.1))

                        Toggle(isOn: $manager.ambientGlowEnabled) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("OLED Ambient Clock")
                                    .foregroundColor(.white)
                                    .font(.system(size: 15, weight: .semibold))
                                Text("Ultra-low power StandBy display on MagSafe")
                                    .foregroundColor(Color(white: 0.5))
                                    .font(.system(size: 12))
                            }
                        }
                        .tint(.white)
                        .listRowBackground(Color(white: 0.1))

                        Toggle(isOn: $manager.hapticsEnabled) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Taptic Feedback")
                                    .foregroundColor(.white)
                                    .font(.system(size: 15, weight: .semibold))
                                Text("Subtle physical vibration on hold unlock")
                                    .foregroundColor(Color(white: 0.5))
                                    .font(.system(size: 12))
                            }
                        }
                        .tint(.white)
                        .listRowBackground(Color(white: 0.1))
                    }
                    
                    Section(header: Text("ABOUT").foregroundColor(Color(white: 0.5))) {
                        HStack {
                            Text("Version")
                                .foregroundColor(.white)
                            Spacer()
                            Text("1.0.0 (Apple HIG)")
                                .foregroundColor(Color(white: 0.5))
                        }
                        .listRowBackground(Color(white: 0.1))

                        HStack {
                            Text("Design Philosophy")
                                .foregroundColor(.white)
                            Spacer()
                            Text("Anti-Dopamine & Zen")
                                .foregroundColor(Color(white: 0.5))
                        }
                        .listRowBackground(Color(white: 0.1))
                    }
                }
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        Haptics.tap()
                        dismiss()
                    }
                    .foregroundColor(.white)
                    .font(.system(size: 16, weight: .bold))
                }
            }
        }
    }
}
