
const update = document.querySelector('#update-button');
const deleteBtn = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

update.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.',
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then(response => {
        console.log(response);
        location.reload()
    })
})


deleteBtn.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
        })
    }).then(res => {
        if (res.ok) return res.json()
    }).then(response => {
        if (response === 'No more Darth Vader quotes') {
            messageDiv.textContent = 'No Darth Vader quotes to delete.'
        } else {
            window.location.reload(true);
        }
    })
})

