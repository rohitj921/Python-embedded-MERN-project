import sys

num=int(sys.argv[1])

result=1

for i in range(1,num+1):
    result*=i

print(result)

sys.stdout.flush()