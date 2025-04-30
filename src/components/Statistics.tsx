import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BarChart, PieChart, LineChart, Download } from 'lucide-react';

const Statistics: React.FC = () => {
  const { t } = useLanguage();

  const monthlyData = [
    { month: '2024-01', maintenance: 12, cost: 150000, defects: 25 },
    { month: '2024-02', maintenance: 15, cost: 180000, defects: 28 },
    { month: '2024-03', maintenance: 10, cost: 120000, defects: 20 }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('statistics')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">月度统计</h2>
            </div>
            <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800">
              <Download className="w-4 h-4 mr-1" />
              导出
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">月份</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">养护次数</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">养护成本</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">病害数量</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.month}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.maintenance}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.defects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <PieChart className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">养护类型分布</h2>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">养护成本趋势</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">病害类型分布</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">养护效率分析</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <LineChart className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">年度对比</h2>
          </div>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>2024年</option>
              <option>2023年</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800">
              <Download className="w-4 h-4 mr-1" />
              导出报告
            </button>
          </div>
        </div>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          图表区域
        </div>
      </div>
    </div>
  );
};

export default Statistics;