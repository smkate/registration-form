# registration-form

Тест. Всплывающее окошко логина.

1. Клик по кнопке открывает окно логина.
2. Окно закрывается при клике по крестику, вне окна и по нажатию на esc.
3. Регистрация и иконки соц сетей - ссылки.
4. При нажатии на кнопку войти валидируется форма. Если некорректное заполнение, то вывести ошибку (макет окно с ошибкой).
5. Если ошибок нет, то ajax'ом происходит сабмит формы по адресу указанному в action формы.
6. В ответ скрипт ожидает json ответ.
   Возможные поля:
   {
   "err" : 0,
   "msg" : "Такой email не зарегистрирован",
   "url": "restate.ru"
   }
   Предусмотреть вывод ошибки (msg) под кнопку если err == 1. Предусмотреть переход по url, если err==0. HTML - БЭМ. JS - желательно чистый, но можно и jquery
