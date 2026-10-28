/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kimkwanho <kimkwanho@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/17 11:14:39 by kimkwanho         #+#    #+#             */
/*   Updated: 2021/07/24 19:40:14 by kimkwanho        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../incs/philo.h"

void				*ft_loop(void *arg)
{
	t_philo			*phl;
	pthread_t		die;

	phl = (t_philo *)arg;
	pthread_create(&die, NULL, &ft_monitor_die, phl);
	pthread_detach(die);
	if (phl->st_all->c_meal > 0)
		while (ft_check_alive(phl) && ft_check_hungry(phl))
			ft_start(phl);
	else
		while (ft_check_alive(phl))
			ft_start(phl);
	return ((void *)0);
}

void				ft_run_threads(t_all *all)
{
	t_philo			*phl;
	pthread_t		thd;
	int				idx;

	all->tm_stt = ft_time_now();
	idx = 0;
	while (idx < all->ph_cnt)
	{
		phl = &all->philos[idx];
		++idx;
		if (pthread_create(&thd, NULL, &ft_loop, (void *)phl) != 0)
		{
			ft_clear(all);
			return ;
		}
		pthread_detach(thd);
		usleep(100);
	}
}

void				ft_run_monitor(t_all *all)
{
	if (all->c_meal > 0)
		ft_monitor_meal_dead(all);
	else
		ft_monitor_dead(all);
}

int					main(int arc, char **arv)
{
	t_all			all;

	if (arc == 5 || arc == 6)
	{
		if (ft_init(&all, arc, arv) == -1)
			return (ft_error(1));
		ft_run_threads(&all);
		ft_run_monitor(&all);
		ft_clear(&all);
	}
	else
		return (ft_error(0));
	return (0);
}
