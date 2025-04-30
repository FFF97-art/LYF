import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, AlertTriangle, BarChart, Car, Table, X, Map } from 'lucide-react';
import AMapLoader from '@amap/amap-jsapi-loader';

// 时间轴数据
const timelineData = [
  { id: 1, date: '2023-01', label: '2023年1月' },
  { id: 2, date: '2023-02', label: '2023年2月' },
  { id: 3, date: '2023-03', label: '2023年3月' },
  { id: 4, date: '2023-04', label: '2023年4月' },
  { id: 5, date: '2023-05', label: '2023年5月' },
  { id: 6, date: '2023-06', label: '2023年6月' },
  { id: 7, date: '2023-07', label: '2023年7月' },
  { id: 8, date: '2023-08', label: '2023年8月' },
  { id: 9, date: '2023-09', label: '2023年9月' },
  { id: 10, date: '2023-10', label: '2023年10月' },
  { id: 11, date: '2023-11', label: '2023年11月' },
  { id: 12, date: '2023-12', label: '2023年12月' },
];

// 道路分段基础数据
const baseRoadSegments = [
  {
    start: [119.634872, 29.127413],
    end: [119.638872, 29.128913],
  },
  {
    start: [119.638872, 29.128913],
    end: [119.642872, 29.129913],
  },
  {
    start: [119.642872, 29.129913],
    end: [119.646872, 29.130913],
  },
  {
    start: [119.646872, 29.130913],
    end: [119.65281, 29.132867],
  }
];

// 更新路面病害数据点的位置
const roadDefects = [
  {
    id: 1,
    position: [119.639894, 29.128941],
    type: '裂缝',
    severity: '轻微',
    area: '2.5m²',
    lastInspection: '2024-03-01'
  },
  {
    id: 2,
    position: [119.641214, 29.129452],
    type: '坑洞',
    severity: '中等',
    area: '1.2m²',
    lastInspection: '2024-03-05'
  },
  {
    id: 3,
    position: [119.642169, 29.129822],
    type: '车辙',
    severity: '严重',
    area: '5.0m²',
    lastInspection: '2024-03-10'
  },
  {
    id: 4,
    position: [119.642764, 29.130038],
    type: '龟裂',
    severity: '中等',
    area: '3.8m²',
    lastInspection: '2024-03-12'
  }
];

// 热力图数据
const getHeatmapData = () => {
  return roadDefects.map(defect => ({
    lng: defect.position[0],
    lat: defect.position[1],
    count: defect.severity === '严重' ? 100 : defect.severity === '中等' ? 60 : 30
  })).filter(data => data.lng && data.lat);
};

// 获取路段颜色
const getSegmentColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return '#4ADE80'; // 绿色
    case 'medium':
      return '#FBBF24'; // 黄色
    case 'high':
      return '#EF4444'; // 红色
    default:
      return '#4ADE80';
  }
};

// 生成随机严重程度
const getRandomSeverity = () => {
  const severities = ['low', 'medium', 'high'];
  return severities[Math.floor(Math.random() * severities.length)];
};

// 生成指定月份的路段数据
const generateRoadSegments = () => {
  return baseRoadSegments.map(segment => ({
    ...segment,
    severity: getRandomSeverity()
  }));
};

interface DefectReportModalProps {
  defect: typeof roadDefects[0] | null;
  onClose: () => void;
  onSubmit: (phone: string, notes: string) => void;
}

