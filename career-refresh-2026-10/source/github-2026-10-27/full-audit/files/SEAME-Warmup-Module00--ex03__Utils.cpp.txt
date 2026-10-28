# include   "Utils.hpp"

int         isNumeric(string _str)
{
    for (size_t i=0; i<_str.length(); i++)
        if (!isdigit(_str[i]))
            return (FAILURE);
    return (SUCCESS);
}

string      to_lowercase(const string _str)
{
    string  low = _str;

    for (char& chr : low)
        if (chr >= 'A' && chr <= 'Z')
            chr = chr - 'A' + 'a';

    return low;
}

void        print_welcome(void)
{
    cout    << BOL << CYA << "[Content]" << RES << "       "
            << "Welcome to Phonebook Program!" << RES << endl;
}

void        print_header(void)
{
    cout    << endl;
    cout    << BOL << CYA << "[Phonebook]     " << RES
            << "What is your next step?" << RES << endl;
    cout    << BOL << CYA << "                " << RES << ""
            << BOL << MAG << "[ADD]" << RES << "      : " << "➕ Add some contact in your phonebook" << endl;
    cout    << BOL << CYA << "                " << RES
            << BOL << GRE << "[SEARCH]" << RES << "   : " << "📖 Search and modify your contact" << endl;
    cout    << BOL << CYA << "                " << RES
            << BOL << MAG << "[REMOVE]" << RES << "   : " << "❌ Remove someone from your phonebook" << endl;
    cout    << BOL << BLU << "                " << RES
            << BOL << GRE << "[BOOKMARK]" << RES << " : " << "🌟 List of contacts that you bookmarked before" << endl;
    cout    << BOL << CYA << "                " << RES
            << BOL << RED << "[EXIT]" << RES << "     : " << "☠️" << endl;
}
