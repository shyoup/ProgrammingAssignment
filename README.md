# ProgrammingAssignment
Frontend Team PA - Advanced

[Start]
- git reset --hard 8bca4c003a566f97686192a8b07f774cdcf630d9
- npm run start



React + TypeScript + Mobx 를 사용했습니다.
Mobx를 통해 state를 사용하기 위해 useStore라는 hook을 만들어서 사용하였습니다.

디자인을 위해서는 MUI의 TreeView와 Tab을 사용하였습니다.

업로드는 + 버튼을 이용하고 다운로드는 Download 버튼을 이용하시면 됩니다.

미구현 사항

* 이미지
  
  * 이미지 뷰어 및 다운로드 시 이미지 파일 깨짐
  * 파일 깨짐의 원인은 이미지 파일의 데이터를 binary 데이터로 받아오지 않고 string으로 받아와 저장하기 때문

* 확장자 별 monaco language 설정

트리 구조

fileStore에서 folders를 관리하고 있습니다.
이 folders의 children 인스턴스를 통해 계층 관계를 표현하였습니다
children이 있다면 TreeView 컴포넌트의 children prop으로 넘겨주는 방식으로 파일 트리를 구현하였습니다.

파일 정보
File.ts에서 FileModel를 정의하였습니다.
파일이 로드되면 id, name, content, type 정보를 가지고 있습니다.
model 정보는 monaco의 model 정보 입니다.

탭
트리와 탭을 위해 현재 보고 있는 file id를 관리하였습니다.
트리 뷰에서 파일을 선택하거나 탭에서 파일을 선택 시 화면을 전환(monaco model 전환)을 위함입니다.

부족한 실력이지만 재밌게 그리고 열심히 작업하였습니다.
감사합니다.

기간 (22.01.16 pm12시) 내에 제출한 커밋은 8bca4c003a566f97686192a8b07f774cdcf630d9 입니다.
이후 커밋은 추가적으로 마무리 짓기 위해 작업한 내용들입니다.
