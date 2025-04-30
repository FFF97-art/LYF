import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const DetectionReport: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {language === 'zh' ? '检测报表' : 'Detection Report'}
      </h2>
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">
          {language === 'zh' 
            ? '此功能正在开发中...' 
            : 'This feature is under development...'}
        </p>
      </div>
    </div>
  );
};

export default DetectionReport;