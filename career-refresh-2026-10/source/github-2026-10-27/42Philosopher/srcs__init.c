/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/24 18:30:56 by kimkwanho         #+#    #+#             */
/*   Updated: 2021/07/24 19:21:41 by kimkwanho        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../incs/philo.h"

int					ft_init_check_param(int arc, char **arv)
{
	int				idx;

	idx = 1;
	while (idx < arc)
	{
		if (ft_is_number(arv[idx]) == -1 || ft_atoi(arv[idx]) <= 0)
			return (-1);
		++idx;
	}
	return (1);
}

int					ft_init_philos(t_all *all)
{
	int				idx;

	idx = 0;
	if (!(all->philos = malloc(sizeof(t_philo) * all->ph_cnt)))
		return (-1);
	while (idx < all->ph_cnt)
	{
		all->philos[idx].ph_idx = idx + 1;
		all->philos[idx].status = THK;
		all->philos[idx].st_all = all;
		all->philos[idx].cn_eat = 0;
		all->philos[idx].tm_eat = 0;
		all->philos[idx].lf_stk = &all->sticks[idx];
		if (idx == 0)
			all->philos[idx].rg_stk = &all->sticks[all->ph_cnt - 1];
		else
			all->philos[idx].rg_stk = &all->sticks[idx - 1];
		++idx;
	}
	return (1);
}

int					ft_init_sticks(t_all *all)
{
	if (!(all->sticks = malloc(sizeof(pthread_mutex_t) * all->ph_cnt)))
	{
		ft_free_philo(all);
		return (-1);
	}
	return (1);
}

int					ft_init_mutex(t_all *all)
{
	int				idx;

	idx = 0;
	while (idx < all->ph_cnt)
		pthread_mutex_init(&all->sticks[idx++], NULL);
	pthread_mutex_init(&all->printr, NULL);
	pthread_mutex_init(&all->f_meal, NULL);
	pthread_mutex_init(&all->ph_die, NULL);
	return (1);
}

int					ft_init(t_all *all, int arc, char **arv)
{
	if (ft_init_check_param(arc, arv) == 1)
	{
		if ((all->ph_cnt = ft_atoi(arv[1])) < 1)
			return (-1);
		all->tm_die = ft_atoi(arv[2]);
		all->tm_eat = ft_atoi(arv[3]);
		all->tm_slp = ft_atoi(arv[4]);
		all->c_meal = 0;
		if (arc == 6)
			all->c_meal = ft_atoi(arv[5]);
		all->is_end = 0;
		all->c_fini = 0;
		all->is_die = 0;
		all->philos = NULL;
		all->sticks = NULL;
		if (ft_init_sticks(all) == -1 || ft_init_philos(all) == -1 ||
			ft_init_mutex(all) == -1)
			return (-1);
		return (1);
	}
	return (-1);
}
