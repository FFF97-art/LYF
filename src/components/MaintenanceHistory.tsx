import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { History, PenTool as Tool, AlertTriangle, CheckCircle2 } from 'lucide-react';

const MaintenanceHistory: React.FC = () => {
  const { t } = useLanguage();

  const maintenanceRecords = [
    {
      id: 1,
      date: '2024-03-15',
      type: '预防性养护',
      location: 'K10+500 - K11+200',
      description: '路面裂缝修补',
      cost: '25,000',
      status: '已完成'
    },
    {
      id: 2,
      date: '2024-02-28',
      type: '日常养护',
      location: 'K12+800 - K13+100',
      description: '路面清扫及小修',
      cost: '8,000',
      status: '已完成'
    },
    {
      id: 3,
      date: '2024-02-15',
      type: '专项养护',
      location: 'K15+200 - K16+000',
      description: '沥青路面修复',
      cost: '120,000',
      status: '已完成'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('maintenanceHistory')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Tool className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">总养护次数</h3>
              <p className="text-3xl font-bold text-blue-600 mt-1">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">待处理病害</h3>
              <p className="text-3xl font-bold text-yellow-600 mt-1">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">年度完成率</h3>
              <p className="text-3xl font-bold text-green-600 mt-1">85%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-6">
          <History className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">养护记录</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">日期</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">养护类型</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">位置</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">养护内容</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">费用 (元)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">状态</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((record) => (
                <tr key={record.id} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-800">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{record.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.cost}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">养护费用趋势</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">养护类型分布</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceHistory;