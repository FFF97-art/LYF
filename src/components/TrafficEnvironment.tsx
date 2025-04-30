import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Car, Cloud, Wind, Thermometer, Droplets } from 'lucide-react';

const TrafficEnvironment: React.FC = () => {
  const { t } = useLanguage();

  const trafficData = {
    speed: '65',
    flow: '1,234',
    density: '28',
    congestion: '15'
  };

  const weatherData = {
    temperature: '24°C',
    humidity: '65%',
    windSpeed: '3.5m/s',
    rainfall: '0mm'
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('trafficEnvironment')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Car className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">实时交通状况</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">平均车速</p>
              <p className="text-2xl font-bold text-blue-600">{trafficData.speed} <span className="text-sm text-gray-500">km/h</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">交通流量</p>
              <p className="text-2xl font-bold text-blue-600">{trafficData.flow} <span className="text-sm text-gray-500">veh/h</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">交通密度</p>
              <p className="text-2xl font-bold text-blue-600">{trafficData.density} <span className="text-sm text-gray-500">veh/km</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">拥堵指数</p>
              <p className="text-2xl font-bold text-blue-600">{trafficData.congestion}%</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">交通流量趋势</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              图表区域
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Cloud className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">环境监测</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <Thermometer className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">温度</p>
                <p className="text-xl font-bold text-gray-800">{weatherData.temperature}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <Droplets className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">湿度</p>
                <p className="text-xl font-bold text-gray-800">{weatherData.humidity}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <Wind className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">风速</p>
                <p className="text-xl font-bold text-gray-800">{weatherData.windSpeed}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <Cloud className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">降雨量</p>
                <p className="text-xl font-bold text-gray-800">{weatherData.rainfall}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">24小时天气预报</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              图表区域
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">交通事件记录</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">时间</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">事件类型</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">位置</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">影响程度</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">2024-03-20 08:30</td>
                <td className="px-6 py-4 text-sm text-gray-800">交通拥堵</td>
                <td className="px-6 py-4 text-sm text-gray-600">K12+500</td>
                <td className="px-6 py-4 text-sm text-gray-600">中等</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">处理中</span>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">2024-03-20 09:15</td>
                <td className="px-6 py-4 text-sm text-gray-800">车辆故障</td>
                <td className="px-6 py-4 text-sm text-gray-600">K15+200</td>
                <td className="px-6 py-4 text-sm text-gray-600">轻微</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">已解决</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrafficEnvironment;