import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import DefectDetection from './road-condition/DefectDetection';
import DetectionResults from './road-condition/DetectionResults';
import DetectionReport from './road-condition/DetectionReport';

const RoadCondition: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('roadCondition')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <DefectDetection />
    </div>
  );
};

export default RoadCondition;
