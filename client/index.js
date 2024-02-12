retrieve_button = document.getElementById("retrieve_button")
sample_container = document.getElementById("sample_container")

function createElement(_timestamp, _value){
    let div = document.createElement('div')
    div.classList.add("element")

    let timestamp_row = document.createElement('div')
    let value_row = document.createElement('div')
    timestamp_row.classList.add('row')
    value_row.classList.add('row')

    let timestamp_title = document.createElement('p')
    timestamp_title.classList.add('title')
    timestamp_title.innerText = "Timestamp"
    let timestamp = document.createElement('p')
    timestamp.innerText = _timestamp
    timestamp_row.appendChild(timestamp_title)
    timestamp_row.appendChild(timestamp)

    let value_title = document.createElement('p')
    value_title.classList.add('title')
    value_title.innerText = "Value"
    let value = document.createElement('p')
    value.innerText = _value
    value_row.appendChild(value_title)
    value_row.appendChild(value)

    div.appendChild(timestamp_row)
    div.appendChild(value_row)
    sample_container.appendChild(div)
}

retrieve_button.addEventListener('click', () => {
    fetch('http://localhost:5000/retrieve')
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
        }
    ).then(data => {
        sample_container.innerHTML = ""
        console.log('Response data:', data);
        const keys = Object.keys(data)
        for(const key in data){
            createElement(key, data[key])
        }
      })

})