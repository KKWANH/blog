#ifndef			MAP_HPP
# define		MAP_HPP

# include		"Tree.hpp"
# include 		"iterators.hpp"
# include		"reverse_iterator.hpp"

namespace		ft
{
	template	<class Key, class Typ, class Cmp = ft::less<Key>, class Alc = std::allocator<ft::pair<const Key,Typ> >  >
	class		map
	{
	/*
	** ----------------------------------------------------------------------------------
	** TYPES
	*/
	public:
		typedef Key													key_type;
		typedef Typ				    								mapped_type;
		typedef	Cmp													key_compare;
		typedef	Alc													allocator_type;
		typedef ft::pair<const key_type, mapped_type>				value_type;
	private:
		typedef Tree< const value_type, Cmp, Alc>					const_tree;
		typedef Tree< value_type, Cmp, Alc>							tree;
		typedef typename tree::Node									node;
	public:
		typedef	typename tree::reference							reference;
		typedef	typename tree::const_reference						const_reference;
		typedef	typename tree::pointer								pointer;
		typedef	typename tree::const_pointer						const_pointer;
		typedef	typename tree::size_type							size_type;
		typedef typename tree::value_compare						value_compare;
		
		typedef	map_iterator<bidirectional_iterator_tag,
				const_tree, tree>									const_iterator;
		typedef	map_iterator<bidirectional_iterator_tag, tree>		iterator;
		typedef	reverse_iterator<const_iterator>					const_reverse_iterator;
		typedef	reverse_iterator<iterator>							reverse_iterator;	
		typedef typename iterator_traits<iterator>::difference_type	difference_type;
	private:
		tree	_tree;

	public:	
		/*
		** ----------------------------------------------------------------------------------
		** CONSTRUCTORS & DESTRUCTORS
		*/
		explicit	map(const key_compare& comp = key_compare(), const allocator_type& alloc = allocator_type()) : _tree(comp, alloc) {}
		template	<class Itr>
		map(Itr first, Itr last, const key_compare& comp = key_compare(), const allocator_type& alloc = allocator_type()) : _tree(comp, alloc) { this->insert(first, last); }
		map(const map& x) { *this = x; }
		~map() {}
		map&		operator=(const map& x)
		{		
			if(this == &x)
				return *this;
			this->_tree = x._tree;
			return *this;
		}

		/*
		** ----------------------------------------------------------------------------------
		** ITERATORS: begin, end, rbegin, rend
		*/
		iterator				begin()				{ return iterator(this->_tree.begin_node(), this->_tree.end_node()); }
		const_iterator			begin() const		{ return const_iterator(this->_tree.begin_node(), this->_tree.end_node()); }
		iterator				end()				{ return iterator(this->_tree.end_node(), this->_tree.end_node()); }
		const_iterator			end() const 		{ return const_iterator(this->_tree.end_node(), this->_tree.end_node()); }
		reverse_iterator		rbegin()			{ return reverse_iterator(this->end()); }
		const_reverse_iterator	rbegin() const		{ return const_reverse_iterator(this->end()); }
		reverse_iterator		rend()				{ return reverse_iterator(iterator(this->begin())); }
		const_reverse_iterator	rend() const		{ return const_reverse_iterator(this->begin()); } 

		/*
		** ----------------------------------------------------------------------------------
		** CAPACITY: size, max_size, empty
		*/
		size_type				size() const		{ return this->_tree.size(); }
		size_type				max_size() const	{ return this->_tree.max_size(); }
		bool					empty() const		{ return this->size() == 0; }

		/*
		** ----------------------------------------------------------------------------------
		** ELEMENT ACCESS: []
		*/
		mapped_type& 			operator[](const key_type& k) { return this->_tree[k]; }

		/*
		** ----------------------------------------------------------------------------------
		** MODIFIERS: insert, erase, swap, clear
		*/
		pair<iterator,bool>		insert(const value_type& _val) {
			size_type			n = this->size();
			this->_tree.insertValue(_val);
			pair<iterator,bool>	ret;
			ret.second = (n != this->size());
			ret.first = this->find(_val.first);
			return (ret);
		}
		iterator				insert(iterator position, const value_type& val)
		{
			iterator prec(position);
			if (value_comp()(*prec, val) && value_comp()(val, *++position))
			{
				this->_tree.insertValue(val);
				return this->find(val.first);
			}
			return this->insert(val).first;
		}
		template				<class Itr>
		void					insert(Itr first, Itr last)
		{
			for (Itr it = first; it != last; it++)
				this->_tree.insertValue(*it);
		}
		size_type				erase(const key_type& k) 				{ size_type _num = this->size(); this->_tree.deleteKey(k); return (_num != this->size()); }
		void					erase(iterator position) 				{ this->erase((*position).first); }
		void					erase(iterator first, iterator last)	{ iterator tmp; while (first != last) { tmp = first; ++first; this->erase(tmp); } }
		void					swap(map& x)							{ this->_tree.swap(x._tree); }
		void					clear() 								{ this->_tree.clear(); }
		
