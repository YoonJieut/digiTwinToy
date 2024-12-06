# scripts/check_filenames.py

import os
import re

def is_garbled(filename):
    """
    파일 이름이 깨졌는지 여부를 판단합니다.
    
    조건:
    - 파일 이름에 Unicode 대체 문자(U+FFFD, �)가 포함되어 있는지 확인
    - 파일 이름에 한글 문자(U+AC00 ~ U+D7A3)가 포함되어 있는지 확인
    
    Parameters:
    - filename (str): 검사할 파일 이름
    
    Returns:
    - bool: 깨졌다면 True, 그렇지 않다면 False
    """
    # 대체 문자 확인
    if '�' in filename:
        return True
    
    # 한글 문자 패턴
    hangul_pattern = re.compile(r'[\uac00-\ud7a3]')
    hangul_matches = hangul_pattern.findall(filename)
    
    # 한글 문자가 하나도 없으면 깨진 것으로 간주
    if not hangul_matches:
        return True
    
    # 한글 문자의 비율이 낮으면 깨진 것으로 간주 (예: 전체 문자 중 한글이 30% 미만)
    total_chars = len(filename)
    hangul_count = len(hangul_matches)
    if (hangul_count / total_chars) < 0.3:
        return True
    
    return False

def check_filenames(csv_dir):
    """
    지정된 디렉토리 내의 모든 파일 이름을 검사하여 깨진 파일 이름을 식별합니다.
    
    Parameters:
    - csv_dir (str): CSV 파일이 저장된 디렉토리 경로
    """
    print(f"CSV 디렉토리: {csv_dir}\n")
    print(f"{'파일 이름':<50} {'깨짐 여부':<10}")
    print("-" * 60)
    
    for filename in os.listdir(csv_dir):
        file_path = os.path.join(csv_dir, filename)
        if os.path.isfile(file_path):
            garbled = is_garbled(filename)
            status = "깨짐" if garbled else "정상"
            print(f"{filename:<50} {status:<10}")

if __name__ == "__main__":
    # 스크립트가 실행되는 위치를 기준으로 프로젝트 루트 경로 설정
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, '..'))
    
    # CSV 디렉토리 경로 설정
    csv_directory = os.path.join(project_root, 'data', 'csv')
    
    # CSV 디렉토리가 존재하는지 확인
    if not os.path.exists(csv_directory):
        print(f"오류: CSV 디렉토리 '{csv_directory}'가 존재하지 않습니다.")
    else:
        check_filenames(csv_directory)