const DefectReportModal: React.FC<DefectReportModalProps> = ({ defect, onClose, onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!defect) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phone, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">路面病害报告</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">病害类型</label>
                <input
                  type="text"
                  value={defect.type}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">严重程度</label>
                <input
                  type="text"
                  value={defect.severity}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">面积</label>
                <input
                  type="text"
                  value={defect.area}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">检查日期</label>
                <input
                  type="text"
                  value={defect.lastInspection}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">坐标</label>
              <input
                type="text"
                value={defect.position.join(', ')}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入联系电话"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="请输入备注信息"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              发送
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RoadProfile: React.FC = () => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const infoWindow = useRef<any>(null);
  const [hoveredDefect, setHoveredDefect] = useState<number | null>(null);
  const [selectedDefect, setSelectedDefect] = useState<typeof roadDefects[0] | null>(null);
  const markersRef = useRef<any[]>([]);
  const [mapType, setMapType] = useState<'normal' | 'satellite'>('normal');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const heatmapLayer = useRef<any>(null);
  const polylines = useRef<any[]>([]);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const animationRef = useRef<number>();
  const lastMouseMoveTime = useRef<number>(Date.now());
  const isMouseMoving = useRef<boolean>(false);

  const updateRoadSegments = useCallback((segments: typeof baseRoadSegments) => {
    if (!mapInstance.current) return;

    // 清除现有的路线
    polylines.current.forEach(polyline => {
      mapInstance.current.remove(polyline);
    });
    polylines.current = [];

    // 添加新的路线
    segments.forEach((segment) => {
      const polyline = new window.AMap.Polyline({
        path: [segment.start, segment.end],
        strokeColor: getSegmentColor(segment.severity),
        strokeWeight: 8,
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        showDir: true
      });
      
      polylines.current.push(polyline);
      mapInstance.current.add(polyline);
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      lastMouseMoveTime.current = Date.now();
      isMouseMoving.current = true;
    };

    const checkMouseMovement = () => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime.current > 1000) {
        isMouseMoving.current = false;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    const movementInterval = setInterval(checkMouseMovement, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(movementInterval);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isPaused && !isMouseMoving.current) {
        setCurrentTimeIndex(prev => (prev + 1) % timelineData.length);
        updateRoadSegments(generateRoadSegments());
      }
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(animate, 2000); // 每2秒更新一次
      });
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, updateRoadSegments]);

  useEffect(() => {
    AMapLoader.load({
      key: '1bf26ce046313c381a3f49e6ce15190a',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.InfoWindow', 'AMap.HeatMap']
    }).then((AMap) => {
      if (mapRef.current && !mapInstance.current) {
        const map = new AMap.Map(mapRef.current, {
          zoom: 15,
          center: [119.641214, 29.129452],
          viewMode: '3D',
          mapStyle: mapType === 'normal' ? 'amap://styles/normal' : 'amap://styles/satellite'
        });

        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar());

        infoWindow.current = new AMap.InfoWindow({
          isCustom: true,
          autoMove: true,
          offset: new AMap.Pixel(0, -20)
        });

        // 创建热力图实例
        heatmapLayer.current = new AMap.HeatMap(map, {
          radius: 25,
          opacity: [0, 0.8],
          gradient: {
            0.4: 'rgb(0, 255, 0)',
            0.65: 'rgb(255, 255, 0)',
            0.85: 'rgb(255, 165, 0)',
            1.0: 'rgb(255, 0, 0)'
          }
        });

        // 初始化路段
        const initialSegments = generateRoadSegments();
        initialSegments.forEach((segment) => {
          const polyline = new AMap.Polyline({
            path: [segment.start, segment.end],
            strokeColor: getSegmentColor(segment.severity),
            strokeWeight: 8,
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
            showDir: true
          });
          
          polylines.current.push(polyline);
          map.add(polyline);
        });

        // 为每个病害点创建标记
        roadDefects.forEach((defect) => {
          let markerColor = '#4ADE80'; // 轻微 - 绿色
          if (defect.severity === '中等') {
            markerColor = '#FBBF24'; // 中等 - 黄色
          } else if (defect.severity === '严重') {
            markerColor = '#EF4444'; // 严重 - 红色
          }

          const marker = new AMap.Marker({
            position: defect.position,
            icon: new AMap.Icon({
              size: new AMap.Size(16, 16),
              image: `data:image/svg+xml;base64,${btoa(`<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" fill="${markerColor}" stroke="white" stroke-width="2"/></svg>`)}`,
              imageSize: new AMap.Size(16, 16)
            }),
            offset: new AMap.Pixel(-8, -8),
            title: defect.type,
            cursor: 'pointer'
          });

          marker.on('mouseover', () => {
            setHoveredDefect(defect.id);
            const content = `
              <div class="bg-white p-4 rounded-lg shadow-lg min-w-[200px]">
                <h3 class="font-semibold text-gray-800 mb-2">路面病害信息</h3>
                <div class="space-y-1">
                  <p class="text-sm"><span class="text-gray-600">病害类型:</span> ${defect.type}</p>
                  <p class="text-sm"><span class="text-gray-600">严重程度:</span> 
                    <span style="color: ${markerColor}">${defect.severity}</span>
                  </p>
                  <p class="text-sm"><span class="text-gray-600">病害面积:</span> ${defect.area}</p>
                  <p class="text-sm"><span class="text-gray-600">最近检查:</span> ${defect.lastInspection}</p>
                  <p class="text-sm"><span class="text-gray-600">坐标:</span> ${defect.position.join(', ')}</p>
                </div>
              </div>
            `;
            infoWindow.current.setContent(content);
            infoWindow.current.open(map, defect.position);
          });

          marker.on('mouseout', () => {
            setHoveredDefect(null);
            infoWindow.current.close();
          });

          marker.on('click', () => {
            setSelectedDefect(defect);
          });

          map.add(marker);
          markersRef.current.push(marker);
        });

        mapInstance.current = map;
      }
    }).catch(e => {
      console.error('高德地图加载失败：', e);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
        markersRef.current = [];
        polylines.current = [];
      }
    };
  }, [mapType]);

  useEffect(() => {
    if (heatmapLayer.current) {
      if (showHeatmap) {
        const heatmapData = getHeatmapData();
        heatmapLayer.current.setDataSet({
          data: heatmapData,
          max: 100
        });
        heatmapLayer.current.show();
      } else {
        heatmapLayer.current.hide();
      }
    }
  }, [showHeatmap]);

  const handleReportSubmit = (phone: string, notes: string) => {
    console.log('Report submitted:', { defect: selectedDefect, phone, notes });
    alert('发送成功！');
    setSelectedDefect(null);
  };

  const renderIndicator = (label: string, value: string | number, color: string) => (
    <div className="flex justify-between items-center border-b border-gray-100 py-2">
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${color}`}>{value}</span>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('roadProfile')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setMapType('normal')}
                  className={`px-4 py-2 rounded-md ${
                    mapType === 'normal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  普通地图
                </button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-4 py-2 rounded-md ${
                    mapType === 'satellite'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  卫星地图
                </button>
              </div>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-4 py-2 rounded-md ${
                  showHeatmap
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showHeatmap ? '隐藏热力图' : '显示热力图'}
              </button>
            </div>
            <div ref={mapRef} className="w-full h-[400px] rounded-lg" style={{ width: '100%' }} />
            
            <div className="mt-4">
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {isPaused ? '继续播放' : '暂停播放'}
                  </button>
                  <span className="text-gray-600">
                    {hoveredDate || timelineData[currentTimeIndex].label}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {timelineData.map((time, index) => (
                    <div
                      key={time.id}
                      className={`flex-1 h-2 rounded cursor-pointer transition-all duration-200 ${
                        index === currentTimeIndex
                          ? 'bg-blue-600'
                          : index < currentTimeIndex
                          ? 'bg-blue-300'
                          : 'bg-gray-200'
                      }`}
                      onMouseEnter={() => {
                        setHoveredDate(time.label);
                        setIsPaused(true);
                        setCurrentTimeIndex(index);
                        updateRoadSegments(generateRoadSegments());
                      }}
                      onMouseLeave={() => {
                        setHoveredDate(null);
                        setIsPaused(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <Table className="w-5 h-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">路面病害数据</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">病害类型</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">严重程度</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">面积</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">检查日期</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">坐标</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roadDefects.map((defect) => (
                        <tr 
                          key={defect.id}
                          className={`border-t border-gray-200 hover:bg-gray-50 ${
                            hoveredDefect === defect.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.severity}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.area}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.lastInspection}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.position.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">道路详情</h2>
            <div className="space-y-3">
              {renderIndicator('道路名称', 'G318', 'text-gray-800')}
              {renderIndicator('长度', '5.2 km', 'text-gray-800')}
              {renderIndicator('道路类型', '高速公路', 'text-gray-800')}
              {renderIndicator('车道数', '4', 'text-gray-800')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">性能指标</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator('PCI (路面状况指数)', '92/100', 'text-green-600')}
            {renderIndicator('RQI (行驶质量指数)', '88/100', 'text-green-600')}
            {renderIndicator('PQI (路面质量指数)', '90/100', 'text-green-600')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">养护情况</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator('养护成本', '¥250,000', 'text-gray-800')}
            {renderIndicator('维修频率', '2/year', 'text-gray-800')}
            {renderIndicator('下次养护', '2024-05-15', 'text-blue-600')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Car className="w-5 h-5 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">交通流量</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator('日均交通量', '45,000', 'text-gray-800')}
            {renderIndicator('高峰小时流量', '3,200', 'text-gray-800')}
            {renderIndicator('货车比例', '15%', 'text-gray-800')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <BarChart className="w-5 h-5 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">技术指标</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator('RDI (车辙深度指数)', '95/100', 'text-green-600')}
            {renderIndicator('SRI (抗滑指数)', '87/100', 'text-green-600')}
            {renderIndicator('PSSI (路面结构强度指数)', '93/100', 'text-green-600')}
            {renderIndicator('PWI (路面宽度指数)', '89/100', 'text-green-600')}
          </div>
        </div>
      </div>

      {selectedDefect && (
        <DefectReportModal
          defect={selectedDefect}
          onClose={() => setSelectedDefect(null)}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
};

export default RoadProfile;