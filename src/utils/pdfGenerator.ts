import { jsPDF } from 'jspdf';

export interface QuoteData {
  quoteNumber: string;
  date: string;
  contractorName: string;
  contractorPhone: string;
  clientName: string;
  clientAddress: string;
  items: {
    description: string;
    details: string;
    amount: number;
  }[];
  taxRate: number;
  taxAmount: number;
  total: number;
}

export function generateQuotePDF(data: QuoteData) {
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

  // Header background bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 595, 80, 'F');

  // App / Brand Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('QuoteVoice', 40, 48);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Instant Trade Estimate', 40, 64);

  // Quote info on right header
  doc.text(`QUOTE #: ${data.quoteNumber}`, 555, 42, { align: 'right' });
  doc.text(`DATE: ${data.date}`, 555, 58, { align: 'right' });

  // Contractor info box
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(data.contractorName, 40, 120);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text('Licensed & Insured Trade Contractor', 40, 135);
  doc.text(`Direct: ${data.contractorPhone}`, 40, 150);

  // Bill To Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(320, 105, 235, 60, 6, 6, 'F');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('ESTIMATE PREPARED FOR:', 335, 122);

  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFontSize(13);
  doc.text(data.clientName, 335, 140);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(data.clientAddress, 335, 154);

  // Table header
  let y = 195;
  doc.setFillColor(241, 245, 249);
  doc.rect(40, y, 515, 26, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('DESCRIPTION', 55, y + 17);
  doc.text('AMOUNT', 540, y + 17, { align: 'right' });

  y += 38;

  // Table rows
  data.items.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(item.description, 55, y);

    doc.text(`$${item.amount.toFixed(2)}`, 540, y, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
    doc.text(item.details, 55, y + 14);

    // separator line
    doc.setDrawColor(226, 232, 240);
    doc.line(40, y + 26, 555, y + 26);

    y += 42;
  });

  // Summary box
  y += 10;
  const summaryX = 350;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(`Sales Tax (${(data.taxRate * 100).toFixed(0)}%):`, summaryX, y);
  doc.text(`$${data.taxAmount.toFixed(2)}`, 540, y, { align: 'right' });

  y += 24;

  // Total highlight box
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(summaryX - 10, y - 14, 215, 36, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Total Estimate:', summaryX, y + 10);
  doc.text(`$${data.total.toFixed(2)}`, 540, y + 10, { align: 'right' });

  // Footer notes & terms
  y = 740;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('Terms & Payment:', 40, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text('• Estimate valid for 30 calendar days from issue date.', 40, y + 15);
  doc.text('• Payment due upon completion of listed services.', 40, y + 28);
  doc.text('• Generated automatically via QuoteVoice AI Voice-to-Quote System.', 40, y + 41);

  // Save the PDF
  doc.save(`QuoteVoice_${data.clientName.replace(/\s+/g, '_')}_${data.quoteNumber}.pdf`);
}
