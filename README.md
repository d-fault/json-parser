Start
```sh
node server.js
```
На входе JSON:
URL: http://www.reddit.com/r/javascript/.json
2)	направление	и	поле	(дата	создания,	баллы)	для	сортировки	выходных	данных
3)	выходной	формат	(csv,	sql)	и	доп.	параметры	для	форматтера	(разделитель	для	csv,	имя	таблицы	и	полей	для	sql	и	пр.)
на	выходе	отображаем	следующие	поля:
  - id
  - title
  - utc	creation	date
  score
4) Имея	на	входе	тот	же	json	(что	и	в	задании	1)	и	выходной	формат	мы	должны	получить	информацию	по	количеству	статей	для	каждого	домена	отсортированную	по	убыванию,
т.е.	поля:
  - domain
  - articles	count	(количество	статей	на	домене)
  - score	summ	(сумма	баллов	всех	статей	домена)
например	в	csv:
- "github.com",	13,	123
- "rathercurio.us",	10,	55
- "bunselmeyer.net",	5,	40
