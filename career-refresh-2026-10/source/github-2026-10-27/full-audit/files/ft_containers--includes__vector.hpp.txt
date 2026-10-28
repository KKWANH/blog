#ifndef			VECTOR_HPP
# define		VECTOR_HPP

# include		<memory>
# include 		"iterators.hpp"
# include		"reverse_iterator.hpp"

namespace		ft
{
	template	<class Typ, class Alc = std::allocator<Typ> >
	class		vector
	{
	/**
	 * ================================================= PUBLIC =================================================
	 * 
	 * explicit vector(const allocator_type& alloc = allocator_type());
	 * explicit vector(size_type n, const value_type& val = value_type(), 
	 * 					const allocator_type& alloc = allocator_type());
	 * 			template <class Itr>
	 * 			vector(Itr first, Itr last, const allocator_type& alloc = allocator_type());
	 * 			vector(const vector& _vec);
	 *
	 * 	~vector();
	 * 
	 * vector&	operator= (const vector& _vec);
	 * 
	 * 					~ Iterators ~
	 * 
	 * iterator					begin();
	 * const_iterator			begin() const;
	 * iterator					end();
	 * const_iterator			end() const;
	 * reverse_iterator			rbegin();
	 * const_reverse_iterator	rbegin() const;
	 * reverse_iterator			rend();
	 * const_reverse_iterator	rend() const;
	 * 
	 * 					~ Capacity ~
	 * 
	 * size_type				size() const;
	 * size_type				max_size() const;
	 * void						resize(size_type n, value_type val = value_type());
	 * size_type				capacity() const;
	 * bool						empty() const;
	 * void						reserve(size_type n); 
	 * 
	 * 					~ Element access ~
	 * 
	 * reference				operator[] (size_type n);
	 * const_reference			operator[] (size_type n) const;
	 * reference				at (size_type n);
	 * const_reference			at (size_type n) const;
	 * reference				front();
	 * const_reference			front() const;
	 * reference				back();
	 * const_reference			back() const;
	 * 
	 * 
	 * 					~ Modifiers ~
	 * 
	 * void						push_back (const value_type& val);
	 * void						pop_back();
	 * iterator					insert (iterator position, const value_type& val);
	 * void						insert (iterator position, size_type n, const value_type& val);
	 * template <class Itr>
	 * void						insert (iterator position, Itr first, Itr last);
	 * iterator					erase (iterator position);
	 * iterator					erase (iterator first, iterator last);
	 * void						swap (vector& _vec);
	 * void 					clear();
	 * 
	 * ================================================= PRIVATE =================================================
	 * 
	 * pointer			_begin; 
	 * Alloc			_alloc;
	 * size_type 		_size;
	 * size_type 		_capacity;
	 * 
	 **/

	/*
	** ----------------------------------------------------------------------------------
	** TYPES
	*/
	public:
		typedef	Typ															value_type;
		typedef	Alc															allocator_type;
		typedef	typename allocator_type::reference							reference;
		typedef	typename allocator_type::const_reference					const_reference;
		typedef	typename allocator_type::pointer							pointer;
		typedef	typename allocator_type::const_pointer						const_pointer;
		typedef	vector_iterator<random_access_iterator_tag, value_type,
				ptrdiff_t, const Typ*, const Typ&>							const_iterator;
		typedef	vector_iterator<random_access_iterator_tag, value_type>		iterator;
		typedef	reverse_iterator<const_iterator>							const_reverse_iterator;
		typedef	reverse_iterator<iterator>									reverse_iterator;	
		typedef	typename iterator::difference_type							difference_type;
		typedef	size_t														size_type;
	private:
		pointer			_begin;
		allocator_type	_alloc;
		size_type 		_size;
		size_type 		_capacity;

