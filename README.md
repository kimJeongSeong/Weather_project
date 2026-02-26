# 🐸 Weather Pixel Room 🌿

![홈페이지 메인 화면] 
<div align="center">
  <img width="80%" alt="site_window" src="https://github.com/user-attachments/assets/e7a0a318-407e-47f9-a68c-3bebd4f6f54c" />
</div>


> **"단순한 날씨 데이터를 넘어, 창문 너머의 감성을 시각화하다"**
> 
> 직접 찍어낸 픽셀 아트 가구와 식물들로 채워진 아늑한 가상방에 초대된 느낌으로 연출해보았습니다. 실시간 날씨 정보를 단순히 데이터로 나열하지 않고, 방 안의 창문을 통해 변화하는 풍경으로 연출한 **인터랙티브 날씨 플랫폼**입니다. ☁️☀️

---

## 📖 Project Overview

* **실시간 날씨 시각화**: OpenWeather API 기반 데이터를 활용해 창문 밖의 풍경(맑음, 구름, 비 등)이 실시간으로 변화합니다. 🌦️
* **100% 핸드메이드 픽셀 아트**: 포토샵, 일러스트, 프로크리에이트를 활용해 모든 오브젝트를 직접 픽셀 단위로 디자인했습니다. 🎨
* **레트로 인터랙션**: 방 안의 컴퓨터를 통해 뉴스, 게임, 타자 연습 등 실제 OS를 사용하는 듯한 몰입감을 제공합니다. ⌨️
* **생동감 있는 디테일**: 움직이는 **녹색 개구리 GIF**와 인테리어 조화를 고려한 **개구리 전자시계**가 방 안에 활력을 불어넣습니다. 🐸

---

## 🏗️ Component Architecture

React의 컴포넌트 기반 구조를 활용하여 각 오브젝트와 기능을 독립적으로 관리합니다.

---

## 🏗️ Project Directory Tree

프로젝트의 폴더 구조와 컴포넌트 간의 계층 로직입니다. `main.jsx`가 전체 홈페이지를 보여주는 진입점 역할을 수행합니다.

```text
weather_project
└── src
     ├── main.jsx (Entry Point - 홈페이지 메인 실행)
     ├── Home.jsx (Main Interior Layout - 전체 방 구조 통합)
         ├── weather_c
         │    ├── MainWeather.jsx (날씨 핵심 로직 관리)
         │    ├── WeatherSearch.jsx (도시 검색 및 API 통신)
         │    ├── Weather_1.jsx (현재 날씨 & 창문 풍경 시각화)
         │    ├── Weather_2.jsx (주간 예보 데이터 표시)
         │    └── Weather.css 
         │
         ├── Contents
         │    ├── Contents_home.jsx (가상 PC 메인 인터페이스)
         │    ├── Contents_nav.jsx (가상 PC 앱 네비게이션)
         │    ├── Contents.css
         │    └── Contents_list
         │         ├── News.jsx (실시간 뉴스 API 연동)
         │         ├── Game.jsx (Jumping Frog 미니 게임)
         │         ├── Fortune.jsx (Typing - 타자 연습 기능)
         │         ├── Thanks.jsx (overview 및 마무리 메시지)
         │         ├── Game.css
         │         └── Contests_total.css
         │
         ├── User
         │    └── User.jsx (개발자 픽셀 초상화 & TMI 정보 액자 & 생동감 있는 이미지)
         │
         ├── Watch.jsx (개구리 전자시계 컴포넌트)
         └── Project.css (전체 방 인테리어 스타일링)
```
---

## 🏠 **Key Interior Points**

### 🖼️ 친근한 인테리어, TMI 액자
생동감 있게 움직이는 개구리 GIF 위에는 제 얼굴을 직접 **도트 픽셀화한 액자**가 있습니다. 개발자의 정보(Name, Age, MBTI, Blood-Type)를 담아 개발자의 방으로 초대된 느낌으로 방문자에게 친근감을 줍니다.

### 🐸 디테일의 완성, 개구리 시계
에어컨 옆에는 실제 방 안의 소품처럼 구현된 **개구리 시계**가 있습니다. 인테리어의 전체적인 조화를 깨지 않도록 적절한 크기로 배치하여 디테일한 현장감을 살렸습니다.

### 📱 Responsive Design (Mobile Optimized)
iPhone과 iPad 규격에 맞춘 **미디어 쿼리(Media Queries)**를 적용하여 모바일 환경에서도 픽셀 아트의 감성을 온전히 느낄 수 있도록 최적화했습니다. 📱✨

---

## 🛠️ Tech Stack

* **Frontend**: `React` ⚛️
* **Design**: `Photoshop`, `Illustrator`, `Procreate` 🖌️
* **Deployment**: `GitHub Pages` 🚀

---

## 🔗 Live Demo

별도의 설치 없이 아래 주소에서 바로 개구리의 방을 방문해 보세요!

> **[Weather Pixel Room 바로가기](https://kimjeongseong.github.io/Weather_project/)** 🐸🌿

---

**"픽셀 하나하나에 정성을 담아, 당신의 오늘 날씨를 아늑한 풍경으로 선물합니다."** 🌷✨
