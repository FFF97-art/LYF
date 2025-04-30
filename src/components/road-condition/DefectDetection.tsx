import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { FolderOpen, Brain } from 'lucide-react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface ImagePair {
  def: string;
  gray: string;
  name: string;
  analysis?: string;
  location?: [number, number];
}

// 北二环西路的起始和结束坐标
const ROAD_START = [119.649506, 29.089524]; // 起点坐标
const ROAD_END = [119.669506, 29.089524];   // 终点坐标（向东5km）

const DefectDetection: React.FC = () => {
  const [imagePairs, setImagePairs] = useState<ImagePair[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [visibleImages, setVisibleImages] = useState<number>(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    const totalImages = imagePairs.length;
    const newVisibleImages = Math.ceil(totalImages * scrollPercentage);
    setVisibleImages(newVisibleImages);
  };

  const handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const folderPath = files[0].webkitRelativePath.split('/')[0];
    setSelectedFolder(folderPath);

    const defFiles: File[] = [];
    const grayFiles: File[] = [];

    files.forEach(file => {
      const path = file.webkitRelativePath;
      if (path.includes('/def/') && path.includes('Def')) {
        defFiles.push(file);
      } else if (path.includes('/gray/') && path.includes('Gray')) {
        grayFiles.push(file);
      }
    });

    defFiles.sort((a, b) => a.name.localeCompare(b.name));
    grayFiles.sort((a, b) => a.name.localeCompare(b.name));

    const pairs: ImagePair[] = defFiles.map((defFile, index) => {
      const grayFile = grayFiles[index];
      if (!grayFile) return null;
      return {
        def: URL.createObjectURL(defFile),
        gray: URL.createObjectURL(grayFile),
        name: defFile.name.split('/').pop() || '',
        location: [
          ROAD_START[0] + (index / defFiles.length) * (ROAD_END[0] - ROAD_START[0]),
          ROAD_START[1]
        ]
      };
    }).filter((pair): pair is ImagePair => pair !== null);

    setImagePairs(pairs);
    setVisibleImages(0);
  };

  const handleAnalyze = async () => {
    if (!selectedFolder) {
      alert('请先选择文件夹');
      return;
    }

    setIsAnalyzing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAnalyzing(false);
    } catch (error) {
      console.error('分析失败:', error);
      alert('分析失败');
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    AMapLoader.load({
      key: '1bf26ce046313c381a3f49e6ce15190a',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar']
    }).then((AMap) => {
      if (mapRef.current && !mapInstance.current) {
        const map = new AMap.Map(mapRef.current, {
          zoom: 14,
          center: [119.649506, 29.089524],
          viewMode: '3D'
        });

        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar());

        const polyline = new AMap.Polyline({
          path: [ROAD_START, ROAD_END],
          strokeColor: '#3B82F6',
          strokeWeight: 4,
          strokeOpacity: 0.6,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5]
        });

        map.add(polyline);
        mapInstance.current = map;
      }
    }).catch(e => {
      console.error('高德地图加载失败：', e);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.clearMap();

    const polyline = new window.AMap.Polyline({
      path: [ROAD_START, ROAD_END],
      strokeColor: '#3B82F6',
      strokeWeight: 4,
      strokeOpacity: 0.6,
      strokeStyle: 'dashed',
      strokeDasharray: [5, 5]
    });
    mapInstance.current.add(polyline);

    imagePairs.slice(0, visibleImages).forEach((pair, index) => {
      const marker = new window.AMap.Marker({
        position: pair.location,
        icon: new window.AMap.Icon({
          size: new window.AMap.Size(12, 12),
          image: `data:image/svg+xml;base64,${btoa(`<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5" fill="#3B82F6" stroke="white" stroke-width="1"/></svg>`)}`,
          imageSize: new window.AMap.Size(12, 12)
        }),
        offset: new window.AMap.Pixel(-6, -6)
      });

      if (index === visibleImages - 1) {
        marker.setIcon(new window.AMap.Icon({
          size: new window.AMap.Size(16, 16),
          image: `data:image/svg+xml;base64,${btoa(`<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" fill="#3B82F6" stroke="white" stroke-width="1"/></svg>`)}`,
          imageSize: new window.AMap.Size(16, 16)
        }));
        marker.setOffset(new window.AMap.Pixel(-8, -8));
      }

      mapInstance.current.add(marker);
    });
  }, [visibleImages, imagePairs]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div ref={mapRef} className="w-full h-[200px] rounded-lg" />
      </div>

      <div className="flex gap-4">
        <input
          ref={fileInputRef}
          type="file"
          webkitdirectory="true"
          directory=""
          multiple
          className="hidden"
          onChange={handleFolderSelect}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FolderOpen className="w-5 h-5 mr-2" />
          打开文件夹
        </button>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !selectedFolder}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            isAnalyzing || !selectedFolder
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <Brain className="w-5 h-5 mr-2" />
          {isAnalyzing ? '分析中...' : 'AI分析'}
        </button>
      </div>

      <div 
        className="grid grid-cols-2 gap-4 h-[calc(100vh-200px)] overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="space-y-0">
          {imagePairs.map((pair, index) => (
            <div key={`def-${index}`} className="relative image-container">
              <img
                src={pair.def}
                alt={`深度图 ${index + 1}`}
                className="w-full h-[300px] object-contain bg-gray-100"
                style={{ display: 'block' }}
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm font-mono">
                {pair.name.replace('.jpg', '')}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-0">
          {imagePairs.map((pair, index) => (
            <div key={`gray-${index}`} className="relative image-container">
              <img
                src={pair.gray}
                alt={`灰度图 ${index + 1}`}
                className="w-full h-[300px] object-contain bg-gray-100"
                style={{ display: 'block' }}
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm font-mono">
                {pair.name.replace('Def', 'Gray')}
              </div>
            </div>
          ))}
        </div>
        {imagePairs.length === 0 && (
          <div className="col-span-2 flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">请选择包含 def 和 gray 文件夹的目录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefectDetection;
