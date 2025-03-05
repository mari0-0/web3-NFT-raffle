inp = 5
sum = 0
for i in range(1, inp+1):
    sum += i*i if i%2 != 0 else -i*i
    # if i%2 == 0:
    #     sum -= i*i
    # else:
    #     sum += i*i
print(sum)