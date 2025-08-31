# OWID Viewer
A React application for exploring CO₂ emissions data from the Our World in Data dataset. Includes performance profiling and optimization experiments.

📦 Installation & Setup
Note: If you have trouble loading the file from the API, you can:

Place owid-co2-data.json in your project and change fetching in src/service/countryDataResource.ts:

```ts
const res = await fetch('../../owid-co2-data.json');
```

Or revert the last commit and put the file in the root directory.



# Performance information
Profiling
Initial profiling done with React Dev Tools Profiler.
Testing interactions:

- sorting by contry name and population
- selecting year
- search by contry name

## Before optimization

Loading application with click on sorting by population

First load(9.7 + 7.5 ms)  
![start loading ](image.png)  
Skeleton load (6.3ms)  
![skeleton load](image-1.png)  
Country table load (121.4ms)  
![suspence deactivating and contry table](image-2.png)  
Country table create root(121.6 ms)  
![country table create root](image-3.png)  
Automatic select last year(116.7ms)  
![year activating](image-4.png)  
Sorting by population desc(133.6ms)  
![sort by population desc(133.6ms)](image-5.png)  
Sorting by population asc(148.8ms)  
![sort by population asc(148.8ms)](image-6.png)  
Country details expand(266.3ms)  
![country details expand(266.3ms)](image-7.png)  
Year changing(takes 3 commits in profiler. (345.4, 65.8, 267.3ms))  
![year change 1](image-8.png)  
![year change 2](image-9.png)  
![year change 3(345.4, 65.8, 267.3ms)](image-10.png)  
Search by name. Typed 3 letters. Takes 3 commits (56.7ms, 30.5ms, 26.2ms)  
![serch typing 'b' 56.7ms](image-11.png)  
![search typing 'be' 30.5ms](image-12.png)  
![search typing 'bel' 26.2ms](image-13.png)  
Country details expand(112.4ms)  
![country details expand](image-14.png)  
Column menu open on yearly country details. (82.2ms)  
![column menu open. (82.2ms)](image-15.png)  
Column 'cumulative co2' added to table (109.5ms)    
![column 'cumulative co2' added to table (109.5ms)](image-16.png)  

## Optimization.

### useMemo + useCallback  
Add useMemo + useCallback to all of the operations(sorting, searching and year changing)  

Optimization results in unsignificant performance improvement. Sorting is better 1-2% or even worser. Year changing faster on 50%. Filtering optimisation unsignificant - around 1-5% better.  

Sort by population 4 clicks(137.9, 145.7, 156.6, 161.1 ms) 2 attempts  
![sort by population 4 clicks after useMemo and useCallback on sort functions(137.9, 145.7, 156.6, 161.1 ms)](image-17.png)  
![sort by population  4 clicks after useMemo on sorting and year change(136.4, 152.2, 153.4, 164.4 ms)](image-20.png)  
Year change(144.7, 140.7, 26.8 ms) 2 attempts  
![year change 1-2-3 after useMemo implementation(179.6, 145.2, 26.9ms)](image-18.png)  
![year change 1-2-3 after useMemo for filtering too(144.7, 140.7, 26.8 ms)](image-19.png)  
filter typing 'bel'(42.6, 26.2, 20.7 ms)  
![filter typing 'bel' after last changes(42.6, 26.2, 20.7 ms)](image-21.png)  

### Implement React.Memo.  
Memo wrapper added on rendering country table rows. It should reduce time on rendering.  

Significant improving of performance of sorting(~200-300%) and filtering(first operation is better on 50%). A downgrading of yearchange performance - it seems highlighting takes more time then it was with useMemo only(about 10% on all operations and around 400% on last operation; was 30ms, become 160)  

Sorting by population 4 times(38.7, 35.3, 35.8, 37.3ms)  
![sorting by population 4 times(38.7, 35.3, 35.8, 37.3ms)](image-22.png)  
Year change(208.2, 182, 185.3ms)  
![year change(208.2, 182, 185.3ms)](image-23.png)  
Filter typing 'bel'(26.6, 23.5, 22.8ms)  
![filter typing 'bel'(26.6, 23.5, 22.8ms)](image-24.png)  

First load seems a little slower too.  
Start loading(table render and highlight)(210ms 174.3ms 144.4ms)  
![start loading(table render and highlight)(210ms 174.3ms 144.4ms)](image-25.png)  

Observations
- React.memo drastically improved sorting and filtering but hurt year-change performance. Highlighting during year change may be the bottleneck.  
- useMemo slightly improve all the interactions
