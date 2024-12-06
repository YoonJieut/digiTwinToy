# scripts/convert_excel_to_csv.py
import os
import pandas as pd

def convert_excel_to_csv(excel_dir, csv_dir):
    if not os.path.exists(csv_dir):
        os.makedirs(csv_dir)
        print(f"생성된 디렉토리: {csv_dir}")
    
    for filename in os.listdir(excel_dir):
        if filename.endswith('.xlsx') or filename.endswith('.xls'):
            excel_path = os.path.join(excel_dir, filename)
            base_name = os.path.splitext(filename)[0]
            csv_filename = f"{base_name}.csv"
            csv_path = os.path.join(csv_dir, csv_filename)
            
            print(f"처리 중: {excel_path}")
            
            try:
                df = pd.read_excel(excel_path, engine='openpyxl')
                print(f"읽기 성공: {excel_path}")
                
                df.to_csv(csv_path, index=False, encoding='utf-8-sig')
                print(f"저장 성공: {csv_path}")
            except Exception as e:
                print(f"변환 실패: {excel_path} -> {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, '..'))
    
    excel_directory = os.path.join(project_root, 'data', 'excel')
    csv_directory = os.path.join(project_root, 'data', 'csv')
    
    print(f"엑셀 디렉토리: {excel_directory}")
    print(f"CSV 디렉토리: {csv_directory}")
    
    convert_excel_to_csv(excel_directory, csv_directory)
