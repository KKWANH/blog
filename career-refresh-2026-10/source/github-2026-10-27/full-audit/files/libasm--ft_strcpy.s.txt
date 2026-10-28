;	----[ft_strcpy by kkim]----

;	char	*ft_strcpy(char *dst, char *src)
;	 arg0	(char *dst) : (rdi)
;	 arg0	(char *src) : (rsi)

section		.text
	global	_ft_strcpy

_ft_strcpy:
	mov		rax, 0					; 반환값은 char *dst에 src를 넣은 결과이다.
									; rax의 값을 0으로 초기화하자.
	jmp		_ft_loop				; 이제 메인 반복문(_ft_loop)으로 이동한다.

_ft_loop:
	mov		cl, [rsi + rax]			; cl이라는 카운터 레지스터에 / rsi(src 주소) + rax 인덱스를 더한 값 부분에 값을 넣는다.
	mov		[rdi + rax], cl			; rdi(dst 주소) + rax 인덱스를 더한 값 부분에 / cl을 넣는다.
	cmp		cl, 0					; 만약 넣은 cl의 값과 0을 비교한다.
	je		_ft_exit				; 비교 연산 결과 값이 같다면 -> 비어있다면
									; 종료문(_ft_exit)으로 이동한다.
	inc		rax						; 비교 연산 결과 값이 같지 않다면 rax를 1 증가시킨다. (++idx)
	jmp		_ft_loop				; 메인 반복문(_ft_loop)을 다시 실행한다.

_ft_exit:
	mov		rax, rdi				; 반환값이 되는 rax에 rdi의 주소를 넣는다.
	ret								; 종료!