	public:
		/*
		** ----------------------------------------------------------------------------------
		** CONSTRUCTORS & DESTRUCTORS
		*/
		explicit	vector(const allocator_type& alloc = allocator_type())  :
					_alloc(alloc),
					_size(0),
					_capacity(0)
		{ this->_begin = this->_alloc.allocate(0); }
		explicit	vector(size_type n, const value_type& val = value_type(), const allocator_type& alloc = allocator_type()) :
					_alloc(alloc),
					_size(n),
					_capacity(n)
		{
			this->_begin = this->_alloc.allocate(n);
			for (size_type i = 0; i < n; i++)
				this->_alloc.construct(&this->_begin[i], val);		
		}
		template	<class Itr>
		vector(Itr first, Itr last, const allocator_type& alloc = allocator_type(), typename ft::enable_if<!is_integral<Itr>::value>::type * = 0) :
					_alloc(alloc),
					_size(0)
		{
			for (Itr it = first; it != last; it++)
				++this->_size;
			this->_capacity = this->_size;
			this->_begin = this->_alloc.allocate(this->_capacity);
			int i = 0;
			for (Itr it = first; it != last; it++, i++)
				this->_alloc.construct(&this->_begin[i], *it);
		}
		vector(const vector& _vec) :
					_alloc(_vec._alloc),
					_size(_vec._size),
					_capacity(_vec._size)
		{
			this->_begin = this->_alloc.allocate(this->_capacity);
			for (size_type i = 0; i < this->_size; i++)
				this->_alloc.construct(&this->_begin[i], _vec._begin[i]);
		}
		~vector()
		{
			this->clear();
			this->_alloc.deallocate(this->_begin, this->_capacity);
		}

		/*
		** ----------------------------------------------------------------------------------
		** OPEARTORS: ASSIGNMENT: =
		*/
		vector&		operator= (const vector& _vec)
		{		
			if (this == &_vec)
				return (*this);
			for (size_type i = 0; i < this->_size; i++)
				this->_alloc.destroy(&this->_begin[i]);
			if (this->_capacity < _vec._size)
			{
				this->_alloc.deallocate(this->_begin, this->_capacity);
				this->_capacity = _vec._size;
				this->_begin = this->_alloc.allocate(this->_capacity);
			}
			this->_alloc = _vec._alloc;
			this->_size = _vec._size;
			for (size_type i = 0; i < this->_size; i++)
				this->_alloc.construct(&this->_begin[i], _vec._begin[i]);
			return (*this);
		}

		/*
		** ----------------------------------------------------------------------------------
		** ITERATORS: begin, end, rbegin, rend
		*/
		iterator				begin()				{ return iterator(this->_begin); }
		const_iterator			begin() const		{ return const_iterator(this->_begin); }
		iterator				end()				{ return iterator(this->_begin) + this->_size; }
		const_iterator			end() const			{ return const_iterator(this->_begin + this->_size); }
		reverse_iterator		rbegin()			{ return reverse_iterator(this->end()); }
		const_reverse_iterator	rbegin() const		{ return const_reverse_iterator(this->end()); }
		reverse_iterator		rend() 				{ return reverse_iterator(iterator(this->begin())); }
		const_reverse_iterator	rend() const		{ return const_reverse_iterator(this->begin()); } 

		/*
		** ----------------------------------------------------------------------------------
		** CAPACITY: size, max_size, capacity, empty, resize, reserve
		*/
		size_type				size() const		{ return this->_size; }
		size_type				max_size() const	{ return this->_alloc.max_size(); } 
		size_type				capacity() const	{ return this->_capacity; }
		bool					empty() const		{ return (this->_size == 0); }
		void					resize(
									size_type _num,
									value_type _val = value_type())
		{
			pointer	_tmp = this->_begin;
			this->_begin = this->_alloc.allocate(_num);

			for (size_type i = 0; i < this->_size && i < _num; i++)
			{
				this->_alloc.construct(&this->_begin[i], _tmp[i]);
				this->_alloc.destroy(&_tmp[i]);
			}
			for (size_type i = this->_size; i < _num; i++)
				this->_alloc.construct(&this->_begin[i], _val);
			for (size_type i = _num; i < this->_size; i++)
				this->_alloc.destroy(&_tmp[i]);

			this->_alloc.deallocate(_tmp, this->_capacity);
			this->_size = _num;
			this->_capacity = _num;
		}
		void					reserve(
									size_type _num)
		{
			if (_num <= this->_capacity)
				return ;
			pointer _tmp = this->_begin;
			this->_begin = this->_alloc.allocate(_num);
			for (size_type i = 0; i < this->_size; i++)
			{
				this->_alloc.construct(&this->_begin[i], _tmp[i]);
				this->_alloc.destroy(&_tmp[i]);
			}
			this->_alloc.deallocate(_tmp, this->_capacity);
			this->_capacity = _num;
		}

