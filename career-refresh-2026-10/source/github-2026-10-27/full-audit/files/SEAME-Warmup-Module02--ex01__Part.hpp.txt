#pragma once
#include <iostream>

class Part
{
public:
    virtual void print() = 0;

    Part() {}
    Part(const Part& other) = default;
    virtual ~Part() {}
    Part& operator=(const Part& other) = default;
};