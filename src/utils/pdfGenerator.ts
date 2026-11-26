import { jsPDF } from 'jspdf';
import { Quote, ContractorProfile } from '../types';

export function generateQuotePDF(quote: Quote, profile: ContractorProfile) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Colors
  const primaryColor = [30, 64, 175]; // Blue 800
  const darkTextColor = [15, 23, 42]; // Slate 900
  const mutedTextColor = [100, 116, 139]; // Slate 500
  const lightBg = [248, 250, 252]; // Slate 50
  const successColor = [16, 185, 129]; // Emerald 500

  // 1. Header background bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 595, 84, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('QuoteVoice', 40, 44);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.text('Official Contractor Estimate & Invoice', 40, 62);

  // Quote # & Date on top right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`QUOTE: ${quote.quoteNumber}`, 555, 42, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Issue Date: ${quote.date}`, 555, 58, { align: 'right' });
  doc.text(`Valid Until: ${quote.dueDate}`, 555, 72, { align: 'right' });

  // 2. Contractor & Client Cards
  let y = 115;

  // Left: Contractor Card
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(profile.businessName, 40, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(profile.tradeSpecialty, 40, y + 16);
  doc.text(`License: ${profile.licenseNumber}`, 40, y + 30);
  doc.text(`Phone: ${profile.phone}`, 40, y + 44);
  doc.text(`Email: ${profile.email}`, 40, y + 58);

  // Right: Prepared For Client Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(310, y - 10, 245, 82, 6, 6, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(310, y - 10, 245, 82, 6, 6, 'S');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('ESTIMATE PREPARED FOR:', 325, y + 8);

  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFontSize(13);
  doc.text(quote.clientName, 325, y + 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(quote.clientAddress || 'Client Site Address', 325, y + 42);
  if (quote.clientPhone) {
    doc.text(`Contact: ${quote.clientPhone}`, 325, y + 56);
  }

  // 3. Itemized Table Header
  y = 220;
  doc.setFillColor(241, 245, 249);
  doc.rect(40, y, 515, 26, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('DESCRIPTION OF WORK & MATERIALS', 55, y + 17);
  doc.text('QTY', 380, y + 17, { align: 'center' });
  doc.text('RATE', 450, y + 17, { align: 'right' });
  doc.text('AMOUNT', 540, y + 17, { align: 'right' });

  y += 38;

  // 4. Line Items
  quote.items.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(item.description, 55, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(String(item.quantity), 380, y, { align: 'center' });
    doc.text(`$${item.unitPrice.toFixed(2)}`, 450, y, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(`$${item.total.toFixed(2)}`, 540, y, { align: 'right' });

    if (item.details) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
      doc.text(item.details, 55, y + 13);
    }

    // separator line
    doc.setDrawColor(226, 232, 240);
    doc.line(40, y + 24, 555, y + 24);

    y += 38;
  });

  // 5. Financial Summary Box
  y += 12;
  const summaryX = 350;

  // Subtotal
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text('Subtotal:', summaryX, y);
  doc.text(`$${quote.subtotal.toFixed(2)}`, 540, y, { align: 'right' });

  y += 20;

  // Tax
  doc.text(`Sales Tax (${(quote.taxRate * 100).toFixed(0)}%):`, summaryX, y);
  doc.text(`$${quote.taxAmount.toFixed(2)}`, 540, y, { align: 'right' });

  y += 24;

  // Grand Total Box
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(summaryX - 10, y - 14, 215, 38, 6, 6, 'F');
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(summaryX - 10, y - 14, 215, 38, 6, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Total Estimate:', summaryX, y + 10);
  doc.text(`$${quote.total.toFixed(2)}`, 540, y + 10, { align: 'right' });

  // 6. Terms, Notes & Signature
  y = 660;

  // Terms box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('Payment Terms & Scope:', 40, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(`• ${quote.paymentTerms || profile.defaultPaymentTerms}`, 40, y + 14);
  doc.text('• Estimate valid for 30 calendar days from issue date.', 40, y + 26);
  doc.text('• Unforeseen concealed structural/electrical defects billed at agreed hourly rate upon authorization.', 40, y + 38);

  // Client signature line
  y += 75;
  doc.setDrawColor(203, 213, 225);
  doc.line(40, y, 240, y);
  doc.line(355, y, 555, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Authorized Client Acceptance Signature', 40, y + 12);
  doc.text('Contractor Representative Signature', 355, y + 12);

  // Bottom Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated by QuoteVoice AI • Quote #${quote.quoteNumber} • Page 1 of 1`, 297, 810, { align: 'center' });

  // Download PDF
  const filename = `QuoteVoice_${quote.clientName.replace(/\s+/g, '_')}_${quote.quoteNumber}.pdf`;
  doc.save(filename);
}
