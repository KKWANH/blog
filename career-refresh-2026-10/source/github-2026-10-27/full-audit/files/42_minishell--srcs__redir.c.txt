/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   redir.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/02 17:22:57 by mac               #+#    #+#             */
/*   Updated: 2021/05/07 11:46:27 by juhpark          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../minishell.h"

extern t_mns		*g_mns;

void				ft_redir_out_append(t_par *par, int i)
{
	if (par->fd_out != -2)
		close(par->fd_out);
	par->fd_out =
		open(par->spl[i + 1], O_WRONLY | O_APPEND | O_CREAT, 0644);
	if (par->fd_in == -1 || par->fd_out == -1)
	{
		printf("minishell: %s: %s\n", par->spl[i + 1], strerror(errno));
		g_mns->ext = 1;
		return ;
	}
}

void				ft_redir_out_trunc(t_par *par, int i)
{
	if (par->fd_out != -2)
		close(par->fd_out);
	par->fd_out =
		open(par->spl[i + 1], O_WRONLY | O_TRUNC | O_CREAT, 0644);
	if (par->fd_in == -1 || par->fd_out == -1)
	{
		printf("minishell: %s: %s\n", par->spl[i + 1], strerror(errno));
		g_mns->ext = 1;
		return ;
	}
}

void				ft_redir_in(t_par *par, int i)
{
	if (par->fd_in != -2)
		close(par->fd_in);
	par->fd_in =
		open(par->spl[i + 1], O_RDONLY);
	if (par->fd_in == -1 || par->fd_out == -1)
	{
		g_mns->ext = 1;
		return ;
	}
}

void				ft_redir_rebuild(t_par *par, int i, int backup)
{
	while (par->spl[i])
	{
		if (par->spl[i][0] == '>' || par->spl[i][0] == '<')
		{
			if (!backup)
				backup = i;
			free(par->spl[i]);
			par->spl[i] = NULL;
			i++;
			free(par->spl[i]);
			par->spl[i] = NULL;
		}
		else if (par->spl[i] && backup)
		{
			par->spl[backup] = ft_util_strdup(par->spl[i]);
			free(par->spl[i]);
			par->spl[i] = NULL;
		}
		i++;
	}
}

void				ft_redir_check(t_par *par)
{
	int				i;

	i = 0;
	while (par->spl[i])
	{
		if (par->spl[i][0] == '>')
		{
			if (par->spl[i][1] == '>')
				ft_redir_out_append(par, i);
			else
				ft_redir_out_trunc(par, i);
		}
		else if (par->spl[i][0] == '<')
			ft_redir_in(par, i);
		i++;
	}
	if (par->fd_in == -1 || par->fd_out == -1)
		return ;
	ft_redir_rebuild(par, 0, 0);
	g_mns->ext = 0;
}
