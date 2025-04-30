import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('dashboard')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('networkOverview')}</h2>
          <div className="space-y-2">
            <p className="text-gray-600">{t('totalRoads')}: 1,234 km</p>
            <p className="text-gray-600">{t('underMaintenance')}: 45 km</p>
            <p className="text-gray-600">{t('plannedAssessment')}: 78 km</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('roadSurface')}</h2>
          <div className="space-y-3">
            <div className="pb-2 border-b border-gray-200">
              <p className="text-gray-800">{t('surfaceType')}: 沥青混凝土 (Asphalt Concrete)</p>
              <p className="text-gray-800">{t('lastInspection')}: 2024-03-15</p>
              <p className="text-gray-800">{t('condition')}: 良好 (Good)</p>
            </div>
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1594796582667-677292101837?auto=format&fit=crop&w=800&q=80"
                alt="Road surface condition"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('upcomingTasks')}</h2>
          <div className="space-y-3">
            <div className="pb-2 border-b border-gray-200">
              <p className="text-gray-800">Traffic Analysis - Urban Area C</p>
              <p className="text-sm text-gray-500">Due: March 20, 2024</p>
            </div>
            <div className="pb-2 border-b border-gray-200">
              <p className="text-gray-800">Maintenance Planning - Route D45</p>
              <p className="text-sm text-gray-500">Due: March 25, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;