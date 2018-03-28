##Как работать с ajax подгрузкой блоков и ajax фильтрами.

###Основная концепция:

Есть общая обертка в которой распологается: основной контейнер для блоков, пейджер, кнопка для аякса и фильтры.
Фильтр и кнопка могут распологаться за пределами обертки.

```
<div class="SOME_CLASS" id="ajaxWrapper">
    <div class="filters">
        <form data-for="ajaxWrapper" action="/" method="get">
            /*filters*/
        </form>
    </div>
    
    <div class="js--ajaxContainer">
        /*blocks*/
    </div>
    
    <a href="nextUrlPage" class="js--ajaxBtn" data-for="ajaxWrapper">
       Показать еще
    </a>
    
    <nav class="pagination-wrapper js--ajaxPager">
        /*pager-content*/
    <nav>
</div>
```  

### `id="ajaxWrapper"`

Айдишник обертки. На него будет ссылаться фильтр и кнопка.

### `data-for="ajaxWrapper"`

Атрибут обязательный для фильтров и кнопки. Нужен для привязки к определенному контейнеру.

### `class="js--ajaxContainer"`

Класс для контейнера с блоками. В него будут либо добвляться новые блоки либо заменятся полностью.

### `class="js--ajaxBtn"`

Класс для кнопки, что бы запустить аякс при нажатии на нее.

### `class="js--ajaxPager"`

Класс для пейджера. Нужен для обновления пейджера при аяксе.

###Дополнительно:

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
