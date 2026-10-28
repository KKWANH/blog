/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   start.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/23 20:28:21 by kimkwanho         #+#    #+#             */
/*   Updated: 2021/07/24 19:23:27 by kimkwanho        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../incs/philo.h"

void				ft_start_lock_sticks(t_philo *phl)
{
	phl->status = TAK;
	if (phl->ph_idx % 2)
	{
		pthread_mutex_lock(phl->rg_stk);
		ft_msg_select(phl);
		if (phl->st_all->ph_cnt == 1)
			while (phl->status != DIE)
				;
		else
		{
			pthread_mutex_lock(phl->lf_stk);
			ft_msg_select(phl);
		}
	}
	else
	{
		pthread_mutex_lock(phl->lf_stk);
		ft_msg_select(phl);
		pthread_mutex_lock(phl->rg_stk);
		ft_msg_select(phl);
	}
}

void				ft_start_eat(t_philo *phl)
{
	phl->status = EAT;
	phl->tm_eat = ft_time_elapsed(phl->st_all->tm_stt);
	ft_msg_select(phl);
	if (phl->st_all->ph_cnt == 1)
		return ;
	ft_usleep(phl->st_all->tm_eat);
	++phl->cn_eat;
	if (phl->st_all->c_meal > 0 && ft_check_eat_enough(phl))
	{
		pthread_mutex_lock(&phl->st_all->f_meal);
		++phl->st_all->c_fini;
		pthread_mutex_unlock(&phl->st_all->f_meal);
	}
}

void				ft_start_unlock_sticks(t_philo *phl)
{
	phl->status = SLP;
	pthread_mutex_unlock(phl->rg_stk);
	if (phl->st_all->ph_cnt == 1)
		return ;
	pthread_mutex_unlock(phl->lf_stk);
	ft_msg_select(phl);
	ft_usleep(phl->st_all->tm_slp);
}

void				ft_start_thk(t_philo *phl)
{
	phl->status = THK;
	ft_msg_select(phl);
}

void				ft_start(t_philo *phl)
{
	ft_start_lock_sticks(phl);
	ft_start_eat(phl);
	ft_start_unlock_sticks(phl);
	ft_start_thk(phl);
	usleep(100);
}
