import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'roadManagement': 'Road Management',
    'roadProfile': 'Road Profile',
    'basicData': 'Basic Data',
    'trafficEnvironment': 'Traffic Environment',
    'roadCondition': 'Road Condition Assessment',
    'maintenanceHistory': 'Maintenance History',
    'decisionSupport': 'Decision Support Library',
    'maintenanceEval': 'Maintenance Evaluation',
    'statistics': 'Statistical Reports',
    'dashboard': 'Dashboard',
    'welcome': 'Welcome to the Road Management System',
    'networkOverview': 'Road Network Overview',
    'totalRoads': 'Total Roads',
    'underMaintenance': 'Under Maintenance',
    'plannedAssessment': 'Planned Assessment',
    'recentActivities': 'Recent Activities',
    'upcomingTasks': 'Upcoming Tasks',
    'roadSurface': 'Road Surface Condition',
    'surfaceType': 'Surface Type',
    'lastInspection': 'Last Inspection',
    'condition': 'Current Condition',
    'roadDetails': 'Road Details',
    'roadName': 'Road Name',
    'roadLength': 'Length',
    'roadType': 'Road Type',
    'lanes': 'Number of Lanes',
    'maintenanceStatus': 'Maintenance Status',
    'lastMaintenance': 'Last Maintenance',
    'nextInspection': 'Next Inspection',
    'good': 'Good',
    'highway': 'Highway',
    'performance': 'Performance',
    'maintenance': 'Maintenance',
    'trafficVolume': 'Traffic Volume',
    'specifications': 'Specifications',
    'dailyTraffic': 'Daily Traffic',
    'peakHourVolume': 'Peak Hour Volume',
    'truckPercentage': 'Truck Percentage',
    'averageSpeed': 'Average Speed',
    'maintenanceCost': 'Maintenance Cost',
    'repairFrequency': 'Repair Frequency',
    'lastRepair': 'Last Repair',
    'nextMaintenance': 'Next Maintenance',
    'pci': 'PCI (Pavement Condition Index)',
    'rqi': 'RQI (Ride Quality Index)',
    'rdi': 'RDI (Rutting Depth Index)',
    'sri': 'SRI (Skid Resistance Index)',
    'pssi': 'PSSI (Pavement Structure Strength Index)',
    'pwi': 'PWI (Pavement Width Index)',
    'pqi': 'PQI (Pavement Quality Index)',
    'defectDetection': 'Defect Detection',
    'detectionResults': 'Detection Results',
    'detectionReport': 'Detection Report'
  },
  zh: {
    'roadManagement': '道路管理',
    'roadProfile': '道路概况',
    'basicData': '基础数据',
    'trafficEnvironment': '交通环境',
    'roadCondition': '路况评估',
    'maintenanceHistory': '维护历史',
    'decisionSupport': '决策支持库',
    'maintenanceEval': '维护评估',
    'statistics': '统计报告',
    'dashboard': '仪表板',
    'welcome': '欢迎使用道路管理系统',
    'networkOverview': '道路网络概览',
    'totalRoads': '道路总长',
    'underMaintenance': '维护中',
    'plannedAssessment': '计划评估',
    'recentActivities': '近期活动',
    'upcomingTasks': '待办任务',
    'roadSurface': '路面状况',
    'surfaceType': '路面类型',
    'lastInspection': '最近检查',
    'condition': '当前状况',
    'roadDetails': '道路详情',
    'roadName': '道路名称',
    'roadLength': '长度',
    'roadType': '道路类型',
    'lanes': '车道数',
    'maintenanceStatus': '维护状态',
    'lastMaintenance': '上次维护',
    'nextInspection': '下次检查',
    'good': '良好',
    'highway': '高速公路',
    'performance': '性能指标',
    'maintenance': '养护情况',
    'trafficVolume': '交通流量',
    'specifications': '技术指标',
    'dailyTraffic': '日均交通量',
    'peakHourVolume': '高峰小时流量',
    'truckPercentage': '货车比例',
    'averageSpeed': '平均车速',
    'maintenanceCost': '养护成本',
    'repairFrequency': '维修频率',
    'lastRepair': '上次维修',
    'nextMaintenance': '下次养护',
    'pci': 'PCI (路面状况指数)',
    'rqi': 'RQI (行驶质量指数)',
    'rdi': 'RDI (车辙深度指数)',
    'sri': 'SRI (抗滑指数)',
    'pssi': 'PSSI (路面结构强度指数)',
    'pwi': 'PWI (路面宽度指数)',
    'pqi': 'PQI (路面质量指数)',
    'defectDetection': '病害检测',
    'detectionResults': '检测结果',
    'detectionReport': '检测报表'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh'); // 默认设置为中文

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
