# jQuery plugin для Ajax подгрузки эллементов.

Возможности:

1. Подгрузка эллементов по кнопки "еще";
2. Построничная ajax навигация при помощи пейджера;
3. Ajax фильтры для контента;
4. На странице может находиться любое колличество контейнеров; 

### Использование:

Перед закрывающемся тегом \</body> подключть jquery библиотеку, затем подключить данный плагин.

```
    <script src="src/js/jquery-3.3.1.min.js"></script>
    <script src="src/js/ajaxContentLoader.js"></script>
</body>
```

```
$(document).ready(function () {
    $.fn.ajaxContentLoader();
});
```

#### Плагин принимает следующие параметры:

```
$.fn.ajaxContentLoader({
    btnSelector         : '.js--ajaxBtn',
    pagerSelector       : '.js--ajaxPager',
    containerSelector   : '.js--ajaxContainer',
    controlSelector     : '.js--ajaxControlWrapper',
    filterSelector      : '.js--ajaxFilter'
});
```

### Основная концепция:

Есть общая обертка в которой распологается: основной контейнер для блоков, пейджер, кнопка для аякса и фильтры.
Фильтр и кнопка могут распологаться за пределами обертки.

```
<div class="SOME_CLASS" id="ajaxWrapper">
    <div class="filters">
        <form data-for="ajaxWrapper" action="/" method="get">
            <select name="color" id="ajaxSelect" class="js--ajaxFilter">
              /*options*/
            </select>
            <input id="recommendedFilter" name="recommended" type="checkbox" data-for="ajaxWrapper" class="js--ajaxFilter">
        </form>
    </div>
    
    <div class="js--ajaxContainer">
        /*blocks*/
    </div>
    
    <a href="nextUrlPage" class="js--ajaxBtn" data-for="ajaxWrapper">
       Показать еще
    </a>
    
    <nav class="pagination-wrapper js--ajaxPager">
        <ul class="pagination">
            <li class="page-item"><a class="page-link js--ajaxBtn" href="#" data-for="ajaxWrapper">Previous</a></li>
            <li class="page-item active"><a class="page-link js--ajaxBtn" href="/ajaxAction.php?page=1" data-for="ajaxWrapper">1</a></li>
            <li class="page-item"><a class="page-link js--ajaxBtn" href="/ajaxAction.php?page=2" data-for="ajaxWrapper">2</a></li>
            <li class="page-item"><a class="page-link js--ajaxBtn" href="/ajaxAction.php?page=3" data-for="ajaxWrapper">3</a></li>
            <li class="page-item"><a class="page-link js--ajaxBtn" href="/ajaxAction.php?page=2" data-for="ajaxWrapper">Next</a></li>
        </ul>
    <nav>
</div>
```  

При каждом запросе в ответ должен приходить JSON со следующими полями:

```
loop : "..."
moreButtons : "..."
pager : "..."
```

#### `loop`

Эллементы для контейнера

#### `moreButtons`

Код кнопки для замены

#### `pager`

Код пейджера для замены

#### `class="js--ajaxContainer"`

Класс для контейнера с блоками. В него будут либо добвляться новые блоки либо заменятся полностью.

#### `class="js--ajaxBtn"`

Класс кнопки которая будет использовать ajax.

#### `class="js--ajaxPager"`

Класс для пейджера. Нужен для обновления пейджера при аяксе.

#### `class="js--ajaxFilter"`

Класс для фильтров.

### Дополнительно:

Может возникнуть потребность иметь несколько кнопок. Для их группировки используется следующая конструкция:

```
<div class="js--ajaxControlWrapper">
    <a href="nextUrlPage" class="js--ajaxBtn" data-for="ajaxWrapper">
           Показать еще
    </a>
    <a href="/" class="show-all">
        /*Кнопка с какой либо другой функцией*/
    </a>
</div>
```  
### `class="js--ajaxControlWrapper"`

Класс для обертки кнопок. Если есть такой контейнер то он будет полностью обновлен на то что приходит в запросе.
