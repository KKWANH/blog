/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   exe.c                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/03/25 13:39:37 by kimkwanho         #+#    #+#             */
/*   Updated: 2021/05/07 11:51:04 by juhpark          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../minishell.h"

extern t_mns		*g_mns;

int					ft_execve_nonap(char **par, int i)
{
	char			**paths;
	int				ret;

	paths = ft_util_parse_path();
	while (paths[i])
	{
		paths[i] = ft_util_strjoin(paths[i], par[0]);
		ret = execve(paths[i], par, g_mns->env_str);
		if (ret == -1)
			i++;
		else
			break ;
	}
	if (paths[i] == NULL)
	{
		ft_util_freestrstr(paths);
		return (-1);
	}
	ft_util_freestrstr(paths);
	return (1);
}

void				ft_execve(t_par *par, int res, int sta)
{
	pid_t			pid;

	pid = fork();
	if (pid < 0)
		err_by("err by pid\n", &g_mns->ext);
	else if (pid == 0)
	{
		ft_util_open_pipe(par);
		ft_util_dup_fd(par);
		ft_builtin(par);
		if (par->spl[0][0] == '/')
			res = execve(par->spl[0], par->spl, g_mns->env_str);
		else
			res = ft_execve_nonap(par->spl, 0);
		if (res < 0)
			err_by_command(par->spl[0], &g_mns->ext);
	}
	else if (pid > 0)
	{
		waitpid(pid, &sta, 0);
		if (WIFEXITED(sta))
			g_mns->ext = WEXITSTATUS(sta);
	}
}

void				ft_exe_check(t_par *par)
{
	if (ft_builtin_check(par->spl[0]) == 1)
	{
		if (par->pip == 0 && ft_util_strcmp(par->spl[0], "exit") == 0)
			ft_exit_cmd(par);
		else if (par->pip == 0 && ft_util_strcmp(par->spl[0], "cd") == 0)
			ft_cd_cmd(par);
		else if (par->pip == 0 && ft_util_strcmp(par->spl[0], "export") == 0)
			ft_export_cmd(par);
		else if (par->pip == 0 && ft_util_strcmp(par->spl[0], "unset") == 0)
			ft_unset_cmd(par);
		else
			ft_execve(par, 0, 0);
	}
	else if (par->spl[0][0] == '/')
	{
		if (ft_util_is_execable(par->spl[0]))
			ft_execve(par, 0, 0);
		else if (g_mns->ext != 126)
			err_by_path(par->spl[0], &g_mns->ext);
	}
	else if ((ft_util_env_search("PATH")) != 0)
		ft_execve(par, 0, 0);
	else
		err_by_path(par->spl[0], &g_mns->ext);
}

void				ft_exe_loop(t_par *par)
{
	while (par)
	{
		ft_redir_check(par);
		if (g_mns->ext == 1 || par->fd_out == -1 || par->spl[0] == NULL)
		{
			ft_util_close_pipe(par);
			return ;
		}
		if (par->typ == TYPE_PIPE || (par->pre && par->pre->typ == TYPE_PIPE))
		{
			par->pip = 1;
			if (pipe(par->fil) == -1)
				return ;
		}
		ft_exe_check(par);
		ft_util_close_pipe(par);
		par = par->nxt;
	}
}

void				ft_exe(char *lin)
{
	t_par			*par;
	t_cmd			*cmd;

	par = NULL;
	cmd = NULL;
	if (lin[0] == '\0')
		return ;
	if (!(cmd = (t_cmd *)malloc(sizeof(t_cmd))))
		return ;
	cmd->lin = ft_util_strdup(lin);
	cmd->cur = 0;
	cmd->nxt = 0;
	cmd->pre = 0;
	ft_util_cmd_lstaddback(cmd);
	par = ft_parse_cmd(lin, par);
	ft_exe_loop(par);
	ft_util_parse_list_free(&par);
}
