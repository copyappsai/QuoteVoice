import SwiftUI

struct DashboardView: View {
    @EnvironmentObject var manager: StillnessManager
    let onOpenSettings: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            // Top Bar
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("PRESENCE")
                        .font(.system(size: 11, weight: .bold, design: .rounded))
                        .tracking(1.5)
                        .foregroundColor(Color(white: 0.5))
                    Text("Stillness")
                        .font(.system(size: 26, weight: .heavy, design: .rounded))
                        .foregroundColor(.white)
                }
                
                Spacer()
                
                HStack(spacing: 6) {
                    Image(systemName: "flame.fill")
                        .foregroundColor(.orange)
                        .font(.system(size: 13))
                    Text("\(manager.currentStreakDays) Day Streak")
                        .font(.system(size: 13, weight: .semibold, design: .rounded))
                        .foregroundColor(.white)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(Color(white: 0.12))
                .clipShape(Capsule())
                
                Button(action: {
                    Haptics.tap()
                    onOpenSettings()
                }) {
                    Image(systemName: "gearshape")
                        .font(.system(size: 17, weight: .medium))
                        .foregroundColor(Color(white: 0.6))
                        .padding(8)
                        .background(Color(white: 0.1))
                        .clipShape(Circle())
                }
            }
            .padding(.horizontal, 20)
            .padding(.top, 16)
            
            ScrollView(showsIndicators: false) {
                VStack(spacing: 16) {
                    
                    // Main Untouched Counter Card (Apple Design Hero)
                    VStack(spacing: 8) {
                        Text("PHONE UNTOUCHED TODAY")
                            .font(.system(size: 11, weight: .bold, design: .rounded))
                            .tracking(2.0)
                            .foregroundColor(Color(white: 0.5))
                        
                        let time = manager.formatTime(seconds: manager.totalUntouchedSecondsToday)
                        
                        HStack(alignment: .firstTextBaseline, spacing: 4) {
                            Text(time.hours)
                                .font(.system(size: 58, weight: .black, design: .rounded))
                                .foregroundColor(.white)
                            Text("h")
                                .font(.system(size: 20, weight: .bold, design: .rounded))
                                .foregroundColor(Color(white: 0.5))
                                .padding(.trailing, 8)
                            
                            Text(time.minutes)
                                .font(.system(size: 58, weight: .black, design: .rounded))
                                .foregroundColor(.white)
                            Text("m")
                                .font(.system(size: 20, weight: .bold, design: .rounded))
                                .foregroundColor(Color(white: 0.5))
                        }
                        
                        HStack(spacing: 6) {
                            Image(systemName: "arrow.up.right")
                                .font(.system(size: 11, weight: .bold))
                            Text("+1h 40m vs yesterday • High Presence")
                                .font(.system(size: 12, weight: .medium, design: .rounded))
                        }
                        .foregroundColor(.green)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.green.opacity(0.12))
                        .clipShape(Capsule())
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 28)
                    .padding(.horizontal, 20)
                    .background(
                        RoundedRectangle(cornerRadius: 32, style: .continuous)
                            .fill(Color(white: 0.08))
                            .overlay(
                                RoundedRectangle(cornerRadius: 32, style: .continuous)
                                    .stroke(Color(white: 0.16), lineWidth: 1)
                            )
                    )
                    
                    // Reclaimed Life Grid
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text("WHAT YOU RECLAIMED")
                                .font(.system(size: 11, weight: .bold, design: .rounded))
                                .tracking(1.5)
                                .foregroundColor(Color(white: 0.5))
                            Spacer()
                            Text("Real World Life")
                                .font(.system(size: 12, weight: .medium, design: .rounded))
                                .foregroundColor(Color(white: 0.4))
                        }
                        .padding(.horizontal, 4)
                        
                        HStack(spacing: 12) {
                            // Card 1: Pages Read
                            VStack(alignment: .leading, spacing: 6) {
                                Text("📖")
                                    .font(.system(size: 24))
                                Text("\(manager.pagesReadToday) Pages Read")
                                    .font(.system(size: 15, weight: .bold, design: .rounded))
                                    .foregroundColor(.white)
                                Text("Saved from TikTok")
                                    .font(.system(size: 11, weight: .regular, design: .rounded))
                                    .foregroundColor(Color(white: 0.5))
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(16)
                            .background(Color(white: 0.08))
                            .cornerRadius(20)
                            
                            // Card 2: Pickups Prevented
                            VStack(alignment: .leading, spacing: 6) {
                                Text("🛑")
                                    .font(.system(size: 24))
                                Text("\(manager.pickupsPreventedToday) Pickups")
                                    .font(.system(size: 15, weight: .bold, design: .rounded))
                                    .foregroundColor(.white)
                                Text("Impulses stopped")
                                    .font(.system(size: 11, weight: .regular, design: .rounded))
                                    .foregroundColor(Color(white: 0.5))
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(16)
                            .background(Color(white: 0.08))
                            .cornerRadius(20)
                        }
                        
                        // Wide Card: Dopamine Balance
                        HStack(spacing: 14) {
                            ZStack {
                                Circle()
                                    .fill(Color.blue.opacity(0.15))
                                    .frame(width: 44, height: 44)
                                Image(systemName: "brain.head.profile")
                                    .foregroundColor(.blue)
                                    .font(.system(size: 20))
                            }
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Dopamine & Focus Reset")
                                    .font(.system(size: 14, weight: .bold, design: .rounded))
                                    .foregroundColor(.white)
                                Text("Cortisol reduced by 22% during silence")
                                    .font(.system(size: 11, weight: .regular, design: .rounded))
                                    .foregroundColor(Color(white: 0.5))
                            }
                            
                            Spacer()
                            
                            Text("Optimal")
                                .font(.system(size: 12, weight: .bold, design: .rounded))
                                .foregroundColor(.green)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .background(Color.green.opacity(0.12))
                                .clipShape(Capsule())
                        }
                        .padding(14)
                        .background(Color(white: 0.08))
                        .cornerRadius(20)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                .padding(.bottom, 120)
            }
            
            // Floating Begin Stillness Action Button
            VStack {
                Button(action: {
                    manager.startSession()
                }) {
                    HStack(spacing: 10) {
                        Image(systemName: "iphone.slash")
                            .font(.system(size: 16, weight: .bold))
                        Text("Begin Stillness (Flip to Unplug)")
                            .font(.system(size: 16, weight: .bold, design: .rounded))
                    }
                    .foregroundColor(.black)
                    .frame(maxWidth: .infinity)
                    .frame(height: 58)
                    .background(Color.white)
                    .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                    .shadow(color: Color.white.opacity(0.15), radius: 20, y: 6)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 24)
            }
        }
    }
}
