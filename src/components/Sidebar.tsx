import React, { useState } from 'react';
import { Loader as Road2, Database, Car, ClipboardCheck, History, Library, LineChart, BarChart3, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onPageChange, currentPage }) => {
  const { t } = useLanguage();
  const [isRoadConditionOpen, setIsRoadConditionOpen] = useState(true);

  const menuItems = [
    { id: 'roadProfile', icon: Road2, label: t('roadProfile') },
    { id: 'basicData', icon: Database, label: t('basicData') },
    { id: 'trafficEnvironment', icon: Car, label: t('trafficEnvironment') },
    {
      id: 'roadCondition',
      icon: ClipboardCheck,
      label: t('roadCondition'),
      subItems: [
        { id: 'detection', label: '病害检测' },
        { id: 'results', label: '检测结果' },
        { id: 'report', label: '检测报表' }
      ]
    },
    { id: 'maintenanceHistory', icon: History, label: t('maintenanceHistory') },
    { id: 'decisionSupport', icon: Library, label: t('decisionSupport') },
    { id: 'maintenanceEval', icon: LineChart, label: t('maintenanceEval') },
    { id: 'statistics', icon: BarChart3, label: t('statistics') },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'roadCondition') {
      setIsRoadConditionOpen(!isRoadConditionOpen);
      onPageChange('detection'); // 默认选中病害检测
    } else {
      onPageChange(itemId);
    }
  };

  return (
    <div
      className={`fixed left-0 h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className={`font-bold ${isOpen ? 'block' : 'hidden'}`}>{t('roadManagement')}</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item.id);
              }}
              className={`flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                currentPage === item.id || (item.id === 'roadCondition' && currentPage === 'detection')
                  ? 'bg-gray-800 text-white'
                  : ''
              }`}
            >
              <div className="flex items-center">
                <item.icon size={20} />
                <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>
                  {item.label}
                </span>
              </div>
              {item.subItems && isOpen && (
                <div className="ml-2">
                  {isRoadConditionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              )}
            </a>
            {item.subItems && isOpen && isRoadConditionOpen && (
              <div className="bg-gray-800">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(subItem.id);
                    }}
                    className={`flex items-center pl-12 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                      currentPage === subItem.id ? 'bg-gray-700 text-white' : ''
                    }`}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
