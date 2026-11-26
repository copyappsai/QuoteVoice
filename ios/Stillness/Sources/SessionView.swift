import SwiftUI

struct SessionView: View {
    @EnvironmentObject var manager: StillnessManager
    @State private var holdProgress: CGFloat = 0.0
    @State private var isHolding = false
    @State private var breatheScale: CGFloat = 1.0
    @State private var holdTimer: Timer? = nil

    var body: some View {
        VStack(spacing: 0) {
            
            // Status bar info
            HStack {
                HStack(spacing: 6) {
                    Circle()
                        .fill(Color.green)
                        .frame(width: 8, height: 8)
                    Text("PHONE ASLEEP")
                        .font(.system(size: 11, weight: .bold, design: .rounded))
                        .tracking(1.5)
                        .foregroundColor(Color(white: 0.6))
                }
                Spacer()
                Text("FACE DOWN MODE")
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .tracking(1.2)
                    .foregroundColor(Color(white: 0.4))
            }
            .padding(.horizontal, 24)
            .padding(.top, 24)
            
            Spacer()
            
            // Untouched Stopwatch
            VStack(spacing: 12) {
                Text("UNTOUCHED TIME")
                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                    .tracking(3.0)
                    .foregroundColor(Color(white: 0.4))
                
                let time = manager.formatTime(seconds: manager.currentSessionSeconds)
                
                HStack(spacing: 6) {
                    Text(time.hours)
                    Text(":")
                        .foregroundColor(Color(white: 0.3))
                    Text(time.minutes)
                    Text(":")
                        .foregroundColor(Color(white: 0.3))
                    Text(time.seconds)
                }
                .font(.system(size: 56, weight: .light, design: .monospaced))
                .foregroundColor(.white)
            }
            
            // Zen Breathing Ring
            ZStack {
                // Ambient pulsating halo
                Circle()
                    .fill(Color.white.opacity(0.04))
                    .frame(width: 200, height: 200)
                    .scaleEffect(breatheScale)
                
                Circle()
                    .stroke(Color(white: 0.16), lineWidth: 1.5)
                    .frame(width: 140, height: 140)
                
                VStack(spacing: 4) {
                    Image(systemName: "wind")
                        .font(.system(size: 20))
                        .foregroundColor(Color(white: 0.5))
                    Text("Breathe")
                        .font(.system(size: 13, weight: .medium, design: .rounded))
                        .foregroundColor(Color(white: 0.6))
                }
            }
            .padding(.vertical, 36)
            .onAppear {
                withAnimation(
                    Animation.easeInOut(duration: 4.0)
                        .repeatForever(autoreverses: true)
                ) {
                    breatheScale = 1.3
                }
            }
            
            Text("\"Life happens while your phone is resting.\"")
                .font(.system(size: 13, weight: .regular, design: .serif))
                .italic()
                .multilineTextAlignment(.center)
                .foregroundColor(Color(white: 0.4))
                .padding(.horizontal, 36)
            
            Spacer()
            
            // Friction Long Press to End Stillness
            VStack(spacing: 10) {
                ZStack {
                    RoundedRectangle(cornerRadius: 22, style: .continuous)
                        .fill(Color(white: 0.1))
                        .frame(height: 58)
                    
                    // Fill Progress Bar
                    GeometryReader { geo in
                        RoundedRectangle(cornerRadius: 22, style: .continuous)
                            .fill(Color.white.opacity(0.2))
                            .frame(width: geo.size.width * holdProgress, height: 58)
                    }
                    .frame(height: 58)
                    .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                    
                    HStack(spacing: 8) {
                        Image(systemName: isHolding ? "lock.open" : "lock")
                            .font(.system(size: 15, weight: .semibold))
                        Text(isHolding ? "Keep holding to end (\(Int(holdProgress * 100))%)" : "Hold 2s to End Stillness")
                            .font(.system(size: 15, weight: .bold, design: .rounded))
                    }
                    .foregroundColor(.white)
                }
                .overlay(
                    RoundedRectangle(cornerRadius: 22, style: .continuous)
                        .stroke(Color(white: 0.2), lineWidth: 1)
                )
                .simultaneousGesture(
                    DragGesture(minimumDistance: 0)
                        .onChanged { _ in
                            if !isHolding {
                                startHold()
                            }
                        }
                        .onEnded { _ in
                            cancelHold()
                        }
                )
                
                Text("Friction barrier prevents mindless checking")
                    .font(.system(size: 11, weight: .regular, design: .rounded))
                    .foregroundColor(Color(white: 0.35))
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 24)
        }
    }
    
    private func startHold() {
        isHolding = true
        Haptics.tap()
        holdProgress = 0.0
        
        holdTimer = Timer.scheduledTimer(withTimeInterval: 0.03, repeats: true) { timer in
            holdProgress += 0.02
            if holdProgress >= 1.0 {
                timer.invalidate()
                holdTimer = nil
                isHolding = false
                manager.endSession()
            }
        }
    }
    
    private func cancelHold() {
        isHolding = false
        holdTimer?.invalidate()
        holdTimer = nil
        withAnimation(.easeOut(duration: 0.2)) {
            holdProgress = 0.0
        }
    }
}
