#ifndef			ITERATOR_HPP
# define		ITERATOR_HPP

# include		<iostream>
# include		<cstddef>

namespace		ft
{
	struct		random_access_iterator_tag
	{};

	struct		bidirectional_iterator_tag
	{};
	
	/*
	** ----------------------------------------------------------------------------------
	** VECTOR ITERATOR
	*/
	template	<class Cat, class Typ, class Dst = ptrdiff_t, class Ptr = Typ*, class Ref = Typ& >
	class		vector_iterator
	{
	/*
	** ----------------------------------------------------------------------------------
	** TYPES
	*/
	public:
		typedef	Typ value_type;
		typedef	Dst difference_type;
		typedef Ptr pointer;
		typedef Ref reference;
		typedef Cat iterator_category;
	private:
		Typ*	_ptr;

	/*
	** ----------------------------------------------------------------------------------
	** CONSTRUCTORS & OPERATORS
	*/
	public:
		/*
		** ----------------------------------------------------------------------------------
		** CONSTRUCTORS & DESTRUCTORS
		*/
		vector_iterator() {}
		vector_iterator(const vector_iterator<Cat, Typ, Dst, Typ*, Typ&> &_cpy) : _ptr(_cpy.base()) {}
		vector_iterator(Typ* _cpy) : _ptr(_cpy) {}
		virtual ~vector_iterator() {}
		Typ* base() const { return this->_ptr ; }

		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: ASSIGNMENT: =, +=, -=
		*/
		vector_iterator&		operator=(pointer _cpy)					{ this->_ptr = _cpy; return (*this); }
		vector_iterator&		operator=(const vector_iterator &_cpy)	{ this->_ptr = _cpy._ptr; return (*this); }
		vector_iterator&		operator+=(difference_type _num)		{ this->_ptr += _num; return (*this); }
		vector_iterator&		operator-=(difference_type _num)		{ this->_ptr -= _num; return (*this); }

		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: MEMBER ACCESS: *, ->, []
		*/
		reference				operator*() const						{ return (*this->_ptr); }
		pointer	 				operator->() const						{ return &(operator*()); }
		reference				operator[](const difference_type &_idx)	{ return (this->_ptr[_idx]); }

		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: INC/DEC: ++, --
		*/
		vector_iterator&		operator++	()	{ this->_ptr++; return (*this); }
		vector_iterator&		operator--	() 	{ this->_ptr--; return (*this); }
		vector_iterator			operator++	(int)	{ vector_iterator _tmp = *this; ++*this; return (_tmp); }
		vector_iterator			operator--	(int)	{ vector_iterator _tmp = *this; --*this; return (_tmp); }

		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: ARITHMETIC: +, -
		*/
		friend vector_iterator	operator+	(const vector_iterator& _itr, difference_type _num)		{ return vector_iterator(_itr._ptr + _num); }
		friend vector_iterator	operator+	(difference_type _itr, const vector_iterator& _num)		{ return vector_iterator(_itr._ptr + _num); }
		friend vector_iterator	operator-	(const vector_iterator& _itr, difference_type _num)		{ return vector_iterator(_itr._ptr - _num); }
		friend vector_iterator	operator-	(difference_type _num, const vector_iterator& _itr)		{ return vector_iterator(_itr._ptr - _num); }
		friend difference_type	operator-	(const vector_iterator& _it1, const vector_iterator& _it2)	{ return (_it1._ptr - _it2._ptr); }

		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: COMPARISON: ==, !=, <, >, <=, >=
		*/
		friend bool 			operator==	(const vector_iterator& _it1, const vector_iterator& _it2) { return _it1._ptr == _it2._ptr; }
		friend bool 			operator!=	(const vector_iterator& _it1, const vector_iterator& _it2) { return _it1._ptr != _it2._ptr; }
		friend bool 			operator<	(const vector_iterator& _it1, const vector_iterator& _it2) { return _it1._ptr <  _it2._ptr; }
		friend bool 			operator>	(const vector_iterator& _it1, const vector_iterator& _it2) { return _it1._ptr >  _it2._ptr; }
		friend bool 			operator<=	(const vector_iterator& _it1, const vector_iterator& _it2) { return _it1._ptr <= _it2._ptr; }
		friend bool 			operator>=	(const vector_iterator& _it1, const vector_iterator& _it2) { return _it1._ptr >= _it2._ptr; }
	};


