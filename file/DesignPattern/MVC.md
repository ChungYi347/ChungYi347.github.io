# MVC in Python
## What is the MVC?
> MVC : Model-View-Controller - 어플리케이션을 Model, View, Controller로 세 부분으로 나누는 것이다.
> Model : Data나 Business Logic 담당
> View : 컨트롤러를 통해 모델로 부터 받은 데이터를 시각화
> Controller : 요청을 통해 데이터를 받고 다른 부분으로 전달

![alt text](image/mvc.png)
사용자가 Controller 요청 -> 데이터 생성, 갱신, 삭제 등 Model 조작 -> 결과를 Controller에 전달 -> View가 다시 시각화하여 사용자에게 결과 보여줌

> View 와 Controller는 Model의 의존
> Model은 View와 Controller의 독립
> ==> Model에 대한 작업을 할 때 다른 부분 영향 X

### Advantages
> 세 부분으로 나눔으로써 의존성이 낮음 -> 분업 용이

Model (models.py)

- Candidate 클래스의 형식 그대로 DB에 저장하거나 불러오는 경우

View (templates)

- 화면에 어떤 장면을 보여줄지 (index.html)

Controller (views.py)

- Candidate 모델에서 데이터를 읽어 index.html에 전달

# MVC in Django
> 장고는 MTV (Model-Template-View)를 사용함
> Model = 장고 Model : 클래스 형식으로 데이터 베이스 저장 또는 불러옴
> View = 장고 Template : 화면에 보여줄 장면 정함 (ex. index.html)
> Controller = 장고 View : Model 에서 데이터 읽어서 장고의 Template으로 전달
