# Stick With Me Sweets Macro

이 파이썬 매크로는 "Stick With Me Sweets" 웹 사이트에서 특정 작업을 자동화하는 도구입니다.

## 폴더 구조
- `chromedriver_mac64/`
- `chromedriver_win32/`
- `setup.sh`
- `swmsweets.macro.py`

## 실행 방법

1. `setup.sh`를 실행하여 파이썬 가상환경을 설치합니다.
2. 가상환경을 실행하기 위해 터미널에서 `source ft_env/bin/activate` 명령어를 실행합니다.
3. `swmsweets.macro.py` 파일에서 다음 변수들을 커스터마이즈합니다:
   - `folder`: 현재 디렉토리 경로를 입력합니다. (윈도우의 경우 `cwd`로 변경)
   - `chromedriver`: 사용 중인 운영 체제와 크롬 버전에 맞는 `chromedriver` 경로를 입력합니다. (macOS의 경우 `chromedriver_mac64/chromedriver`, Windows의 경우 `chromedriver_win32/chromedriver.exe`)
4. 만약 사용 중인 운영 체제와 크롬 버전에 맞는 `chromedriver`가 없다면:
   - 크롬 버전을 확인합니다.
   - [ChromeDriver 다운로드 페이지](https://sites.google.com/chromium.org/driver/downloads?authuser=0)에 접속하여 운영 체제와 크롬 버전에 맞는 `chromedriver`를 다운로드합니다.
   - 3번의 `chromedriver` 경로를 수정합니다.
5. count에 총 실행 횟수를 적어주세요.
6. `sudo python3 swmsweets.macro.py`를 통해 실행해주세요. 윈도우의 경우 명령어가 다를 수 있습니다.

- 오류가 발생한다면 kwanho0096@gmail.com으로 문의주세요.

## 기술 스택
- `Python`
- `Selenium`