	/*
	** MAP ITERATOR
	*/
	
	template	<class Cat, class Typ, class TypNN = Typ>
	class map_iterator
	{
		/*
		** TYPES
		*/
		public:
			typedef typename Typ::value_type	value_type;
			typedef typename TypNN::Node		node;
			typedef typename Typ::key_type		key_type;
			typedef typename Typ::mapped_type	mapped_type;
			typedef	typename Typ::key_compare	key_compare;
			typedef typename Typ::pointer		pointer;
			typedef typename Typ::reference 	reference;
			typedef ptrdiff_t					difference_type;
			typedef Cat							iterator_category;
		private:
			node*		_ptr;
			node*		_end;
			key_compare	_key_comp;
		
		public:
			/*
			** CONSTRUCTORS & DESTRUCTORS
			*/
			map_iterator() {}
			map_iterator(const map_iterator<Cat, TypNN> &_cpy) : _ptr(_cpy.base()), _end(_cpy.end()) {}
			map_iterator(node* _nod, node* _end) { this->_ptr = _nod; this->_end = _end; }
			virtual ~map_iterator() {}
			node*	base() const { return (this->_ptr); }
			node*	end() const { return (this->_end); }
			
			/*
			** OPERATORS: ASSIGNMENT: =, +=, -=
			*/
			map_iterator&	operator=(const map_iterator<Cat, TypNN> &_cpy) {
				this->_ptr = _cpy._ptr;
				this->_end = _cpy._end;
				return (*this);
			}

			/*
			** OPERATORS: MEMBER ACCESS: *, ->
			*/
			reference		operator*() const	{ return (this->_ptr->value); }
			pointer	 		operator->() const	{ return &(operator*()); }

			/*
			** OPERATORS: INC/DEC: ++, --
			*/
			map_iterator&	operator++()
			{
				// find the smallest greater
				if (this->_ptr->right)
				{
					this->_ptr = this->_ptr->right->min();
					return (*this);
				}
				else if (this->_ptr->parent)
				{
					// find first previous greater node
					key_type key = this->_ptr->value.first;
					node *tmp = this->_ptr->parent;
					while (tmp && this->_key_comp(tmp->value.first, key))
						tmp = tmp->parent;
					if (tmp)
					{
						this->_ptr = tmp;
						return *this;
					}
				}
				this->_ptr = this->_end;
				return (*this);
			}
			map_iterator	operator++(int) { map_iterator tmp = *this; ++*this; return (tmp); }

			map_iterator&	operator--()
			{
				// find the greatest smaller
				if (this->_ptr == this->_end)
				{
					this->_ptr = this->_ptr->parent;
					return (*this);
				}
				else if (this->_ptr->left)
				{
					this->_ptr = this->_ptr->left->max();
					return (*this);
				}
				else if (this->_ptr->parent)
				{
					// find first previous smaller node
					key_type key = this->_ptr->value.first;
					node *tmp = this->_ptr->parent;
					while (tmp && this->_key_comp(key, tmp->value.first))
						tmp = tmp->parent;
					if (tmp)
					{
						this->_ptr = tmp;
						return (*this);
					}
				}
				return (*this);
			}
			map_iterator	operator--(int) { map_iterator tmp = *this; --*this; return (tmp); }

			/*
			** OPERATORS: COMPARISION: ==, !=
			*/
			friend bool		operator== (const map_iterator& _it1, const map_iterator& _it2) {
				return _it1._ptr == _it2._ptr; }
			friend bool 	operator!= (const map_iterator& _it1, const map_iterator& _it2) {
				return _it1._ptr != _it2._ptr; }
	};
}

#endif
