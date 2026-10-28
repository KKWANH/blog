/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signal.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/04/08 14:49:18 by kimkwanho         #+#    #+#             */
/*   Updated: 2021/05/07 12:38:24 by juhpark          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../minishell.h"

extern t_mns		*g_mns;

void				ft_signal_handle_c(int sig)
{
	int				sta;
	int				pid;

	pid = waitpid(0, &sta, WNOHANG);
	g_mns->idx = -1;
	free(g_mns->lin);
	g_mns->lin = ft_util_strdup("");
	if (sig == 2)
	{
		if (pid == -1)
		{
			ft_util_putstr_fd("  \b\b\n", 1);
			ft_prompt_put_msg();
			g_mns->ext = 1;
		}
		else
		{
			ft_util_putstr_fd("\n", 1);
			g_mns->ext = 130;
		}
	}
}

void				ft_signal_handle_rvc_slash(int sig)
{
	int				sta;
	int				pid;

	(void)sig;
	pid = waitpid(0, &sta, WNOHANG);
	g_mns->idx = -1;
	free(g_mns->lin);
	g_mns->lin = ft_util_strdup("");
	if (pid == -1)
		ft_util_putstr_fd("  \b\b", 1);
	else
	{
		ft_util_putstr_fd("Quit: 3\n", 1);
		g_mns->ext = 131;
	}
}

void				ft_signal_set(void)
{
	signal(2, ft_signal_handle_c);
	signal(3, ft_signal_handle_rvc_slash);
}
