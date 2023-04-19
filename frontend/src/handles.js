// Подтверждение формы и возвращение к таблице
export const submit = (event, editFunction, addFunction, entity, tab) => {
    console.log(entity);
    event.preventDefault();
    if (entity.id) {
        editFunction(entity)
    } else {
        addFunction(entity)
    }
}

// Изменеие сущности после изменения поля формы
export const change = (event, setFunction, entity) => {
    const {name, value} = event.target;
    console.log(name)
    console.log(value)

    setFunction({...entity, [name]: value});
}

// Хватаем сущность с сервера
export const getEntity = (entity, id, setFunction) => {
    return fetch(`/their-pass/api/` + entity + `/${id}`)
        .then((response) => response.json())
        .then((data) => setFunction(data));
}

export const getUserAccounts = (id, accessed, setFunction) => {
    return fetch('/their-pass/api/account/available?userId=' + id + "&accessed=" + accessed)
        .then((response) => response.json())
        .then((data) => setFunction(data));
}

export const addAccess = (userId, accountId) => {
    const body = {userId: userId, objectId: accountId}
    return fetch('/their-pass/api/account/add-access', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const removeAccess = (userId, accountId) => {
    const body = {userId: userId, objectId: accountId}
    return fetch('/their-pass/api/account/remove-access', {
        method: 'DELETE',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

// Логика сортировки списков сущностей
export const sortLogic = (a, b, sorting) => {
    return a[sorting.field] > b[sorting.field] && sorting.increase ? 1 : -1;
}

// изменение параметров сортировки
export const changeSort = (event, sorting, setSorting) => {
    const name = event.target.getAttribute('name');
    const increase = name === sorting.field ? !sorting.increase : true;
    setSorting({['field']: name, ['increase']: increase});
}