		/*
		** ----------------------------------------------------------------------------------
		** OBSERVERS
		*/
		key_compare				key_comp() const	{ return this->_tree.key_comp(); }
		value_compare			value_comp() const	{ return this->_tree.value_comp(); }

		/*
		** ----------------------------------------------------------------------------------
		** OPERATIONS: find, count, lower_bound, upper_bound, equal_range
		*/
		iterator				find(const key_type& k) {
			node* node = this->_tree.find(k);
			if (node)
				return iterator(node, this->_tree.end_node());
			return this->end();
		}
		const_iterator			find(const key_type& k) const {
			node* node = this->_tree.find(k);
			if (node)
				return const_iterator(node, this->_tree.end_node());
			return this->end();
		}

		size_type				count(const key_type& k) const {
			return (this->_tree.find(k)) ? 1 : 0;
		}

		iterator				lower_bound(const key_type& k) {
			for (iterator it = this->begin(); it != this->end(); it++)
				if (!this->_tree.key_comp()(it->first, k))
					return it;
			return this->end();
		}
		const_iterator			lower_bound(const key_type& k) const {
			for (const_iterator it = this->begin(); it != this->end(); it++)
				if (!this->_tree.key_comp()(it->first, k))
					return it;
			return this->end();
		}

		iterator 				upper_bound(const key_type& k) {
			for (iterator it = this->begin(); it != this->end(); it++)
				if (this->_tree.key_comp()(k, it->first))
					return it;
			return this->end();
		}
		const_iterator			upper_bound(const key_type& k) const {
			for (const_iterator it = this->begin(); it != this->end(); it++)
				if (this->_tree.key_comp()(k, it->first))
					return it;
			return this->end();
		}

		pair<const_iterator,const_iterator>	equal_range(const key_type& k) const
		{
			for (const_iterator it = this->begin(); it != this->end(); it++)
				if (!this->_tree.key_comp()(k, it->first) && !this->_tree.key_comp()(it->first, k))
					return pair<const_iterator, const_iterator>(it++, it);
			return pair<const_iterator, const_iterator>(this->lower_bound(k), this->lower_bound(k));
		}
		pair<iterator,iterator>				equal_range(const key_type& k)
		{
			for (iterator it = this->begin(); it != this->end(); it++)
				if (!this->_tree.key_comp()(k, it->first) && !this->_tree.key_comp()(it->first, k))
					return pair<iterator, iterator>(it++, it);
			return pair<iterator, iterator>(this->lower_bound(k), this->lower_bound(k));
		}
	};
	
	template	<class Key, class Typ, class Cmp, class Alc>
	bool		operator== (const ft::map<Key,Typ,Cmp,Alc>& _mp1,
							const ft::map<Key,Typ,Cmp,Alc>& _mp2) {
		if (_mp1.size() != _mp2.size())
			return 0;
		typename ft::map<Key,Typ,Cmp,Alc>::const_iterator rit = _mp2.begin();
		for (typename ft::map<Key,Typ,Cmp,Alc>::const_iterator lit = _mp1.begin(); lit != _mp1.end(); lit++, rit++)
			if (*lit != *rit)
				return 0;
		return 1;
	}

	template	<class Key, class Typ, class Cmp, class Alc>
	bool		operator!= (const ft::map<Key,Typ,Cmp,Alc>& _mp1,
							const ft::map<Key,Typ,Cmp,Alc>& _mp2) {
		return !(_mp1 == _mp2);
	}
	template	<class Key, class Typ, class Cmp, class Alc>
	bool		operator<  (const ft::map<Key,Typ,Cmp,Alc>& _mp1,
							const ft::map<Key,Typ,Cmp,Alc>& _mp2)	{ return ft::lexicographical_compare(_mp1.begin(), _mp1.end(), _mp2.begin(), _mp2.end()); }
	template	<class Key, class Typ, class Cmp, class Alc>
	bool		operator<= (const ft::map<Key,Typ,Cmp,Alc>& _mp1,
							const ft::map<Key,Typ,Cmp,Alc>& _mp2)	{ return !(_mp2 < _mp1); }
	template	<class Key, class Typ, class Cmp, class Alc>
	bool		operator>  (const ft::map<Key,Typ,Cmp,Alc>& _mp1,
							const ft::map<Key,Typ,Cmp,Alc>& _mp2) 	{ return (_mp2 < _mp1); }
	template	<class Key, class Typ, class Cmp, class Alc>
	bool		operator>= (const ft::map<Key,Typ,Cmp,Alc>& _mp1,
							const ft::map<Key,Typ,Cmp,Alc>& _mp2) 	{ return !(_mp1 < _mp2); }
	template	<class Key, class Typ, class Cmp, class Alc>
	void		swap	   (ft::map<Key,Typ,Cmp,Alc>& _mp1,
							ft::map<Key,Typ,Cmp,Alc>& _mp2)			{ _mp1.swap(_mp2); }
}

#endif
