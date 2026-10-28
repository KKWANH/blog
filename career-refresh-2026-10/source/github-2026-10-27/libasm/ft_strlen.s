;	----[ft_str by kkim]----

;	int		ft_strlen(char *str)
;	 arg0	(char *str) : (rdi)

section 	.text
	global	_ft_strlen

_ft_strlen:
	mov		rax, 0					; 반환값은 받아들인 str의 index이다.
									; rax 레지스터의 값을 0으로 초기화하여 사용하자!
									; 그럼 이 부분이 cnt = 0 이라고 생각할 수 있겠다.
	jmp		_ft_loop				; 메인 반복문(이름이 loop)으로 이동한다.

_ft_loop:
	cmp		BYTE [rdi + rax], 0
	je		_ft_exit				; cmp 명령어로 BYTE [rdi + rax]와 0이 같다면,
									; 끝내는 부분(이름이 exit)으로 이동한다.
									; 이 부분이 while의 조건문이라고 할 수 있다.
	inc		rax						; 조건에 어긋나지 않았다면 rax를 1 증가시키자.
									; 이 부분이 ++cnt;라고 할 수 있다.
	jmp		_ft_loop				; 반복문 처음으로 이동한다.

_ft_exit:
	ret								; 함수를 종료하고 rax를 반환한다.
