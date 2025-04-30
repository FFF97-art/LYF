import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Library, BookOpen, FileText, Brain } from 'lucide-react';

const DecisionSupport: React.FC = () => {
  const { t } = useLanguage();

  const knowledgeBase = [
    {
      id: 1,
      title: '路面裂缝修补指南',
      category: '养护技术',
      updateDate: '2024-03-15',
      views: 256
    },
    {
      id: 2,
      title: '预防性养护决策流程',
      category: '决策流程',
      updateDate: '2024-03-10',
      views: 189
    },
    {
      id: 3,
      title: '路面病害识别手册',
      category: '病害识别',
      updateDate: '2024-03-05',
      views: 324
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('decisionSupport')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">知识库文档</h3>
              <p className="text-3xl font-bold text-blue-600 mt-1">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">决策模型</h3>
              <p className="text-3xl font-bold text-purple-600 mt-1">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">标准规范</h3>
              <p className="text-3xl font-bold text-green-600 mt-1">45</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Library className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">知识库</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">标题</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">分类</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">更新日期</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">浏览量</th>
                  </tr>
                </thead>
                <tbody>
                  {knowledgeBase.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.updateDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">热门搜索</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">路面裂缝修补</span>
                <span className="text-gray-500">89次</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">预防性养护</span>
                <span className="text-gray-500">76次</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">病害识别</span>
                <span className="text-gray-500">65次</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">最新标准</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  《公路沥青路面养护技术规范》
                </p>
                <p className="text-gray-500 text-xs mt-1">2024-03-15</p>
              </div>
              <div className="text-sm">
                <p className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  《公路养护工程质量检验评定标准》
                </p>
                <p className="text-gray-500 text-xs mt-1">2024-03-10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSupport;