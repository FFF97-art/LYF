const express = require('express');
const cors = require('cors');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 处理图片分析请求的路由
app.post('/api/analyze', (req, res) => {
    const { folderPath } = req.body;
    
    // Python 脚本的选项
    let options = {
        mode: 'text',
        pythonPath: 'python',
        pythonOptions: ['-u'], // 不缓冲输出
        scriptPath: 'D:/ultralytics-yolo11-main', // 修改为您的 Python 脚本所在目录
        args: [folderPath]
    };

    PythonShell.run('detect.py', options).then(messages => {
        res.json({ success: true, messages });
    }).catch(err => {
        console.error('Python script error:', err);
        res.status(500).json({ success: false, error: err.message });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});