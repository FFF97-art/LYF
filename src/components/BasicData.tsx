import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Database, FileSpreadsheet, Users, Building2, Map } from 'lucide-react';

const BasicData: React.FC = () => {
  const { t } = useLanguage();

  const dataCards = [
    {
      icon: FileSpreadsheet,
      title: '道路基础信息',
      description: '包含道路编号、名称、等级、里程等基本信息',
      count: '1,234',
      unit: '条'
    },
    {
      icon: Map,
      title: '地理信息',
      description: '道路空间位置、走向、交叉口等地理数据',
      count: '856',
      unit: 'km'
    },
    {
      icon: Building2,
      title: '设施信息',
      description: '道路附属设施、交通标志标线等信息',
      count: '3,567',
      unit: '项'
    },
    {
      icon: Users,
      title: '管理人员',
      description: '道路管理和养护人员基本信息',
      count: '125',
      unit: '人'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('basicData')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dataCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <card.icon className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-semibold ml-3">{card.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-blue-600">{card.count}</span>
              <span className="text-gray-500 ml-2">{card.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Database className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">数据管理</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">数据类型</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">更新频率</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">最近更新</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">数据量</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">道路基础数据</td>
                <td className="px-6 py-4 text-sm text-gray-600">每月</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-03-15</td>
                <td className="px-6 py-4 text-sm text-gray-600">2.5 GB</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">正常</span>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">地理信息数据</td>
                <td className="px-6 py-4 text-sm text-gray-600">每季度</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-03-01</td>
                <td className="px-6 py-4 text-sm text-gray-600">5.8 GB</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">正常</span>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">设施信息数据</td>
                <td className="px-6 py-4 text-sm text-gray-600">每周</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-03-18</td>
                <td className="px-6 py-4 text-sm text-gray-600">1.2 GB</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">待更新</span>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">人员信息数据</td>
                <td className="px-6 py-4 text-sm text-gray-600">实时</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-03-20</td>
                <td className="px-6 py-4 text-sm text-gray-600">0.5 GB</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">正常</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BasicData;