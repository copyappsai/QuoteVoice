import Foundation
import UIKit
import PDFKit

public class PDFManager {
    public static func generatePDF(quote: Quote, profile: ContractorProfile) -> URL? {
        let pageWidth: CGFloat = 595.2 // A4
        let pageHeight: CGFloat = 841.8
        let pageRect = CGRect(x: 0, y: 0, width: pageWidth, height: pageHeight)
        
        let renderer = UIGraphicsPDFRenderer(bounds: pageRect)
        
        let data = renderer.pdfData { context in
            context.beginPage()
            
            // 1. Blue Header Bar
            let headerRect = CGRect(x: 0, y: 0, width: pageWidth, height: 80)
            let headerColor = UIColor(red: 30/255, green: 64/255, blue: 175/255, alpha: 1.0)
            headerColor.setFill()
            UIRectFill(headerRect)
            
            // Header Text
            let titleFont = UIFont.boldSystemFont(ofSize: 22)
            let titleAttributes: [NSAttributedString.Key: Any] = [
                .font: titleFont,
                .foregroundColor: UIColor.white
            ]
            "QuoteVoice".draw(at: CGPoint(x: 36, y: 26), withAttributes: titleAttributes)
            
            let subtitleFont = UIFont.systemFont(ofSize: 10)
            let subtitleAttributes: [NSAttributedString.Key: Any] = [
                .font: subtitleFont,
                .foregroundColor: UIColor(white: 0.9, alpha: 1.0)
            ]
            "Official Trade Contractor Estimate".draw(at: CGPoint(x: 36, y: 52), withAttributes: subtitleAttributes)
            
            // Quote # & Date on right header
            let quoteNumText = "QUOTE #: \(quote.quoteNumber)"
            quoteNumText.draw(at: CGPoint(x: pageWidth - 160, y: 30), withAttributes: titleAttributes)
            
            let dateText = "Date: \(quote.date)"
            dateText.draw(at: CGPoint(x: pageWidth - 160, y: 52), withAttributes: subtitleAttributes)
            
            // 2. Contractor & Client Cards
            var y: CGFloat = 110
            
            let boldFont = UIFont.boldSystemFont(ofSize: 12)
            let regularFont = UIFont.systemFont(ofSize: 10)
            let mutedFont = UIFont.systemFont(ofSize: 9)
            
            let darkAttrs: [NSAttributedString.Key: Any] = [.font: boldFont, .foregroundColor: UIColor.black]
            let mutedAttrs: [NSAttributedString.Key: Any] = [.font: mutedFont, .foregroundColor: UIColor.darkGray]
            
            profile.businessName.draw(at: CGPoint(x: 36, y: y), withAttributes: darkAttrs)
            profile.tradeSpecialty.draw(at: CGPoint(x: 36, y: y + 16), withAttributes: mutedAttrs)
            "Lic. #\(profile.licenseNumber)".draw(at: CGPoint(x: 36, y: y + 30), withAttributes: mutedAttrs)
            "Phone: \(profile.phone)".draw(at: CGPoint(x: 36, y: y + 44), withAttributes: mutedAttrs)
            
            // Client box
            let clientBoxRect = CGRect(x: pageWidth - 240, y: y - 8, width: 204, height: 75)
            UIColor(red: 245/255, green: 247/255, blue: 250/255, alpha: 1.0).setFill()
            UIBezierPath(roundedRect: clientBoxRect, cornerRadius: 8).fill()
            
            let clientHeaderAttrs: [NSAttributedString.Key: Any] = [
                .font: UIFont.boldSystemFont(ofSize: 8.5),
                .foregroundColor: headerColor
            ]
            "PREPARED FOR:".draw(at: CGPoint(x: clientBoxRect.origin.x + 12, y: clientBoxRect.origin.y + 10), withAttributes: clientHeaderAttrs)
            quote.clientName.draw(at: CGPoint(x: clientBoxRect.origin.x + 12, y: clientBoxRect.origin.y + 24), withAttributes: darkAttrs)
            quote.clientAddress.draw(at: CGPoint(x: clientBoxRect.origin.x + 12, y: clientBoxRect.origin.y + 42), withAttributes: mutedAttrs)
            if !quote.clientPhone.isEmpty {
                quote.clientPhone.draw(at: CGPoint(x: clientBoxRect.origin.x + 12, y: clientBoxRect.origin.y + 56), withAttributes: mutedAttrs)
            }
            
            // 3. Table Header
            y = 210
            let tableHeaderRect = CGRect(x: 36, y: y, width: pageWidth - 72, height: 24)
            UIColor(red: 240/255, green: 243/255, blue: 246/255, alpha: 1.0).setFill()
            UIRectFill(tableHeaderRect)
            
            let thAttrs: [NSAttributedString.Key: Any] = [
                .font: UIFont.boldSystemFont(ofSize: 9),
                .foregroundColor: UIColor.black
            ]
            "DESCRIPTION OF WORK & SUPPLIES".draw(at: CGPoint(x: 48, y: y + 6), withAttributes: thAttrs)
            "TOTAL".draw(at: CGPoint(x: pageWidth - 90, y: y + 6), withAttributes: thAttrs)
            
            y += 34
            
            // 4. Items
            for item in quote.items {
                item.description.draw(at: CGPoint(x: 48, y: y), withAttributes: darkAttrs)
                let itemTotal = String(format: "$%.2f", item.total)
                itemTotal.draw(at: CGPoint(x: pageWidth - 90, y: y), withAttributes: darkAttrs)
                
                if !item.details.isEmpty {
                    item.details.draw(at: CGPoint(x: 48, y: y + 14), withAttributes: mutedAttrs)
                }
                
                // Line
                let path = UIBezierPath()
                path.move(to: CGPoint(x: 36, y: y + 28))
                path.addLine(to: CGPoint(x: pageWidth - 36, y: y + 28))
                UIColor(white: 0.9, alpha: 1.0).setStroke()
                path.stroke()
                
                y += 38
            }
            
            // 5. Total
            y += 10
            let summaryX: CGFloat = pageWidth - 200
            
            "Subtotal:".draw(at: CGPoint(x: summaryX, y: y), withAttributes: mutedAttrs)
            String(format: "$%.2f", quote.subtotal).draw(at: CGPoint(x: pageWidth - 90, y: y), withAttributes: darkAttrs)
            y += 18
            
            "Sales Tax (10%):".draw(at: CGPoint(x: summaryX, y: y), withAttributes: mutedAttrs)
            String(format: "$%.2f", quote.taxAmount).draw(at: CGPoint(x: pageWidth - 90, y: y), withAttributes: darkAttrs)
            y += 24
            
            let totalBoxRect = CGRect(x: summaryX - 10, y: y - 6, width: 174, height: 32)
            UIColor(red: 238/255, green: 242/255, blue: 255/255, alpha: 1.0).setFill()
            UIBezierPath(roundedRect: totalBoxRect, cornerRadius: 6).fill()
            
            let totalFont = UIFont.boldSystemFont(ofSize: 13)
            let totalAttrs: [NSAttributedString.Key: Any] = [.font: totalFont, .foregroundColor: headerColor]
            "Total Estimate:".draw(at: CGPoint(x: summaryX, y: y + 2), withAttributes: totalAttrs)
            String(format: "$%.2f", quote.total).draw(at: CGPoint(x: pageWidth - 90, y: y + 2), withAttributes: totalAttrs)
            
            // 6. Terms
            y = 700
            "Terms & Conditions:".draw(at: CGPoint(x: 36, y: y), withAttributes: darkAttrs)
            "• \(quote.paymentTerms)".draw(at: CGPoint(x: 36, y: y + 16), withAttributes: mutedAttrs)
            "• Estimate valid for 30 calendar days from issue date.".draw(at: CGPoint(x: 36, y: y + 30), withAttributes: mutedAttrs)
            "• Generated by QuoteVoice iOS Native App.".draw(at: CGPoint(x: 36, y: y + 44), withAttributes: mutedAttrs)
        }
        
        // Save to temporary file
        let tempDir = FileManager.default.temporaryDirectory
        let fileURL = tempDir.appendingPathComponent("Quote_\(quote.clientName.replacingOccurrences(of: " ", with: "_"))_\(quote.quoteNumber).pdf")
        
        do {
            try data.write(to: fileURL)
            return fileURL
        } catch {
            print("PDF Write error: \(error)")
            return nil
        }
    }
}
