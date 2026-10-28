# ft_linear_regression

## How to run
1. **First, clone the repository.**
```
git clone https://github.com/KKWANH/linear_regression
```

2. **Move to the repository that you just cloned.**
```Shell
cd linear_regression
```

3. You can run everything in our repository by the command; `make`
```
# To get informations about specitfic make keywords
make help
```
```
# Remove temporary files
make clean
```
```
# Setup python virtual environmetns
make setup
```
```
# Enable the virtual env that you just made
make env
```
```
# Predicting.
#   If you input the mileage(km), and you will receive predicted price.
make predict
```
```
# Training
#   Train and make [parameter.dat] as a result.
make train
```