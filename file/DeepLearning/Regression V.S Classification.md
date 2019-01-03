
# Regression V.S. Classification
두 모델 모두 예측 문제이다. <br />
여기서 예측 문제란 데이터 기반으로 생성된 모델을 통해 <b>새로운 데이터가 들어왔을 때</b>, 어떤 값이 될 지 예측하는 문제이다.

## Regression

Regression의 예로 음식을 주문 해쓸 때, 배달이 올때까지 걸리는 시간을 예측하는 문제를 정할 수 있다. <br />
여기서 배달 시간은 예측하고자 하는 대상이고 이는 Dependent Variable 이고 그외 여러 정보들(음식점까지의 거리, 주문한 음식 갯 수, 음식의 종류 등)은 Independent Variable이다. <br />

### 정의
- Dependent Variable : 배달 시간
- Independent Variable : 여러 정보들 (음식점까지의 거리, 주문한 음식 갯 수, 음식의 종류 등)

### 수식
Y = θ<sub>1</sub>X<sub>1</sub> + θ<sub>2</sub>X<sub>2</sub> + ... + θ<sub>n</sub>X<sub>n</sub>
- Y : Dependent Variable
- X<sub>n</sub> : Independent Variable
- θ<sub>n</sub> : Weights (각 X의 값의 계수)

여기서 θ<sub>n</sub>는 X 변수의 중요도에 따른 가중치이다. <br />
예를 들어, 음식점까지의 거리, 음식 갯수, 음식 종류라는 3개의 변수가 있고 앞에 있는 순서대로 배달 시간에 영향을 준다고 가정할 수 있다. <br />
그럴 경우 거리를 0.5, 음식 갯수를 0.3, 음식 종류를 0.2 이런식으로 정의하여 X<sub>n</sub>에 가중치를 두어 예측할 수 있다.
