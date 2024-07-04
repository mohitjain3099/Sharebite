import jsPDF from 'jspdf';
import sharp from 'sharp';
import SharebiteLogoTransparent from '../../static/images/SharebiteLogoTransparent.png'; // replace with the path to your logo image

// Define the props for the certificate
type CertificateProps = {
    name: string;
    amount: number;
};

// Create a certificate with the given name and amount
const CreateCertificate = async ({name, amount}: CertificateProps) => {
    const doc = new jsPDF('landscape');
    doc.addImage(SharebiteLogoTransparent, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), '', 'FAST');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100); // set the text color to a light gray
    doc.setFontSize(24);
    doc.text('Certificate of Appreciation', 148, 35, { align: 'center' });
    doc.setFont('courier');
    doc.setFontSize(16);
    doc.text('Presented to:', 148, 55, { align: 'center' });
    doc.setFont('courier', 'bold')
    doc.text(name, 148, 65, { align: 'center' });
    doc.text('For Their Generous Donation of $' + amount, 148, 85, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('courier', 'normal');
    const longText = 'This certificate serves as a token of our deepest gratitude for your selfless act of kindness and generosity. Your donation has made a meaningful impact on our organization\'s mission to [briefly describe the organization\'s mission or goal]. Your support not only helps us in our endeavors but also inspires others to join us in making a positive difference in the world.';
    const splitText = doc.splitTextToSize(longText, 180); // split the text into lines that fit within a width of 180
    doc.text(splitText, 148, 105, { align: 'center' });
    doc.text('Thank you for your generosity and for being a part of our community.', 148, 155, { align: 'center' });
    doc.text('Sincerely,', 148, 165, { align: 'center' });
    doc.text('The Sharebite Team', 148, 175, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Date of Donation: ' +  new Date().toLocaleDateString(), 148, 185, { align: 'center' });
    doc.setLineWidth(1);
    doc.line(20, 20, 276, 20); // top border
    doc.line(20, 195, 276, 195); // bottom border
    doc.line(20, 20, 20, 195); // left border
    doc.line(276, 20, 276, 195); // right border
    doc.save('certificate.pdf');
}

export default CreateCertificate;