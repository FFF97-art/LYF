import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LineChart, BarChart2, PieChart, TrendingUp } from 'lucide-react';

const MaintenanceEval: React.FC = () => {
  const { t } = useLanguage();

  const evaluationData = [
    {
      id: 1,
      section: 'K10+000 - K15+000',
      pci: 92,
      rqi: 88,
      cost: '150,000',
      efficiency: '95%'
    },
    {
      id: 2,
      section: 'K15+000 - K20+000',
      pci: 87,
      rqi: 85,
      cost: '180,000',
      efficiency: '92%'
    },
    {
      id: 3,
      section: 'K20+000 - K25+000',
      pci: 90,
      rqi: 86,
      cost: '165,000',
      efficiency: '93%'
    }
  
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('maintenanceEval')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <LineChart className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">平均PCI</h3>
              <p className="text-3xl font-bold text-blue-600 mt-1">89.7</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">平均RQI</h3>
              <p className="text-3xl font-bold text-green-600 mt-1">86.3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <PieChart className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">养护效率</h3>
              <p className="text-3xl font-bold text-purple-600 mt-1">93.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">投资回报率</h3>
              <p className="text-3xl font-bold text-orange-600 mt-1">2.5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">路段评估数据</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">路段</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">PCI</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">RQI</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">养护成本</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">养护效率</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-800">{item.section}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.pci}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.rqi}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.cost}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.efficiency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">评估指标分布</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">PCI分布</h3>
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                图表区域
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">RQI分布</h3>
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                图表区域
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">养护效果趋势</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">成本效益分析</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            图表区域
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceEval;