/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_util_2.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/05 14:25:06 by kimkwanho         #+#    #+#             */
/*   Updated: 2020/12/05 14:25:06 by kimkwanho        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int						ft_strlen(char *str)
{
	int			cnt;

	cnt = 0;
	if (!str)
		return (0);
	while (str[cnt] != '\0')
		++cnt;
	return (cnt);
}

static size_t			ft_cnt_digit_u(unsigned int num)
{
	size_t				rst;

	rst = 1;
	while (num >= 10)
	{
		num = num / 10;
		++rst;
	}
	return (rst);
}

char					*ft_itoa_u(unsigned int num)
{
	int					siz;
	char				*rst;

	siz = ft_cnt_digit_u(num);
	rst = (char *)malloc(sizeof(char) * (siz + 1));
	if (rst == NULL)
		return (NULL);
	rst[siz--] = 0;
	while (siz >= 0)
	{
		rst[siz--] = '0' + num % 10;
		num = num / 10;
	}
	return (rst);
}
