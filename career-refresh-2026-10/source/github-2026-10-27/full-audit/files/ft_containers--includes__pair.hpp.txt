#ifndef			PAIR_HPP
# define		PAIR_HPP

namespace		ft
{
	template	<class T1, class T2>
	class		pair
	{
	public:
		/*
		** ----------------------------------------------------------------------------------
		** TYPES
		*/
		typedef	T1  first_type;
		typedef	T2  second_type;
		first_type	first;
		second_type	second;
		
		/*
		** ----------------------------------------------------------------------------------
		** CONSTRUCTORS
		*/
		pair() : first(), second() {}
		pair(const pair& _cpy) : first(_cpy.first), second(_cpy.second) {}
		pair(const first_type& _ar1, const second_type& _ar2) : first(_ar1), second(_ar2) {}
		template <class U, class V>
		pair(const pair<U,V>& _cpy) : first(_cpy.first), second(_cpy.second) {}
		
		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: ASSIGNMENT: =
		*/
		pair&	operator= (const pair& _cpy)
		{
			if (this == &_cpy)
				return (*this);
			this->first = _cpy.first;
			this->second = _cpy.second;
			return (*this);
		}
		
		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: COMPARISON: ==, !=, <, >, <=, >=
		*/
		friend bool operator==	(const pair<T1,T2>& _ar1, const pair<T1,T2>& _ar2) { return _ar1.first == _ar2.first && _ar1.second == _ar2.second; }
		friend bool operator!=	(const pair<T1,T2>& _ar1, const pair<T1,T2>& _ar2) { return !(_ar1 == _ar2); }
		friend bool operator<	(const pair<T1,T2>& _ar1, const pair<T1,T2>& _ar2) { return _ar1.first < _ar2.first || (!(_ar2.first < _ar1.first) && _ar1.second < _ar2.second); }
		friend bool operator>	(const pair<T1,T2>& _ar1, const pair<T1,T2>& _ar2) { return _ar2 < _ar1; }
		friend bool operator<=	(const pair<T1,T2>& _ar1, const pair<T1,T2>& _ar2) { return !(_ar2 < _ar1); }
		friend bool operator>=	(const pair<T1,T2>& _ar1, const pair<T1,T2>& _ar2) { return !(_ar1 < _ar2); }
	};

	template <class T1,class T2>
	ft::pair<T1,T2> make_pair (const T1& x, const T2& y)
	{
		return ft::pair<T1,T2>(x,y);
	}
}

#endif
