import SwiftUI

public struct SettingsView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var storage: StorageManager
    
    @State private var profile: ContractorProfile
    @State private var taxPctString: String
    @State private var rateString: String
    
    public init() {
        let p = StorageManager.shared.profile
        _profile = State(initialValue: p)
        _taxPctString = State(initialValue: String(format: "%.0f", p.defaultTaxRate * 100))
        _rateString = State(initialValue: String(format: "%.0f", p.defaultHourlyRate))
    }
    
    public var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Company & Trade Branding")) {
                    TextField("Business Name", text: $profile.businessName)
                    TextField("Owner Name", text: $profile.ownerName)
                    TextField("License #", text: $profile.licenseNumber)
                    TextField("Specialty Tagline", text: $profile.tradeSpecialty)
                }
                
                Section(header: Text("Contact Information")) {
                    TextField("Phone", text: $profile.phone)
                    TextField("Email", text: $profile.email)
                }
                
                Section(header: Text("Pricing & Defaults")) {
                    HStack {
                        Text("Default Hourly Rate ($):")
                        Spacer()
                        TextField("120", text: $rateString)
                            .frame(width: 60)
                            .multilineTextAlignment(.trailing)
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    HStack {
                        Text("Default Tax Rate (%):")
                        Spacer()
                        TextField("10", text: $taxPctString)
                            .frame(width: 60)
                            .multilineTextAlignment(.trailing)
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    TextField("Payment Terms", text: $profile.defaultPaymentTerms)
                }
                
                Section(footer: Text("QuoteVoice Native iOS Edition • Ready for App Store submission")) {
                    Button("Reset to Defaults", role: .destructive) {
                        storage.profile = ContractorProfile()
                        storage.saveProfile(storage.profile)
                        dismiss()
                    }
                }
            }
            .navigationTitle("Business Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        profile.defaultHourlyRate = Double(rateString) ?? 120.0
                        profile.defaultTaxRate = (Double(taxPctString) ?? 10.0) / 100.0
                        storage.saveProfile(profile)
                        dismiss()
                    }
                    .fontWeight(.bold)
                }
            }
        }
    }
}
