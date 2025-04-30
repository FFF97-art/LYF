import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import Cookies from 'js-cookie';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 这里是简单的示例验证，实际应用中应该连接到后端进行验证
    if (username === 'admin' && password === 'admin123') {
      Cookies.set('isLoggedIn', 'true', { expires: 1 }); // 设置登录状态，有效期1天
      onLogin();
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("https://raw.githubusercontent.com/lynb6688/github-mqbktjxy/main/public/intersection.jpg")',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlend: 'overlay'
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">道路管理系统</h1>
          <p className="text-gray-600 mt-2">请登录以继续</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入用户名"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入密码"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            登录
          </button>

          <div className="text-sm text-center text-gray-600">
            测试账号：admin / admin123
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;