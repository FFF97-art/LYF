import warnings
import sys
warnings.filterwarnings('ignore')
from ultralytics import YOLO

if __name__ == '__main__':
    # 获取命令行参数（文件夹路径）
    folder_path = sys.argv[1] if len(sys.argv) > 1 else r'C:\Users\liangyi\Desktop\C'
    
    model = YOLO(r'runs\train\yolo11-C3k2-DySnakeConv_LADH_BiLevelRoutingAttention_nchw\weights\best.pt')
    
    # 使用传入的文件夹路径
    def_folder = folder_path + r'\def'
    
    model.predict(
        source=def_folder,
        imgsz=640,
        project=folder_path,
        name='results',
        save=True
    )