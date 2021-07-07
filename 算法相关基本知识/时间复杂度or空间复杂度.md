# 算法的复杂度按最高的复杂度算；

# 时间复杂度

### 从小到大：

O(1)  > O(log n) > O(n) > O(n log n) > O(n^2^) 

---下面就要被优化  >  O(n^3^)   >  O(2^n^)  .....

## O(1) ：

    if(I==1);
    a=1   result=3+4  result= n*2  result= 1000*1000

    array.push('a')   array.pop()
    map.set(1,1)     map.get(1,1)

在计算复杂度的时候，O(1) 一般被忽略；

## O(n)：

for循环，while循环（不使用二分搜索）

    for(let i = 0;i < n ;i++)    let i = 0; while( i < n)
    
    let a=0;
    for(let i=0;i < n; i++){
        a+=i
    }

## O(n^2^)：

循环嵌套，嵌套while循环；

for(let i=0;i < n; i++){
    for(let j =0; j < 0; j++){
        a+=i;
    }
}

let i = 0; 
while( i < n){
    i++;j=i;
    while(j <n){
        i++
    }
}