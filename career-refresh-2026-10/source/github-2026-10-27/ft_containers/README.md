# ft_containers
STL(Standard Template Library)에 구현되어있는 자료형인 **vector, stack, map**을 구현하였습니다.<br>
언어는 cpp을 사용하였으며, [cpp reference](https://en.cppreference.com/w/) 사이트의 명세들을 참고하였습니다.<br>

## Details
### 1. vector
vector는 수정작업에 더욱 편리하도록 만들어진 동적 배열입니다.<br>
그렇기에 배열과 유사하게 **직접 접근, tail에 추가/삭제가 용이** 하다는 장점이 있습니다.<br>
다만 중간 삽입 시의 비효율성과 검색 속도 저하 등의 단점도 존재합니다.<br>

### 2. stack
매우 유명한 자료구조 stack은 **LIFO(last in first out)** 형식의 간단한 자료구조입니다.<br>
한 쪽 끝에서만 자료 추가/삭제가 가능하며, 이 연산의 소요 시간이 상수 시간이라는 점에서 특정 상황에서 배열보다 적합할 수 있습니다.<br>

### 3. map
map은 **pair<key, value>** 쌍을 원소으로써 저장하는 자료구조입니다.<br>
key 값은 중복을 허용하지 않으며, 값 삽입 시 key 값을 기준으로 자동 정렬됩니다.<br>
따라서 값 검색 시의 시간을 단축할 수 있습니다.<br>
기존 stl의 맵은 자가 균형 이진 탐색 트리인 red-black 트리로 구현되었습니다.<br>
이 트리는 스스로 검정색-빨강색 룰을 통해 균형을 맞추며, 이로 인해 평균 연산 속도가 `O(log N)`이 됩니다.<br>
다만 이 프로젝트에서는 Balance Factor를 이용해 자가 균형 이진 탐색 트리인 **AVL 트리**를 이용하여 구현하였습니다.<br>

## Folder Structure
```
📄 Makefile                   : 프로젝트 실행을 위한 명령어 정의 파일
📄 rotations_avl.txt          : AVL 트리 회전 방식을 설명하는 텍스트 파일
📁 test_srcs                  : 실제 stl의 컨테이너와 제작한 ft_container의 실행 결과를 비교하기 위한 main 소스 코드
   📁 map               
   📁 stack             
   📁 vector            
   📄 containers.hpp           
   📄 main.cpp          
📁 includes                   : ft_container의 소스 파일들 (.hpp 파일로만 구성 되어 있음)
   📄 ft.hpp                  : 필요한 header file들을 모두 include함
   📄 utils.hpp               : 범용적으로 필요한 compare, enable_if 등
   📄 iterators.hpp           : vector와 map에 사용할 iterator
   📄 reverse_iterators.hpp   : vector와 map에 사용할 reverse_iterator
   📄 vector.hpp              : vector 자료형
   📄 stack.hpp               : stack 자료형(기존 vector를 사용하여 간단히 구현)
   📄 pair.hpp                : map에 사용할 pair 자료형
   📄 Tree.hpp                : map에 사용할 avl-tree
   📄 map.hpp                 : map 자료형
```

## Run-Environment
```
MacOS, Linux
```

## How-to-run
### 1. clone the repository
```
git clone https://github.com/KKWANH/ft_containers
```

### 2. move to the folder
```
cd ft_containers
```

### 3. compile/use the code with Makefile's rules
```
make run     : test all containers
make vector  : test vector container
make stack   : test stack container
make map     : test map container
make         : compile FT containers and STL containers tests
make stl     : compile STL containers tests
make ft      : compile FT containers tests
make clean   : delete objects
make fclean  : [clean] + delete executables and outputs files
make re      : [fclean] + [make]
```

### How do I compare their speed?
[`test_srcs/main.cpp`의 62번째 줄](https://github.com/KKWANH/ft_containers/blob/main/test_srcs/main.cpp#L62)에 주석되어있는 std::cout 출력문의 주석을 해제하시면 실행 결과가 ft, stl의 출력 파일에 각각 추가됩니다.<br>
이 결과를 통해 시간을 비교해보실 수 있습니다. 실제 실행 결과 약 **9~10 배** 정도의 성능 차이가 발생합니다.<br>
다만 이렇게 결과물을 출력할 경우 stl 실행 결과와 ft_containers 실행 결과물에 차이가 발생하므로 `make run`을 통한 비교 파일 출력 시 오류가 남을 인지하시길 바랍니다.
