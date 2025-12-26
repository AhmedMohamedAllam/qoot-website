import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FiDownload, FiPrinter, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import toast from 'react-hot-toast';

// Demo tables
const demoTables = Array.from({ length: 10 }, (_, i) => ({
  id: `table-${i + 1}`,
  number: i + 1,
  active: true
}));

export default function QRCodesPage() {
  const { isRTL, language } = useLanguage();
  const [tables, setTables] = useState(demoTables);
  const [selectedTable, setSelectedTable] = useState(null);

  const restaurantId = 'demo-restaurant';
  const baseUrl = 'https://customer.qoot.app';

  const getQRUrl = (tableNumber) => {
    return `${baseUrl}/menu/${restaurantId}/${tableNumber}`;
  };

  const handleDownload = (tableNumber) => {
    const svg = document.getElementById(`qr-${tableNumber}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 500, 500);
      ctx.drawImage(img, 50, 50, 400, 400);
      
      // Add table number text
      ctx.fillStyle = '#2c3e50';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Table ${tableNumber}`, 250, 480);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qoot-table-${tableNumber}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    toast.success(isRTL ? 'تم تحميل رمز QR' : 'QR Code downloaded');
  };

  const handlePrintAll = () => {
    toast.success(isRTL ? 'جاري التحضير للطباعة...' : 'Preparing print view...');
    // Would open print dialog here
  };

  const handleAddTable = () => {
    const newTableNumber = tables.length + 1;
    setTables([...tables, {
      id: `table-${newTableNumber}`,
      number: newTableNumber,
      active: true
    }]);
    toast.success(isRTL ? `تم إضافة طاولة ${newTableNumber}` : `Table ${newTableNumber} added`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-[#2c3e50]">
            {isRTL ? 'رموز QR' : 'QR Codes'}
          </h1>
          <p className="text-gray-500">
            {isRTL ? 'إدارة رموز QR للطاولات' : 'Manage table QR codes'}
          </p>
        </div>

        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrintAll}
            className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <FiPrinter size={18} />
            <span>{isRTL ? 'طباعة الكل' : 'Print All'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddTable}
            className={`px-4 py-2 bg-[#2ecc71] text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#2ecc71]/30 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <FiPlus size={18} />
            <span>{isRTL ? 'إضافة طاولة' : 'Add Table'}</span>
          </motion.button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className={`text-blue-700 ${isRTL ? 'text-right' : ''}`}>
          <strong>💡 {isRTL ? 'نصيحة:' : 'Tip:'}</strong>{' '}
          {isRTL 
            ? 'اطبع رموز QR وضعها على الطاولات. سيتمكن العملاء من مسحها للوصول إلى القائمة الرقمية.'
            : 'Print QR codes and place them on tables. Customers can scan to access the digital menu.'}
        </p>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tables.map((table, index) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => setSelectedTable(table)}
            className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* QR Code */}
            <div className="aspect-square bg-white rounded-xl p-2 flex items-center justify-center mb-3">
              <QRCodeSVG
                id={`qr-${table.number}`}
                value={getQRUrl(table.number)}
                size={120}
                level="H"
                includeMargin={false}
                fgColor="#2c3e50"
              />
            </div>

            {/* Table Info */}
            <div className="text-center">
              <p className="font-bold text-[#2c3e50]">
                {isRTL ? `طاولة ${table.number}` : `Table ${table.number}`}
              </p>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {getQRUrl(table.number)}
              </p>
            </div>

            {/* Actions */}
            <div className={`flex gap-2 mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={(e) => { e.stopPropagation(); handleDownload(table.number); }}
                className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
              >
                <FiDownload size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Table Modal/Preview */}
      {selectedTable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTable(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-64 h-64 mx-auto bg-white rounded-2xl p-4 shadow-lg mb-6">
              <QRCodeSVG
                value={getQRUrl(selectedTable.number)}
                size={224}
                level="H"
                includeMargin={false}
                fgColor="#2c3e50"
              />
            </div>
            
            <h2 className="text-2xl font-black text-[#2c3e50] mb-2">
              {isRTL ? `طاولة ${selectedTable.number}` : `Table ${selectedTable.number}`}
            </h2>
            
            <p className="text-gray-500 text-sm mb-6 break-all">
              {getQRUrl(selectedTable.number)}
            </p>

            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setSelectedTable(null)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600"
              >
                {isRTL ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => handleDownload(selectedTable.number)}
                className={`flex-1 py-3 bg-[#2ecc71] text-white rounded-xl font-bold flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <FiDownload size={18} />
                <span>{isRTL ? 'تحميل' : 'Download'}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

