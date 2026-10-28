/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   util2.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/28 01:03:43 by kimkwanho         #+#    #+#             */
/*   Updated: 2021/10/28 02:17:52 by kimkwanho        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../base/minitalk.h"
#include "../base/minitalk_bonus.h"

int	ft_is_numb(char *_str)
{
	int	idx;

	idx = 0;
	while (_str[idx])
	{
		if (!(_str[idx] >= '0' && _str[idx] <= '9'))
			return (-1);
		++idx;
	}
	return (0);
}

char	*ft_strdup(const char *_str)
{
	char	*_rst;

	_rst = malloc(ft_strlen(_str) + 1);
	if (_rst == NULL)
		return (NULL);
	ft_strlcpy(_rst, _str, ft_strlen(_str) + 1);
	return (_rst);
}

void	*ft_calloc(size_t _cnt, size_t _siz)
{
	char	*_str;
	int		_len;

	_len = _cnt * _siz;
	_str = malloc(_len);
	if (_str == NULL)
		return (NULL);
	while (_len > 0)
	{
		_str[_len - 1] = 0;
		--_len;
	}
	return (_str);
}

char	*ft_char_append(char *_str, char _chr)
{
	size_t	_idx;
	char	*_rst;

	_rst = malloc(ft_strlen(_str) + 2);
	if (_rst == NULL)
		return (NULL);
	_idx = 0;
	while (_str[_idx] != '\0')
	{
		_rst[_idx] = _str[_idx];
		++_idx;
	}
	_rst[_idx] = _chr;
	_rst[_idx + 1] = '\0';
	free(_str);
	return (_rst);
}

size_t	ft_strlcpy(char *_dst, const char *_src, size_t _siz)
{
	size_t	_idx;

	if (_src == NULL)
		return ((size_t) NULL);
	if (_siz == 0)
		return (ft_strlen(_src));
	_idx = 0;
	while (_idx < _siz - 1 && _src[_idx] != '\0')
	{
		_dst[_idx] = _src[_idx];
		++_idx;
	}
	_dst[_idx] = '\0';
	return (ft_strlen(_src));
}
