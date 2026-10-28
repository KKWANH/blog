;	ssize_t	ft_read(int fil, void *buf, size_t siz)
;	 arg0	(int fil)		: (rdi)
;	 arg1	(void *buf)		: (rsi)
;	 arg2	(size_t siz)	: (rdx)

section		.text
	global	_ft_read
	extern	___error

_ft_read:
	mov		rax, 0x2000003	; syscall에서 read를 사용하기 위해 rax를 고유번호로 변경한다.
	syscall					; syscall에 대한 내용은 ft_write.s를 참고하자.
	jc		_ft_error		; carry flag가 1이라면 (에러 발생) _ft_error를 호출한다.
	jmp		_ft_exit

_ft_error:
	push	rax				; 스택 꼭대기에 rax를 저장한다.
							; rax에는 error value가 저장되어 있다.
	call	___error		; rax에 음수가 들어갔으므로 ___error를 호출한다.
							; 실행 후 rax에 &errno가 들어가 있다.
	pop		rdx				; rdx에 push 해 놓은 error value를 불러온다.
							; syscall 실행 결과가 rax에 저장되어있다.
	mov		[rax], rdx		; rax의 값만 rdx(error value)로 변경한다.
	mov		rax, -1			; rax에 -1를 넣는다. return (-1)과 같은 효과!
	jmp		_ft_exit

_ft_exit:
	ret						; 종료 (rax 반환)