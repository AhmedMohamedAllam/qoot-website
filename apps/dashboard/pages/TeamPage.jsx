import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone, FiShield } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { Modal, ConfirmDialog } from '../../../shared/components';
import toast from 'react-hot-toast';

// Demo team data
const demoTeam = [
  { id: '1', name: 'Ahmed Allam', email: 'ahmed@qoot.app', phone: '+20 123 456 7890', role: 'owner', status: 'active', lastLogin: new Date() },
  { id: '2', name: 'Sara Mohamed', email: 'sara@qoot.app', phone: '+20 111 222 3333', role: 'manager', status: 'active', lastLogin: new Date(Date.now() - 3600000) },
  { id: '3', name: 'Omar Hassan', email: 'omar@qoot.app', phone: '+20 100 200 3000', role: 'cashier', status: 'active', lastLogin: new Date(Date.now() - 86400000) },
  { id: '4', name: 'Fatima Ali', email: 'fatima@qoot.app', phone: '+20 155 666 7777', role: 'kitchen', status: 'active', lastLogin: new Date(Date.now() - 7200000) },
];

const roleConfig = {
  owner: { 
    label: 'Owner', 
    labelAr: 'المالك', 
    color: 'bg-purple-100 text-purple-700',
    permissions: ['All access']
  },
  manager: { 
    label: 'Manager', 
    labelAr: 'مدير', 
    color: 'bg-blue-100 text-blue-700',
    permissions: ['Orders', 'Menu', 'Analytics', 'Team (view)']
  },
  cashier: { 
    label: 'Cashier', 
    labelAr: 'كاشير', 
    color: 'bg-green-100 text-green-700',
    permissions: ['Orders', 'Basic Analytics']
  },
  kitchen: { 
    label: 'Kitchen', 
    labelAr: 'مطبخ', 
    color: 'bg-orange-100 text-orange-700',
    permissions: ['Orders (kitchen view)']
  },
};

export default function TeamPage() {
  const { isRTL, language } = useLanguage();
  const [team, setTeam] = useState(demoTeam);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [deleteMember, setDeleteMember] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'cashier'
  });

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error(isRTL ? 'املأ جميع الحقول المطلوبة' : 'Fill all required fields');
      return;
    }

    if (editMember) {
      setTeam(prev => prev.map(member => 
        member.id === editMember.id ? { ...member, ...formData } : member
      ));
      toast.success(isRTL ? 'تم تحديث العضو' : 'Member updated');
    } else {
      const newMember = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        lastLogin: null
      };
      setTeam(prev => [...prev, newMember]);
      toast.success(isRTL ? 'تم إرسال الدعوة' : 'Invitation sent');
    }

    setShowAddModal(false);
    setEditMember(null);
    setFormData({ name: '', email: '', phone: '', role: 'cashier' });
  };

  const handleDelete = () => {
    setTeam(prev => prev.filter(member => member.id !== deleteMember.id));
    toast.success(isRTL ? 'تم حذف العضو' : 'Member removed');
    setDeleteMember(null);
  };

  const openEditModal = (member) => {
    setEditMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role
    });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-[#2c3e50]">
            {isRTL ? 'إدارة الفريق' : 'Team Management'}
          </h1>
          <p className="text-gray-500">
            {isRTL ? 'أضف وأدر أعضاء فريقك' : 'Add and manage team members'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditMember(null); setShowAddModal(true); }}
          className={`px-6 py-3 bg-[#2ecc71] text-white rounded-xl font-bold shadow-lg shadow-[#2ecc71]/30 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <FiPlus size={20} />
          <span>{isRTL ? 'دعوة عضو' : 'Invite Member'}</span>
        </motion.button>
      </div>

      {/* Role Legend */}
      <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {Object.entries(roleConfig).map(([key, config]) => (
          <div 
            key={key}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${config.color}`}
          >
            <FiShield className="inline mr-1" size={14} />
            {language === 'ar' ? config.labelAr : config.label}
          </div>
        ))}
      </div>

      {/* Team List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-4 text-sm font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'العضو' : 'Member'}
                </th>
                <th className={`px-6 py-4 text-sm font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'التواصل' : 'Contact'}
                </th>
                <th className={`px-6 py-4 text-sm font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الدور' : 'Role'}
                </th>
                <th className={`px-6 py-4 text-sm font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الحالة' : 'Status'}
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.map((member, index) => {
                const role = roleConfig[member.role];
                
                return (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    {/* Member Info */}
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-[#2ecc71] rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="font-semibold text-[#2c3e50]">{member.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className={isRTL ? 'text-right' : ''}>
                        <p className={`text-sm text-gray-600 flex items-center gap-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                          <FiMail size={12} />
                          {member.email}
                        </p>
                        {member.phone && (
                          <p className={`text-sm text-gray-400 flex items-center gap-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                            <FiPhone size={12} />
                            {member.phone}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${role.color}`}>
                        {language === 'ar' ? role.labelAr : role.label}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {member.status === 'active' 
                          ? (isRTL ? 'نشط' : 'Active')
                          : (isRTL ? 'غير نشط' : 'Inactive')
                        }
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse justify-start' : 'justify-end'}`}>
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 text-gray-400 hover:text-[#2ecc71] hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        {member.role !== 'owner' && (
                          <button
                            onClick={() => setDeleteMember(member)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditMember(null); }}
        title={editMember 
          ? (isRTL ? 'تحرير العضو' : 'Edit Member')
          : (isRTL ? 'دعوة عضو جديد' : 'Invite New Member')
        }
        isRTL={isRTL}
      >
        <div className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'الاسم' : 'Name'}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none ${isRTL ? 'text-right' : ''}`}
              placeholder={isRTL ? 'اسم العضو' : 'Member name'}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none ${isRTL ? 'text-right' : ''}`}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'الهاتف' : 'Phone'}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none ${isRTL ? 'text-right' : ''}`}
              placeholder="+20 1XX XXX XXXX"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'الدور' : 'Role'}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none ${isRTL ? 'text-right' : ''}`}
              disabled={editMember?.role === 'owner'}
            >
              {Object.entries(roleConfig).map(([key, config]) => (
                <option key={key} value={key}>
                  {language === 'ar' ? config.labelAr : config.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => { setShowAddModal(false); setEditMember(null); }}
              className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50"
            >
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 bg-[#2ecc71] text-white rounded-xl font-bold hover:bg-[#27ae60]"
            >
              {editMember 
                ? (isRTL ? 'تحديث' : 'Update')
                : (isRTL ? 'إرسال دعوة' : 'Send Invite')
              }
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteMember}
        onClose={() => setDeleteMember(null)}
        onConfirm={handleDelete}
        title={isRTL ? 'حذف العضو' : 'Remove Member'}
        message={isRTL 
          ? `هل أنت متأكد من حذف "${deleteMember?.name}"؟`
          : `Are you sure you want to remove "${deleteMember?.name}"?`
        }
        confirmText={isRTL ? 'حذف' : 'Remove'}
        cancelText={isRTL ? 'إلغاء' : 'Cancel'}
        variant="danger"
        isRTL={isRTL}
      />
    </div>
  );
}