		/*
		** ----------------------------------------------------------------------------------
		** ELEMENT ACCESS: [], at, front, back
		*/
		reference			operator[]	(size_type n)		{ return this->_begin[n]; }
		const_reference		operator[]	(size_type n) const	{ return this->_begin[n]; }
		reference			at			(size_type n)		{ if (n >= this->_size) throw std::out_of_range("vector"); return (this->_begin[n]); }
		const_reference		at			(size_type n) const { if (n >= this->_size) throw std::out_of_range("vector"); return (this->_begin[n]); }
		reference			front() 						{ return this->_begin[0]; }
		const_reference		front() const 					{ return this->_begin[0]; }
		reference			back() 							{ return this->_begin[this->_size - 1]; }
		const_reference		back() const 					{ return this->_begin[this->_size - 1]; }

		/*
		** ----------------------------------------------------------------------------------
		** MODIFIERS: assign, push_back, pop_back, insert, erase, swap, clear
		*/
		template		<class Itr>
		void			assign (Itr first, Itr last, typename ft::enable_if<!ft::is_integral<Itr>::value>::type * = 0)
		{
			size_type	_siz = 0;
			for (Itr it = first; it != last; it++)
				++_siz;
			for (size_type i = 0; i < this->_size; i++)
				this->_alloc.destroy(&this->_begin[i]);
			if (this->_capacity < _siz)
			{
				this->_alloc.deallocate(this->_begin, this->_capacity);
				this->_capacity = _siz;
				this->_begin = this->_alloc.allocate(_siz);
			}
			this->_size = _siz;
			size_type	_idx = 0;
			for (Itr it = first; it != last; it++, _idx++)
				this->_alloc.construct(&this->_begin[_idx], *it);
		}

		void			assign (size_type _num, const value_type& _val)
		{
			for (size_type i = 0; i < this->_size; i++)
				this->_alloc.destroy(&this->_begin[i]);
			if (this->_capacity < _num)
			{
				this->_alloc.deallocate(this->_begin, this->_capacity);
				this->_capacity = _num;
				this->_begin = this->_alloc.allocate(_num);
			}
			this->_size = _num;

			for (size_type i = 0; i < _num; i++)
				this->_alloc.construct(&this->_begin[i], _val);
		}

		void			push_back (const value_type& _val)
		{
			if (this->_capacity >= this->_size + 1)
			{
				this->_alloc.construct(&this->_begin[this->_size], _val);
				++this->_size;
				return ;
			}
			pointer tmp = this->_begin;
			this->_begin = this->_alloc.allocate(this->_size + 1);
			for (size_type i = 0; i < this->_size; i++)
			{
				this->_alloc.construct(&this->_begin[i], tmp[i]);
				this->_alloc.destroy(&tmp[i]);
			}
			this->_alloc.construct(&this->_begin[this->_size], _val);
			this->_alloc.deallocate(tmp, this->_capacity);
			++this->_size;
			// if (this->_capacity <= this->_size)
			// 	this->_capacity *= 2;
			this->_capacity = this->_size;
		}
		
		void			pop_back ()
		{
			if (this->_size > 0)
			{
				--this->_size;
				this->_alloc.destroy(&this->_begin[this->_size]);
			}
		}

		iterator		insert (iterator _pos, const value_type& _val)
		{
			size_type	_num = _pos - this->begin();
			this->insert(_pos, 1, _val);
			return		(this->_begin + _num);
		}

		void			insert (iterator _pos, size_type _num, const value_type& _val)
		{
			vector		_tmp = *this;
			size_type	_stt = _pos - this->begin();
			size_type	_idx = 0;

			for (_idx = _stt; _idx < _num + _stt && _idx < this->size(); _idx++)
				(*this)[_idx] = _val;
			for (size_type _jdx = _idx; _jdx < _num + _stt; _jdx++, _idx++)
				this->push_back(_val);
			for (iterator _itr = _tmp.begin() + _stt; _itr != _tmp.end(); _itr++, _idx++)
			{
				if (_idx < this->size())
					(*this)[_idx] = *_itr;
				else
					this->push_back(*_itr);
			}
		}	

		template		<class Itr>
		void			insert (iterator _pos, Itr first, Itr last, typename ft::enable_if<!ft::is_integral<Itr>::value>::type * = 0)
		{
			vector		_tmp = *this;
			size_type	_stt = _pos - this->begin();
			size_type	_idx;

			for (_idx = _stt; first != last; first++, _idx++)
			{
				if (_idx < this->size())
					(*this)[_idx] = *first;
				else
					this->push_back(*first);
			}
			for (iterator _itr = _tmp.begin() + _stt; _itr != _tmp.end(); _itr++, _idx++)
			{
				if (_idx < this->size())
					(*this)[_idx] = *_itr;
				else
					this->push_back(*_itr);
			}
		}
		
		iterator		erase (iterator _pos)
		{
			return		erase(_pos, _pos + 1);
		}
		
		iterator		erase (iterator first, iterator last)
		{
			size_type	_num = first - this->begin();
			size_type	_len = last - first;

			for (size_type _idx = _num; _idx < this->_size && _idx + _len < this->_size; _idx++)
			{
				(*this)[_idx] = (*this)[_idx + _len];
			}
			for (difference_type _idx = 0; _idx < last - first; _idx++)
				this->pop_back();
			return this->_begin + _num;
		}

		void			swap (vector& _vec)
		{
			pointer		_bgn = this->_begin;
			allocator_type
						_alc = this->_alloc;
			size_type	_siz = this->_size;
			size_type	_cap = this->_capacity;

			this->_begin	 = _vec._begin;
			this->_alloc	 = _vec._alloc;
			this->_size		 = _vec._size;
			this->_capacity	 = _vec._capacity;
			
			_vec._begin		 = _bgn;
			_vec._alloc		 = _alc;
			_vec._size		 = _siz;
			_vec._capacity	 = _cap;
		}

		void			clear()
		{
			for (iterator _itr = this->begin(); _itr != this->end(); _itr++)
				this->_alloc.destroy(&*_itr);
			this->_size = 0;
		}
		
		/*
		** ----------------------------------------------------------------------------------
		** OPERATORS: COMPARISON: ==, !=, <, >, <=, >=
		*/
		friend bool		operator== (const vector<Typ, Alc>& _vc1, const vector<Typ, Alc>& _vc2) { if (_vc1._size != _vc2._size) return false; for (size_type i = 0; i < _vc1._size && i < _vc2._size; i++) { if (_vc1[i] != _vc2[i]) return (false); } return (true); }
		friend bool		operator!= (const vector<Typ, Alc>& _vc1, const vector<Typ, Alc>& _vc2)	{ return !(_vc1 == _vc2); }
		friend bool		operator<  (const vector<Typ, Alc>& _vc1, const vector<Typ, Alc>& _vc2) { return ft::lexicographical_compare(_vc1.begin(), _vc1.end(), _vc2.begin(), _vc2.end()); }
		friend bool		operator>  (const vector<Typ, Alc>& _vc1, const vector<Typ, Alc>& _vc2) { return  (_vc2 < _vc1); }
		friend bool		operator<= (const vector<Typ, Alc>& _vc1, const vector<Typ, Alc>& _vc2) { return !(_vc2 < _vc1); }
		friend bool		operator>= (const vector<Typ, Alc>& _vc1, const vector<Typ, Alc>& _vc2) { return !(_vc1 < _vc2); }
	};

	template			<class Typ, class Alc>
  	void 				swap (vector<Typ, Alc>& _vec, vector<Typ, Alc>& y)
	{
		_vec.swap(y);
	}
}

#endif
